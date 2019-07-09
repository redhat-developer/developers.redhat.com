require_relative '../_docker/lib/process_runner'
require_relative '../_docker/lib/default_logger'
require_relative 'run_test_options'
require 'fileutils'
require 'json'
#
# This provides a common wrapper around running testing related tasks, such as unit,
# e2e, and broken-link checks. It will handle things like ensuring Docker commands are
# executed in the correct order etc, before running the tests.
#
# Execute this script with -h to see the list of available command line options.
#
class RunTest

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
    run_tests_in_docker(test_configuration)
  end

  private

  #
  # Runs the specified test type within Docker by executing
  # a number of Docker commands in sequence.
  #
  def run_tests_in_docker(test_configuration)

    compose_project_name = docker_compose_project_name
    compose_environment_directory = "#{@test_dir}/#{ENV['rhd_test']}/environments"

    @log.info("Launching #{ENV['rhd_test']} testing environment...")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} build --pull")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} up -d chrome") if test_configuration[:e2e]

    @log.info("Test environment up and running. Running #{ENV['rhd_test']} tests...")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} run --rm --no-deps rhd_#{ENV['rhd_test']}_testing #{test_configuration[:run_tests_command]}")
    @log.info("Completed run of #{ENV['rhd_test']} tests.")
  end

  #
  # Determines the docker-compose project name that should be used. If the user has specified
  # anything using the COMPOSE_PROJECT_NAME ENV variable, we use that,
  # otherwise default to rhd_test_type_testing
  #
  def docker_compose_project_name
    compose_project_name = ENV['COMPOSE_PROJECT_NAME']
    if compose_project_name.nil? || compose_project_name.empty?
      compose_project_name = "rhd_#{ENV['rhd_test']}_testing"
    end
    compose_project_name
  end

end

# Guard to allow us to unit test this class
if $PROGRAM_NAME == __FILE__
  base_dir = File.dirname(__FILE__)
  begin
    run_tests = RunTest.new(base_dir, ProcessRunner.new, RunTestOptions.new(base_dir))
    run_tests.execute_tests(ARGV)
    Kernel.exit(0)
  rescue
    Kernel.exit(1)
  end
end
