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

class Options
  def self.parse(args)
    options = {:build => false, :restart => false, :drupal => false,
               :stage_pr => false,
               :awestruct => {:gen => false, :preview => false}}

    opts_parse = OptionParser.new do |opts|
      opts.banner = 'Usage: control.rb [options]'
      opts.separator 'Specific options:'

      docker_message = "Docker client connection info (i.e. tcp://example.com:1000). "\
                       "DOCKER_HOST used if parameter not provided"
      opts.on('-d', '--docker CONNECTION_INFO', String, docker_message) do |d|
        options[:docker] = d
      end

      opts.on('-r', '--restart', 'Restart the containers') do |r|
        options[:restart] = r
      end

      opts.on('-b', '--build', 'Build the containers') do |b|
        options[:build] = b
      end

      opts.on('-g', '--generate', 'Run awestruct (clean gen)') do |r|
        options[:awestruct][:gen] = true
      end

      opts.on('-p', '--preview', 'Run awestruct (clean preview)') do |r|
        options[:awestruct][:preview] = true
      end

      opts.on('-u', '--drupal', 'Start up and enable drupal') do |u|
        options[:drupal] = true
      end

      opts.on('--stage-pr PR_NUMBER', Integer, 'build for PR Staging') do |pr|
        puts pr
        options[:stage_pr] = pr
      end

      # No argument, shows at tail.  This will print an options summary.
      opts.on_tail('-h', '--help', 'Show this message') do
        puts opts
        exit
      end
    end

    opts_parse.parse! args
    options
  end
end

def building_ci_job?()
  return ENV['BUILD_NUMBER']
end

def modify_env(opts)
  unless (building_ci_job?)
    begin
      puts 'decrypting vault'
      crypto = GPGME::Crypto.new
      fname = File.open '../_config/secrets.yaml.gpg'

      secrets = YAML.load(crypto.decrypt(fname).to_s)

      secrets.each do |k, v|
        if k.include? 'drupal'
          ENV[k] = v if opts[:drupal]
        else
          ENV[k] = v
        end
      end
      puts 'Vault decrypted'
    rescue GPGME::Error => e
      #If we have a BUILD_NUMBER in the environment we are building from Jenkins
      abort "Unable to decrypt vault (#{e})"
    end
  end

  port_names = ['AWESTRUCT_HOST_PORT', 'DRUPAL_HOST_PORT', 'DRUPALMYSQL_HOST_PORT',
    'MYSQL_HOST_PORT', 'ES_HOST_PORT1', 'ES_HOST_PORT2', 'SEARCHISKO_HOST_PORT']

  # We have to reverse the logic in `is_port_open` because if nothing is listening, we can use it
  available_ports = (32768..61000).lazy.select {|port| !is_port_open?('docker', port)}.take(port_names.size).force
  port_names.each_with_index do |name, index|
    puts "#{name} available at #{available_ports[index]}"
    ENV[name] = available_ports[index].to_s
  end
end

def execute_docker_compose(cmd, args = [])
  Kernel.abort('Error running docker-compose') unless Kernel.system *['docker-compose', cmd.to_s, *args]
end

def execute_docker(cmd, *args)
  Kernel.abort('Error running docker') unless Kernel.system 'docker', cmd.to_s, *args
end

def options_selected? options
  (options[:build] || options[:restart] || options[:awestruct][:gen] || options[:awestruct][:preview] || options[:stage_pr])
end

def is_port_open?(host, port)
  begin
    Timeout::timeout(1) do
      begin
        s = TCPSocket.new(Resolv.new.getaddress(host), port)
        s.close
        true
      rescue Errno::ECONNREFUSED, Errno::EHOSTUNREACH
        # Doesn't matter, just means it's still down
        false
      end
    end
  rescue Timeout::Error
    # We don't really care about this
    false
  end
end

def block_wait_drupal_started
  docker_drupal = Docker::Container.get('docker_drupal_1')
  until docker_drupal.info['NetworkSettings']['Ports']
    sleep(5)
    docker_drupal = Docker::Container.get('docker_drupal_1')
  end

  # Check to see if Drupal is accepting connections before continuing
  puts 'Waiting to proceed until Drupal is up'
  drupal_port80_info = docker_drupal.info['NetworkSettings']['Ports']['80/tcp'].first
  drupal_ip = drupal_port80_info['HostIp']
  drupal_port = drupal_port80_info['HostPort']

  # Add this to the ENV so we can pass it to the awestruct build
  ENV['DRUPAL_HOST_IP'] = drupal_ip

  up = false
  until up do
    up = is_port_open?(drupal_ip, drupal_port)
  end
