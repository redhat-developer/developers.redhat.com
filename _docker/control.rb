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
    puts "- Executing 'docker-compose' -f '#{environment.get_docker_compose_file}' with command '#{cmd}' and args '#{args}'"
    Kernel.abort('Error running docker-compose') unless Kernel.system *['docker-compose', '-f', "#{environment.get_docker_compose_file}", '-f', "#{environment.get_testing_docker_compose_file}", cmd.to_s, *args]
  end

  def execute_docker(cmd, args = [])
    puts "- Executing 'docker' with command '#{cmd}' and args #{args}"
    Kernel.abort('Error running docker') unless Kernel.system 'docker', cmd.to_s, *args
  end

  def kill_current_environment(environment)
    puts "- Attempting to stop all running Docker containers for environment '#{environment.environment_name}'..."

    begin
      Docker::Network.get("#{environment.get_compose_project_name}_default")
      execute_docker_compose(environment,:down, %w(-v))
      puts '- Stopped current Docker environment.'
    rescue
      puts "- No containers for Docker environment '#{environment.environment_name}' are running."
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
    puts 'Succesfully decrypted vault and bound environment parameters.'
  rescue GPGME::Error => e
    abort "Unable to decrypt vault (#{e})"
  end
end

#
# Determines the port on the Docker host to which the given port for the specified container
# is mapped.
#
def get_host_mapped_port_for_container(environment, container_name, container_port)
  container = get_docker_container(environment, "#{container_name}_1")
  port_info = container.json['NetworkSettings']['Ports'][container_port].first
  port_info['HostPort']
end

def wait_for_supporting_service_to_start(environment, service_name, service_port, service_url)

    puts "Waiting for service '#{service_name}' to start..."

    service_host = determine_docker_host_for_container_ports
    service_port = get_host_mapped_port_for_container(environment, service_name, service_port)

    target_url = "http://#{service_host}:#{service_port}/#{service_url}"
    puts "Testing access to service '#{service_name}' via URL '#{target_url}'..."

    up = false
    until up do
      begin
        response = Net::HTTP.get_response(URI(target_url))
        response_code = response.code.to_i
        up = response_code < 400
      rescue
        up = false
      end
    end

    puts "Service '#{service_name}' is up on '#{target_url}'"

    [service_host, service_port]
end

def wait_for_drupal_to_start(environment, supporting_services)

  if check_supported_service_requested(supporting_services, 'drupal')

    drupal_host, drupal_port = wait_for_supporting_service_to_start(environment, 'drupal','80/tcp','user/login')

  else
    puts 'Not waiting for Drupal to start as it is not a required supporting_service'
  end
end

#
# Gets the JSON for a the given container in the given environment
#
def get_docker_container(environment, container_name)

  container_id = "#{environment.get_compose_project_name}_#{container_name}"
  container = Docker::Container.get(container_id)

  until container.json['NetworkSettings']['Ports']
    puts "Finding port info for Docker container '#{container_id}'..."
    container = Docker::Container.get(container_id)
  end

  container
end

def check_supported_service_requested(supporting_services, service_name)
  !supporting_services.nil? and supporting_services.include?(service_name)
end

def wait_for_searchisko_to_start(environment, supporting_services)

  if check_supported_service_requested(supporting_services, 'searchisko')
    wait_for_supporting_service_to_start(environment, 'searchisko','8080/tcp','v2/rest/search/events')
  else
    puts 'Not waiting for Searchisko to start as it is not a required supporting_service'
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

  puts "- Copying project dependencies into '_docker/awestruct' for build..."

  parent_gemfile = File.open '../Gemfile'
  parent_gemlock = File.open '../Gemfile.lock'

  target_gemfile = FileHelpers.open_or_new('awestruct/Gemfile')
  target_gemlock = FileHelpers.open_or_new('awestruct/Gemfile.lock')
  #Only copy if the file has changed. Otherwise docker won't cache optimally
  FileHelpers.copy_if_changed(parent_gemfile, target_gemfile)
  FileHelpers.copy_if_changed(parent_gemlock, target_gemlock)

  puts "- Successfully copied project dependencies into '_docker/awestruct' for build."

end

#
# Wrapper around calls out to npm
#
def run_npm_command(cmd, error_message)

  puts " -- Running command '#{cmd}'..."
  out, status = Open3.capture2e("#{cmd}")
  Kernel.abort("#{error_message}: #{out}") unless status.success?
end

#
# Delegates out to Gulp to build the CSS and JS for Drupal
#
def build_css_and_js_for_drupal
  puts '- Building CSS and JS for Drupal...'

  run_npm_command('npm install',"Failed to run 'npm install'. Do you have npm installed?")
  run_npm_command('$(npm bin)/gulp', 'Failed to run Gulp to build CSS and JS for Drupal')

  puts '- Successfully built CSS and JS for Drupal'
end

