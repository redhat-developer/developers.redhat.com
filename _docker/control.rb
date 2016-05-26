#!/usr/bin/env ruby

require 'optparse'
require 'fileutils'
require 'tempfile'
require 'gpgme'
require 'yaml'
require 'docker'
require 'socket'
require 'timeout'
require 'erb'
require 'resolv'
require 'open3'
require 'net/http'
require_relative 'lib/options'
require_relative 'lib/file_helpers'

class SystemCalls
  def execute_docker_compose(cmd, args = [])
    puts "args to docker-compose command '#{cmd}' are '#{args}'"
    Kernel.abort('Error running docker-compose') unless Kernel.system *['docker-compose', cmd.to_s, *args]
  end

  def execute_docker(cmd, *args)
    Kernel.abort('Error running docker') unless Kernel.system 'docker', cmd.to_s, *args
  end

  def kill_current_environment
    begin
      Docker::Network.get("#{project_name}_default")
      if File.exists?('docker-compose.yml')
        puts 'Killing and removing docker services...'
        execute_docker_compose :down
      end
    rescue
      # nothing to do here
    end
  end
end

def modify_env
  begin
    puts 'decrypting vault'
    crypto = GPGME::Crypto.new
    fname = File.open '../_config/secrets.yaml.gpg'

    secrets = YAML.load(crypto.decrypt(fname).to_s)

    secrets.each do |k, v|
      ENV[k] = v
    end
    puts 'Vault decrypted'
  rescue GPGME::Error => e
    abort "Unable to decrypt vault (#{e})"
  end
end

def is_port_open?(host, port)
  begin
    Timeout::timeout(1) do
      begin
        s = TCPSocket.new(Resolv.new.getaddress(host), port)
        s.close
        true
      rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH, Errno::EADDRNOTAVAIL
        # Doesn't matter, just means it's still down
        false
      end
    end
  rescue Timeout::Error
    # We don't really care about this
    false
  end
end

def block_wait_drupal_started(supporting_services)

  if check_supported_service_requested(supporting_services, 'drupal')

    docker_drupal = Docker::Container.get("#{project_name}_drupal_1")
    until docker_drupal.json['NetworkSettings']['Ports']
      puts 'Finding port info for drupal container...'
      docker_drupal = Docker::Container.get("#{project_name}_drupal_1")
    end

    # Check to see if Drupal is accepting connections before continuing
    puts 'Waiting to proceed until Drupal is up'
    drupal_port80_info = docker_drupal.json['NetworkSettings']['Ports']['80/tcp'].first
    drupal_ip = ENV['DRUPAL_HOST_IP'] || 'docker'
    drupal_port = drupal_port80_info['HostPort']

    # Add the drupal cdn prefix
    ENV['cdn_prefix'] = 'sites/default/files'

    puts "Testing drupal access via #{drupal_ip}:#{drupal_port}"
    up = false
    until up do
      up = is_port_open?(drupal_ip, drupal_port)
      begin
        response = Net::HTTP.get_response(URI("http://#{drupal_ip}:#{drupal_port}/user/login"))
        response_code = response.code.to_i
        up = response_code < 400
      rescue
        up = false
      end
    end

    # Add this to the ENV so we can pass it to the awestruct build
    ENV['DRUPAL_HOST_IP'] = drupal_ip # somewhat of a hack to make this work on Jenkins
    ENV['DRUPAL_HOST_PORT'] = drupal_port
  else
    puts "Not waiting for Drupal to start as it is not a required supporting_service"
  end
end

def check_supported_service_requested(supporting_services, service_name)
  !supporting_services.nil? && supporting_services.include?(service_name)
end