end

def startup_services(opts)
  puts 'Starting up services...'
  if opts[:drupal]
    execute_docker_compose :up, %w(-d elasticsearch mysql drupalmysql drupal searchisko searchiskoconfigure)
  else
    execute_docker_compose :up, %w(-d elasticsearch mysql searchisko searchiskoconfigure)
  end

  begin
    configure_service = Docker::Container.get('docker_searchiskoconfigure_1')
  rescue Excon::Errors::SocketError => se
    puts se.backtrace
    puts('There has been a problem with your CA certs, are you developing using boot2docker?')
    puts('If so set your DOCKER_SSL_VERIFY environment variable to false')
    puts('E.g export DOCKER_SSL_VERIFY=false')
    exit #quit the whole thing
  end

  puts 'Waiting to proceed until searchiskoconfigure has completed'

  # searchiskoconfigure takes a while, we need to wait to proceed
  while configure_service.info['State']['Running']
    # TODO We need to figure out if the container has actually died, if it died print an error and abort
    sleep 5
    configure_service = Docker::Container.get('docker_searchiskoconfigure_1')
  end

  # Check to see if Drupal is accepting connections before continuing
  block_wait_drupal_started if opts[:drupal]

  if opts[:drupal]
    execute_docker_compose :run, ['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[drupal]']
  else
    execute_docker_compose :run, ['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]']
  end
end

options = Options.parse ARGV

puts Options.parse %w(-h) unless options_selected? options

modify_env(options)

#the docker url is taken from DOCKER_HOST env variable otherwise
Docker.url = options[:docker] if options[:docker]

if options[:build] || options[:restart]
# Output the new docker-compose file with the modified ports
  File.delete('docker-compose.yml') if File.exists?('docker-compose.yml')
  File.write('docker-compose.yml', ERB.new(File.read('docker-compose.yml.erb')).result)
end

def copy_if_changed(sourceFile, targetFile)
  unless FileUtils.identical?(sourceFile, targetFile)
    FileUtils.cp sourceFile, targetFile
  end
end

def open_or_new(path)
  if (File.exist?(path))
    File.open(path)
  else
    File.new(path, 'w')
  end
end

if options[:build]
  docker_dir = 'awestruct'

  parent_gemfile = File.open '../Gemfile'
  parent_gemlock = File.open '../Gemfile.lock'

  target_gemfile = open_or_new(docker_dir + '/Gemfile')
  target_gemlock = open_or_new(docker_dir + '/Gemfile.lock')

  #Only copy if the file has changed. Otherwise docker won't cache optimally
  copy_if_changed(parent_gemfile, target_gemfile)
  copy_if_changed(parent_gemlock, target_gemlock)

  puts 'Building base docker image...'
  execute_docker(:build, '--tag=developer.redhat.com/base', './base')
  puts 'Building base Java docker image...'
  execute_docker(:build, '--tag=developer.redhat.com/java', './java')
  puts 'Building base Ruby docker image...'
  execute_docker(:build, '--tag=developer.redhat.com/ruby', './ruby')
  puts 'Building services...'
  execute_docker_compose :build
end

if options[:restart]
  execute_docker_compose :kill
  startup_services(options)
end

if options[:awestruct][:gen]
  execute_docker_compose :run, ['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake clean gen[docker]']
end

if options[:awestruct][:preview]
  execute_docker_compose :run, ['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake clean preview[docker]']
end

if options[:stage_pr]
  puts 'Running the stage PR for PR number' + options[:stage_pr].to_s
  puts "running rake create_pr_dirs[docker-pr,build,#{options[:stage_pr]}]"
  execute_docker_compose :run, ['--no-deps', '--rm', '--service-ports', 'awestruct', "bundle exec rake create_pr_dirs[docker-pr,build,#{options[:stage_pr]}]"]
  execute_docker_compose :run, ['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake clean']
end

