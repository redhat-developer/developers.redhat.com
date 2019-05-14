require_relative '../_docker/lib/process_runner'
require_relative '../_docker/lib/default_logger'
require 'fileutils'

#
# This class wraps a number of calls to _docker/control.rb to allow us to run the e2e tests with a number of profiles
# or broken-link checks, and then amalgamate the result into a generalised fail or pass.
#
class NodeJenkinsTestRunner

  def initialize(host_to_test, control_script_directory, process_runner)
    @host_to_test = host_to_test
    @control_script_directory = control_script_directory
    @process_runner = process_runner
    @log = DefaultLogger.logger
  end

  #
  # Run the tests based on user specified test type
  #
  def run_tests
    clear_report_dir
    tests_passed = true
    %w(desktop mobile).each do |profile|
      tests_passed &= execute_e2e(profile)
      tests_passed
    end
    tests_passed
  end

  private

  #
  # Execute the e2e tests for the given profile
  #
  def execute_e2e(profile)
    success = true
    test_execution_command = build_e2e_run_tests_command(profile)
    create_download_dir
    begin
      @process_runner.execute!(test_execution_command)
    rescue
      puts "Run of test profile '#{profile}' failed."
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
  # Builds the command to use to execute the e2e tests, including whether or not
  # we should send updates to GitHub and any Cucumber tags that should be applied.
  #
  def build_e2e_run_tests_command(profile)
    command = "ruby _tests/run_tests.rb --e2e --base-url=#{@host_to_test}"
    github_sha1 = read_env_variable('PULL_REQUEST_GIT_COMMIT_SHA1')
    rhd_js_driver = read_env_variable('RHD_JS_DRIVER') ? read_env_variable('RHD_JS_DRIVER') : 'chrome'
    command += " --update-github-status=#{github_sha1}" if github_sha1
    (profile == 'mobile') ? command += " --browser=mobile" : command += " --browser=#{rhd_js_driver}"
    command += " --profile=#{profile}"
    command += ' --tags=not:desktop' if profile == 'mobile'
    command
  end

  def clear_report_dir
    FileUtils.rm_rf("#{@control_script_directory}/e2e/report")
  end

  def create_download_dir
    FileUtils.mkdir_p("#{@control_script_directory}/e2e/tmp_downloads")
  end
end

#
# Wraps the actual execution of the tests to allow us to unit test that call
#
def execute(jenkins_test_runner)
  tests_passed = jenkins_test_runner.run_tests
  Kernel.exit(tests_passed ? 0 : 1)
end

if $PROGRAM_NAME == __FILE__
  test_type = ARGV[0] # to be removed
  host_to_test = ARGV[1]
  if host_to_test.nil? || host_to_test.empty?
    puts 'Please specify the host to test as the first argument to this script e.g. ruby node_jenkins_test_runner.rb https://developers.redhat.com'
    Kernel.exit(1)
  end
  jenkins_test_runner = NodeJenkinsTestRunner.new(host_to_test, "#{__dir__}", ProcessRunner.new)
  execute(jenkins_test_runner)
end
