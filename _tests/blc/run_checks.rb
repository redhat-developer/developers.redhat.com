require_relative '../../_docker/lib/process_runner'
require_relative '../../_docker/lib/default_logger'
require_relative 'run_blc_options'
require 'fileutils'
require 'json'
#
# This provides a common wrapper around running broken link checking related tasks, such as dcp,
# and website broken-link checks. It will handle things like ensuring Docker commands are
# executed in the correct order etc, before running the tests.
#
# Execute this script with -h to see the list of available command line options.
#
class RunChecks

  def initialize(test_dir, process_runner, run_tests_options)
    @test_dir = test_dir
    @process_runner = process_runner
    @run_tests_options = run_tests_options
    @log = DefaultLogger.logger
  end

  #
  # Execute specified test type with the given command line arguments.
  #
  def execute_checks(args = [])
    test_configuration = @run_tests_options.parse_command_line(args)
    test_configuration[:docker] ? run_blc_in_docker(test_configuration) : run_tests_from_command_line(test_configuration)
  end

  private

  #
  # Builds the broken link checking base Docker image
  #
  def build_blc_base_docker_image(test_dir)
    @process_runner.execute!("cd #{test_dir} && docker build -t test-base:0.1.0 .")
  end

  #
  # Runs the broken link checks within Docker by executing
  # a number of Docker commands in sequence.
  #
  def run_blc_in_docker(test_configuration)
    build_blc_base_docker_image(@test_dir)
    compose_project_name = docker_compose_project_name
    compose_environment_directory = "#{@test_dir}/#{ENV['rhd_test']}/environments"
    @log.info("Launching #{ENV['rhd_test']} broken-link-checking environment...")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} build")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} up -d blinkr_chrome")  if test_configuration[:blinkr]
    @log.info("Broken-link-checking environment up and running. Running #{ENV['rhd_test']} tests...")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} run --rm --no-deps rhd_#{ENV['rhd_test']}_testing #{test_configuration[:run_tests_command]}")
    @log.info("Completed run of #{ENV['rhd_test']} checks.")
  end

  def run_tests_from_command_line(test_configuration)
    @log.info("Running #{ENV['rhd_test']} checks from the command line...")
    @process_runner.execute!(test_configuration[:run_tests_command])
    @log.info("Completed command line run of #{ENV['rhd_test']} checks.")
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
    run_tests = RunChecks.new(base_dir, ProcessRunner.new, RunBlcOptions.new(base_dir))
    run_tests.execute_checks(ARGV)
    Kernel.exit(0)
  rescue
    Kernel.exit(1)
  end
end