def block_wait_searchisko_started(supporting_services)

  if check_supported_service_requested(supporting_services, 'searchisko')
    docker_searchisko = Docker::Container.get("#{project_name}_searchisko_1")
    until docker_searchisko.json['NetworkSettings']['Ports']
      puts 'Finding port info for searchisko container...'
      docker_searchisko = Docker::Container.get("#{project_name}_searchisko_1")
    end

    # Check to see if Searchisko is accepting connections before continuing
    puts 'Waiting to proceed until searchisko is up'
    searchisko_port8080_info = docker_searchisko.json['NetworkSettings']['Ports']['8080/tcp'].first
    searchisko_ip = searchisko_port8080_info['HostIp']
    searchisko_port = searchisko_port8080_info['HostPort']

    puts "Testing searchisko access via #{searchisko_ip}:#{searchisko_port}"
    up = false
    until up do
      up = is_port_open?(searchisko_ip, searchisko_port)
      begin
        response = Net::HTTP.get_response(URI("http://#{searchisko_ip}:#{searchisko_port}/v2/rest/search/events"))
        response_code = response.code.to_i
        up = response_code < 400
      rescue
        up = false
      end
    end
    ENV['SEARCHISKO_HOST_PORT'] = searchisko_port
  else
    puts "Not waiting for Searchisko to start as it is not a required supporting_service"
  end

end

private def project_name
  if ENV['COMPOSE_PROJECT_NAME'].to_s == ''
    'docker'
  else
    ENV['COMPOSE_PROJECT_NAME']
  end
end

#
# This guard allows the functions within this script to be unit tested without actually executing the script
#
if $0 == __FILE__

  system_exec = SystemCalls.new
  tasks = Options.parse ARGV

  if tasks.empty?
    puts Options.parse %w(-h)
  end

  #the docker url is taken from DOCKER_HOST env variable otherwise
  Docker.url = tasks[:docker] if tasks[:docker]

  # Output the new docker-compose file with the modified ports
  File.delete('docker-compose.yml') if File.exists?('docker-compose.yml')
  File.write('docker-compose.yml', ERB.new(File.read('docker-compose.yml.erb')).result)

  if tasks[:decrypt]
    puts 'Decrypting...'
    modify_env
  end

  if tasks[:kill_all]
    system_exec.kill_current_environment
  end

  if tasks[:build]
    puts 'Building...'
    docker_dir = 'awestruct'

    if tasks[:drupal]
      puts 'Building CSS and JS for drupal'
      out, status = Open3.capture2e '$(npm bin)/gulp'
      Kernel.abort("Error building CSS / JS for drupal: #{out}") unless status.success?
    end

    parent_gemfile = File.open '../Gemfile'
    parent_gemlock = File.open '../Gemfile.lock'

    target_gemfile = FileHelpers.open_or_new(docker_dir + '/Gemfile')
    target_gemlock = FileHelpers.open_or_new(docker_dir + '/Gemfile.lock')
    #Only copy if the file has changed. Otherwise docker won't cache optimally
    FileHelpers.copy_if_changed(parent_gemfile, target_gemfile)
    FileHelpers.copy_if_changed(parent_gemlock, target_gemlock)

    puts 'Building base docker image...'
    system_exec.execute_docker(:build, '--tag=developer.redhat.com/base', './base')
    puts 'Building base Java docker image...'
    system_exec.execute_docker(:build, '--tag=developer.redhat.com/java', './java')
    puts 'Building base Ruby docker image...'
    system_exec.execute_docker(:build, '--tag=developer.redhat.com/ruby', './ruby')
    puts 'Building services...'
    system_exec.execute_docker_compose :build
  end

  if tasks[:unit_tests]
    puts 'Running the unit tests'
    system_exec.execute_docker_compose :run, tasks[:unit_tests]
  end

  if tasks[:should_start_supporting_services]
    puts 'Starting up services...'

    system_exec.execute_docker_compose :up, ['--no-recreate'].concat(tasks[:supporting_services])
  end

  if tasks[:awestruct_command_args]
    block_wait_searchisko_started(tasks[:supporting_services])
    block_wait_drupal_started(tasks[:supporting_services]) if tasks[:drupal]

    puts 'running awestruct command'
    system_exec.execute_docker_compose :run, tasks[:awestruct_command_args]
  end

  if tasks[:awestruct_up_service]
    puts 'bringing up awestruct service'
    system_exec.execute_docker_compose :up, ['--no-recreate'].concat(tasks[:awestruct_up_service])
  end

  if tasks[:scale_grid]
    puts 'scaling up selenium grid service'
    system_exec.execute_docker_compose :scale, tasks[:scale_grid]
  end

  if tasks[:acceptance_test_target_task]
    puts 'Running features task  . . . . '
    system_exec.execute_docker_compose :run, tasks[:acceptance_test_target_task]
  end
end
