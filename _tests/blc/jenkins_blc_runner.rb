require_relative '../../_docker/lib/process_runner'
require_relative '../../_docker/lib/default_logger'
require 'fileutils'

#
# This class wraps a number of calls to _docker/control.rb to allow us to run the e2e tests with a number of profiles
# or broken-link checks, and then amalgamate the result into a generalised fail or pass.
#
class JenkinsBlcRunner

  def initialize(test_type, host_to_test, control_script_directory, process_runner)
    @test_type = test_type
    @host_to_test = host_to_test
    @control_script_directory = control_script_directory
    @process_runner = process_runner
    @log = DefaultLogger.logger
  end

  #
  # Run the tests based on user specified test type
  #
  def run_checks
    tests_passed = true
    if @test_type == 'blinkr'
      tests_passed &= execute_blinkr
    elsif @test_type == 'dcp'
      tests_passed &= execute_dcp_checks
    else
      fail(StandardError, "#{@test_type} is not a recognised test type, please check and try again")
    end
    tests_passed
  end

  private

  #
  # Execute the blc checks, if critical link checks fail it will bail and fail build
  #
  def execute_blinkr
    success = true
    test_execution_command = build_blc_run_tests_command
    begin
      @process_runner.execute!(test_execution_command)
    rescue
      puts 'Run of blinkr checks failed.'
      success = false
    end
    success
  end

  #
  # Execute the blc checks, if critical link checks fail it will bail and fail build
  #
  def execute_dcp_checks
    success = true
    test_execution_command = build_dcp_run_tests_command
    begin
      @process_runner.execute!(test_execution_command)
    rescue
      puts 'Run of dcp broken link checks failed.'
      success = false
    end
    success
  end

  #
  # Reads an environment variable, returning its value or nil if it is not set or empty
  #
  def read_env_variable(variable_name)
    return nil if ENV[variable_name].nil? || ENV[variable_name].empty?
    ENV[variable_name]
  end

  #
  # Builds the command to use to execute the broken-link checks, including whether or not
  # we should send updates to GitHub
  #
  def build_blc_run_tests_command
    github_sha1 = read_env_variable('PULL_REQUEST_GIT_COMMIT_SHA1')
    config = read_env_variable('CONFIG')
    command = "ruby _tests/blc/run_checks.rb --blinkr -c #{config} --base-url=#{@host_to_test}"
    command += ' --use-docker'
    command += " --update-github-status=#{github_sha1}" if github_sha1
    command
  end

  # Builds the command to use to execute the broken-link checks, including whether or not
  # we should send updates to GitHub
  #
  def build_dcp_run_tests_command
    command = "ruby _tests/blc/run_checks.rb --dcp --base-url=#{@host_to_test}"
    command += ' --use-docker'
    command
  end
end

#
# Wraps the actual execution of the tests to allow us to unit test that call
#
def execute(jenkins_test_runner)
  tests_passed = jenkins_test_runner.run_checks
  Kernel.exit(tests_passed ? 0 : 1)
end

if $PROGRAM_NAME == __FILE__
  available_test_types = %w(blinkr dcp)
  test_type = ARGV[0]
  unless available_test_types.include?(test_type)
    puts "Please specify a valid test type as the second argument to this script. Available test types: #{available_test_types}"
    Kernel.exit(1)
  end

  host_to_test = ARGV[1]
  if host_to_test.nil? || host_to_test.empty?
    puts 'Please specify the host to test as the second argument to this script e.g. ruby node_jenkins_test_runner.rb blinkr https://developers.redhat.com'
    Kernel.exit(1)
  end
  jenkins_test_runner = JenkinsBlcRunner.new(test_type, host_to_test, "#{__dir__}", ProcessRunner.new)
  execute(jenkins_test_runner)
end
