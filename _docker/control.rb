#!/usr/bin/env ruby

require 'optparse'
require 'fileutils'
require 'tempfile'
require 'gpgme'
require 'yaml'
require 'docker'
require 'socket'
require 'timeout'
require 'resolv'
require 'open3'
require 'net/http'
require_relative 'lib/options'
require_relative 'lib/file_helpers'

class SystemCalls
  def execute_docker_compose(environment, cmd, args = [])
    puts "Executing docker-compose -f #{environment.get_docker_compose_file} #{cmd} with args '#{args}'"
    Kernel.abort('Error running docker-compose') unless Kernel.system *["docker-compose -f #{environment.get_docker_compose_file}", cmd.to_s, *args]
  end

  def execute_docker(cmd, *args)
    puts "Executing docker with command '#{cmd}' and args #{args}"
    Kernel.abort('Error running docker') unless Kernel.system 'docker', cmd.to_s, *args
  end

  def kill_current_environment(environment)
    puts 'Attempting to stop current Docker environment...'

    begin
      Docker::Network.get("#{project_name}_default")
      if File.exists?('docker-compose.yml')
        puts 'Killing and removing docker services...'
        execute_docker_compose(environment,:down)
      end
      puts 'Stopped current Docker environment.'
    rescue
      puts 'Current Docker environment is not running.'
    end
  end
end

#
# Decrypts the vault and then binds all parameters contained within as environment parameters.
#
def decrypt_vault_and_modify_env
  begin
    puts 'Decrypting vault and binding environment parameters...'
    crypto = GPGME::Crypto.new
    fname = File.open '../_config/secrets.yaml.gpg'

    secrets = YAML.load(crypto.decrypt(fname).to_s)

    secrets.each do |k, v|
      ENV[k] = v
      puts " - Bound environment variable '#{k}' from decrypted vault"
    end
    puts 'Succesfully decrypted value and bound environment parameters.'
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

#
# Tries to load the environment specified or aborts if the environment does not exist
#
def load_environment(tasks)
  environment = tasks[:environment]
  if environment.nil?
    Kernel.abort("Unable to load details of environment '#{tasks[:environment_name]}'")
  end
  environment
end

#
# Copies the project root Gemfile and Gemfile.lock into the _docker/awestruct
# directory if they have changed since the last run of this script. This ensures
# that when the Awestruct image is built, it always contains the most up-to-date
# project dependencies.
#
def copy_project_dependencies_for_awestruct_image

  puts "Copying project dependencies into '_docker/awestruct' for build..."

  parent_gemfile = File.open '../Gemfile'
  parent_gemlock = File.open '../Gemfile.lock'

  target_gemfile = FileHelpers.open_or_new('awestruct/Gemfile')
  target_gemlock = FileHelpers.open_or_new('awestruct/Gemfile.lock')
  #Only copy if the file has changed. Otherwise docker won't cache optimally
  FileHelpers.copy_if_changed(parent_gemfile, target_gemfile)
  FileHelpers.copy_if_changed(parent_gemlock, target_gemlock)

  puts "Successfully copied project dependencies into '_docker/awestruct' for build."

end

#
# Delegates out to Gulp to build the CSS and JS for Drupal
#
def build_css_and_js_for_drupal
  puts 'Building CSS and JS for Drupal...'

  out, status = Open3.capture2e('$(npm bin)/gulp')
  Kernel.abort("Error building CSS / JS for Drupal: #{out}") unless status.success?

  puts 'Successfully built CSS and JS for Drupal'
end

#
# Builds the developers.redhat.com base Docker images
#
def build_base_docker_images(system_exec)
  system_exec.execute_docker(:build, '--tag=developer.redhat.com/base', './base')
  system_exec.execute_docker(:build, '--tag=developer.redhat.com/java', './java')
  system_exec.execute_docker(:build, '--tag=developer.redhat.com/ruby', './ruby')
end

#
# Builds the Docker images for the environment we're running in
#
def build_environment_docker_images(environment, system_exec)
  system_exec.execute_docker_compose(environment, :build)
end

#
# Builds all of the environment resources including Docker images and any CSS/JS in the case of Drupal
#
def build_environment_resources(environment, system_exec)
  puts "Building all required resources for environment '#{environment.environment_name}'"

  if environment.is_drupal_environment?
    build_css_and_js_for_drupal
  end

  copy_project_dependencies_for_awestruct_image
  build_base_docker_images(system_exec)
  build_environment_docker_images(environment, system_exec)

end

#
# Starts any required supporting services (if any), and then waits for them to be
# reported as up before continuing
#
# TODO - Unit test this method
def start_and_wait_for_supporting_services(supporting_services=[], system_exec)

  puts "Starting all required supporting services..."

  unless supporting_services.nil? and supporting_services.empty?

    system_exec.execute_docker_compose(:up, '-d','--no-recreate', supporting_services)
    block_wait_searchisko_started(supporting_services)
    block_wait_drupal_started(supporting_services)

    puts "Started all required supporting services."
  else
    puts "No supporting services to start."
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
  environment = load_environment(tasks)

  #the docker url is taken from DOCKER_HOST env variable otherwise
  Docker.url = tasks[:docker] if tasks[:docker]

  if tasks[:kill_all]
    system_exec.kill_current_environment(environment)
  end

  if tasks[:decrypt]
    decrypt_vault_and_modify_env
  end

  if tasks[:build]
    build_environment_resources(environment, system_exec)
  end

  start_and_wait_for_supporting_services(tasks[:supporting_services])

  if tasks[:unit_tests]
    system_exec.execute_docker_compose :run, tasks[:unit_tests]
  end

  if tasks[:awestruct_command_args]
    system_exec.execute_docker_compose :run, tasks[:awestruct_command_args]
  end

  if tasks[:scale_grid]
    system_exec.execute_docker_compose :scale, tasks[:scale_grid]
  end

  if tasks[:acceptance_test_target_task]
    system_exec.execute_docker_compose :run, tasks[:acceptance_test_target_task]
  end
end
