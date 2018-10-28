require_relative '../../../../../../../../_docker/lib/process_runner'
require_relative '../../../../../../../../_docker/lib/default_logger'
require_relative 'run_unit_test_options'
require 'fileutils'
require 'json'
#
# This provides a common wrapper around running unit test tasks
# It will handle things like ensuring Docker commands are
# executed in the correct order etc, before running the tests.
#
# Execute this script with -h to see the list of available command line options.
#
class RunUnitTest

  def initialize(test_dir, process_runner, run_tests_options)
    @test_dir = test_dir
    @process_runner = process_runner
    @run_tests_options = run_tests_options
    @log = DefaultLogger.logger
  end

  #
  # Execute specified test type with the given command line arguments.
  #
  def execute_tests(args = [])
    test_configuration = @run_tests_options.parse_command_line(args)
    test_configuration[:docker] ? run_tests_in_docker(test_configuration) : run_tests_from_command_line(test_configuration)
  end

  private
  
  #
  # Runs the specified test type within Docker by executing
  # a number of Docker commands in sequence.
  #
  def run_tests_in_docker(test_configuration)
    compose_project_name = docker_compose_project_name
    @log.info("Launching unit testing environment...")
    @process_runner.execute!("cd environments && docker-compose -p #{compose_project_name} build")
    @log.info('Test environment up and running. Running unit tests...')
    @log.info(test_configuration[:run_tests_command])
    @process_runner.execute!("cd environments && docker-compose -p #{compose_project_name} run --rm --no-deps rhd_unit_testing #{test_configuration[:run_tests_command]}")
    @log.info("Completed run of unit tests.")
  end

  def run_tests_from_command_line(test_configuration)
    @log.info('Running unit tests from the command line...')
    @process_runner.execute!(test_configuration[:run_tests_command])
    @log.info('Completed command line run of unit tests.')
  end

  #
  # Determines the docker-compose project name that should be used. If the user has specified
  # anything using the COMPOSE_PROJECT_NAME ENV variable, we use that,
  # otherwise default to rhd_test_type_testing
  #
  def docker_compose_project_name
    compose_project_name = ENV['COMPOSE_PROJECT_NAME']
    if compose_project_name.nil? || compose_project_name.empty?
      compose_project_name = 'rhd_unit_testing'
    end
    compose_project_name
  end

end

# Guard to allow us to unit test this class
if $PROGRAM_NAME == __FILE__
  base_dir = File.dirname(__FILE__)
  begin
    run_tests = RunUnitTest.new(base_dir, ProcessRunner.new, RunUnitTestOptions.new(base_dir))
    run_tests.execute_tests(ARGV)
    Kernel.exit(0)
  rescue
    Kernel.exit(1)
  end
end
