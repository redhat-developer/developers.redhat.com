require_relative '../_docker/lib/process_runner'
require_relative '../_docker/lib/default_logger'
require_relative '../_blinkr/lib/run_blinkr_options'
require 'fileutils'
require 'json'
#
# This provides a wrapper around running the blinkr link checks. It will handle things like ensuring Docker commands
# are executed in the correct order etc, before running the checks.
#
# Execute this script with -h to see the list of available command line options.
#
# @author ihamilto@redhat.com
#
class RunBlinkr

  def initialize(blinkr_dir, process_runner, run_tests_options)
    @blinkr_dir = blinkr_dir
    @process_runner = process_runner
    @run_tests_options = run_tests_options
    @log = DefaultLogger.logger
  end

  #
  # Execute the blinkr with the given command line arguments
  #
  def run_blinkr(args = [])
    test_configuration = @run_tests_options.parse_command_line(args)
    run_blinkr_in_docker(test_configuration)
  end

  private

  #
  # Runs the blinkr in Docker by executing a number of Docker commands in sequence
  #
  def run_blinkr_in_docker(test_configuration)
    compose_project_name = docker_compose_project_name
    compose_environment_directory = "#{@blinkr_dir}/environments"

    @log.info('Running blinkr. Launching testing environment...')
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} build")

    @log.info('Link checking environment up and running. Running Blinkr...')
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} run --rm --no-deps broken_link_checks #{test_configuration[:run_tests_command]}")
    @log.info('Completed run of blinkr checks.')
  end

  #
  # Determines the docker-compose project name that should be used. If the user has specified
  # anything using the COMPOSE_PROJECT_NAME ENV variable, we use that, otherwise default to rhdtesting
  #
  def docker_compose_project_name
    compose_project_name = ENV['COMPOSE_PROJECT_NAME']
    if compose_project_name.nil? || compose_project_name.empty?
      compose_project_name = 'rhdblinkr'
    end
    compose_project_name
  end

end

# Guard to allow us to unit test this class
if $PROGRAM_NAME == __FILE__
  blinkr_dir = File.dirname(__FILE__)
  begin
    run_tests = RunBlinkr.new(blinkr_dir, ProcessRunner.new, RunBlinkrOptions.new(blinkr_dir))
    run_tests.run_blinkr(ARGV)
    Kernel.exit(0)
  rescue
    Kernel.exit(1)
  end
end
