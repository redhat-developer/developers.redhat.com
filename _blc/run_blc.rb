require_relative '../_docker/lib/process_runner'
require_relative '../_docker/lib/default_logger'
require_relative '../_blc/lib/options/blc_tests_options'

#
# This provides a wrapper around running the broken link checks. It will handle things like ensuring Docker commands
# are executed in the correct order etc, before running the checks.
#
# Execute this script with -h to see the list of available command line options.
#
# @author rblake@redhat.com & ihamilto@redhat.com
#
class RunBrokenLinkCheck

  def initialize(blc_dir, process_runner, run_tests_options)
    @blc_dir = blc_dir
    @process_runner = process_runner
    @run_tests_options = run_tests_options
    @log = DefaultLogger.logger
  end

  #
  # Execute the broken link checker with the given command line arguments
  #
  def run_broken_link_check(args=[])
    test_configuration = @run_tests_options.parse_command_line(args)
    run_tests_in_docker(test_configuration)
  end

  private

  #
  # Runs the broken link checks in Docker by executing a number of Docker commands in sequence
  #
  def run_tests_in_docker(test_configuration)
    compose_project_name = docker_compose_project_name
    compose_environment_directory = "#{@blc_dir}/environments"

    @log.info('Running broken link checks. Launching testing environment...')
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} build")

    @log.info('Link checking environment up and running. Running broken link checks...')
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} run --rm --no-deps broken_link_check #{test_configuration[:run_tests_command]}")
    @log.info('Completed broken link checks')
  end

  #
  # Determines the docker-compose project name that should be used. If the user has specified
  # anything using the COMPOSE_PROJECT_NAME ENV variable, we use that, otherwise default to rhdbrokenlinkcheck
  #
  def docker_compose_project_name
    compose_project_name = ENV['COMPOSE_PROJECT_NAME']
    if compose_project_name.nil? || compose_project_name.empty?
      compose_project_name = 'rhdbrokenlinkcheck'
    end
    compose_project_name
  end

end

# Guard to allow us to unit test this class
if $PROGRAM_NAME == __FILE__
  blc_dir = File.dirname(__FILE__)
  begin
    run_tests = RunBrokenLinkCheck.new(blc_dir, ProcessRunner.new, RunBlcOptions.new(blc_dir))
    run_tests.run_broken_link_check(ARGV)
    Kernel.exit(0)
  rescue
    Kernel.exit(1)
  end
end
