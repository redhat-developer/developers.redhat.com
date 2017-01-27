require_relative '../_docker/lib/process_runner'
require_relative '../_docker/lib/default_logger'
require_relative '../_cucumber/lib/options/run_tests_options'

#
# This provides a wrapper around running the acceptance tests. It will handle things like ensuring Docker commands
# are executed in the correct order etc, before running the tests.
#
# Execute this script with -h to see the list of available command line options.
#
# @author rblake@redhat.com
#
class RunTests

  def initialize(cucumber_dir, process_runner, run_tests_options)
    @cucumber_dir = cucumber_dir
    @process_runner = process_runner
    @run_tests_options = run_tests_options
    @log = DefaultLogger.logger
  end

  #
  # Execute the acceptance tests with the given command line arguments
  #
  def run_acceptance_tests(args=[])
    test_configuration = @run_tests_options.parse_command_line(args)

    if test_configuration[:docker]
      run_tests_in_docker(test_configuration)
    else
      run_tests_from_command_line(test_configuration)
    end
  end

  private

  #
  # Runs the acceptance tests in Docker by executing a number of Docker commands in sequence
  #
  def run_tests_in_docker(test_configuration)
    compose_project_name = docker_compose_project_name
    compose_environment_directory = "#{@cucumber_dir}/environments"

    @log.info('Running acceptance tests using Docker. Launching testing environment...')
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} build")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} up -d #{test_configuration[:docker_node]}")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} scale #{test_configuration[:docker_node]}=#{test_configuration[:browser_count]}")

    @log.info('Testing environment up and running. Running acceptance tests...')
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} run --rm --no-deps tests #{test_configuration[:run_tests_command]}")
    @log.info('Completed run of acceptance tests.')
  end

  #
  # Determines the docker-compose project name that should be used. If the user has specified
  # anything using the COMPOSE_PROJECT_NAME ENV variable, we use that, otherwise default to rhdtesting
  #
  def docker_compose_project_name
    compose_project_name = ENV['COMPOSE_PROJECT_NAME']
    if compose_project_name.nil? || compose_project_name.empty?
      compose_project_name = 'rhdtesting'
    end
    compose_project_name
  end

  #
  # Runs the tests directly from the command line i.e. not in Docker
  #
  def run_tests_from_command_line(test_configuration)
    @log.info('Running acceptance tests from the command line...')
    @process_runner.execute!("cd #{@cucumber_dir} && #{test_configuration[:run_tests_command]}")
    @log.info('Completed command line run of acceptance tests.')
  end

end

# Guard to allow us to unit test this class
if $PROGRAM_NAME == __FILE__
  cucumber_dir = File.dirname(__FILE__)
  begin
    run_tests = RunTests.new(cucumber_dir, ProcessRunner.new, RunTestsOptions.new(cucumber_dir))
    run_tests.run_acceptance_tests(ARGV)
    Kernel.exit(0)
  rescue
    Kernel.exit(1)
  end
end