def create_proxy_environment_docker_build_args(environment)
  ['--build-arg', "http_proxy=#{environment.get_http_proxy}",'--build-arg', "https_proxy=#{environment.get_https_proxy}"]
end

#
# Builds the developers.redhat.com base Docker images
#
def build_base_docker_images(environment, system_exec)

  build_args = []

  if environment.requires_proxy?
    build_args += create_proxy_environment_docker_build_args(environment)
  end

  system_exec.execute_docker(:build, %w(--tag=developer.redhat.com/base:2.0.0).concat(build_args).concat(%w(./base)))
  system_exec.execute_docker(:build, %w(--tag=developer.redhat.com/java:2.0.0).concat(build_args).concat(%w(./java)))
  system_exec.execute_docker(:build, %w(--tag=developer.redhat.com/ruby:2.0.0).concat(build_args).concat(%w(./ruby)))
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
    environment.create_template_resources
  end

  copy_project_dependencies_for_awestruct_image
  build_base_docker_images(environment, system_exec)
  build_environment_docker_images(environment, system_exec)

end

#
# This works around using docker-machine in non-native docker environments e.g. on a Mac.
# In that scenario, host-mapped container ports are *not* mapped to localhost, instead they are mapped
# to the VM provisioned by docker-machine.
#
# Users are expected to set a host alias of 'docker' for the VM that is running their docker containers. If
# this alias does not exist, then we have to assume that Docker is running directly on the local machine.
#
# Note: We cannot rely on 'docker inspect' to determine this as it reports the host IP as 0.0.0.0 in a
# docker-machine environment, presumably because that makes sense in the context of the docker-machine install.
#
def determine_docker_host_for_container_ports

  begin
    docker_host = Resolv.getaddress('docker')
    puts "Host alias for 'docker' found. Assuming container ports are exposed on ip '#{docker_host}'"
  rescue
    docker_host = Resolv.getaddress(Socket.gethostname)
    puts "No host alias for 'docker' found. Assuming container ports are exposed on '#{docker_host}'"
  end

  docker_host

end

def bind_drupal_container_details_into_environment(environment, supporting_services)
  if check_supported_service_requested(supporting_services, 'drupal')
    drupal_host = determine_docker_host_for_container_ports
    drupal_port = get_host_mapped_port_for_container(environment, 'drupal', '80/tcp')

    # Add this to the ENV so we can pass it to the awestruct build and also to templating of environment resources
    # Add the drupal cdn prefix - TODO not sure why this is here?
    ENV['cdn_prefix'] = 'sites/default/files'
    ENV['DRUPAL_HOST_IP'] = drupal_host
    ENV['DRUPAL_HOST_PORT'] = drupal_port

    puts "Bound environment variables: DRUPAL_HOST_IP='#{drupal_host}', DRUPAL_HOST_PORT='#{drupal_port}'"
  end
end

def bind_searchisko_container_details_into_environment(environment, supporting_services)
  if check_supported_service_requested(supporting_services, 'searchisko')
    searchisko_host = determine_docker_host_for_container_ports
    searchisko_port = get_host_mapped_port_for_container(environment, 'searchisko', '8080/tcp')
    ENV['SEARCHISKO_HOST_IP'] = searchisko_host
    ENV['SEARCHISKO_HOST_PORT'] = searchisko_port
    puts "Bound environment variables: SEARCHISKO_HOST_IP='#{searchisko_host}', SEARCHISKO_HOST_PORT='#{searchisko_port}'"
  end
end


#
# Starts any required supporting services (if any), and then waits for them to be
# reported as up before continuing
#
def start_and_wait_for_supporting_services(environment, supporting_services, system_exec)

  unless supporting_services.nil? or supporting_services.empty?
    puts 'Starting all required supporting services...'

    system_exec.execute_docker_compose(environment, :up, %w(-d --no-recreate).concat(supporting_services))

    bind_drupal_container_details_into_environment(environment, supporting_services)
    bind_searchisko_container_details_into_environment(environment, supporting_services)
    environment.template_resources

    wait_for_searchisko_to_start(environment, supporting_services)
    wait_for_drupal_to_start(environment, supporting_services)

    puts 'Started all required supporting services.'
  else
    puts 'No supporting services to start.'
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

  if tasks[:unit_tests]
    system_exec.execute_docker_compose(environment, :run, tasks[:unit_tests])
  end

  start_and_wait_for_supporting_services(environment, tasks[:supporting_services], system_exec)

  if tasks[:awestruct_command_args]
    system_exec.execute_docker_compose(environment, :run, tasks[:awestruct_command_args])
  end

  if tasks[:scale_grid]
    system_exec.execute_docker_compose(environment,:scale, tasks[:scale_grid])
  end

  if tasks[:acceptance_test_target_task]
    system_exec.execute_docker_compose(environment,:run, tasks[:acceptance_test_target_task])
  end
end
