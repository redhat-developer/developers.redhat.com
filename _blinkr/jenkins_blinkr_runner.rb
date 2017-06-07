require_relative '../_docker/lib/process_runner'

#
# This class wraps a number of calls to _docker/control.rb to allow us to run the broken link checks and amalgamate the result into a generalised fail or pass
#
class JenkinsBlinkrRunner

  def initialize(host_to_test, control_script_directory, process_runner)
    @host_to_test = host_to_test
    @control_script_directory = control_script_directory
    @process_runner = process_runner
  end

  #
  # Run the tests for each of our test profiles
  #
  def run_checks
    execute_checks
  end

  private

  #
  # Execute the checks
  #
  def execute_checks
    result = true
    test_execution_command = build_run_tests_command

    begin
      @process_runner.execute!(test_execution_command)
    rescue
      puts 'Blinkr failed.'
      result = false
    end
    result
  end

  #
  # Reads an environment variable, returning its value or nil if it is not set or empty
  #
  def read_env_variable(variable_name)
    return nil if ENV[variable_name].nil? || ENV[variable_name].empty?
    ENV[variable_name]
  end

  #
  # Builds the command to use to execute the tests, including whether or not we should send updates to GitHub and any Cucumber tags
  # that should be applied
  #
  def build_run_tests_command
    command = "cd #{@control_script_directory} && bundle exec ruby ./run_blinkr.rb"
    github_sha1 = read_env_variable('ghprbActualCommit')
    config = read_env_variable('CONFIG')
    ignore_internal = read_env_variable('IGNORE_INTERNAL_LINKS')
    ignore_external = read_env_variable('IGNORE_EXTERNAL_LINKS')
    command += " -c config/#{config}" if config
    command += " -u #{@host_to_test}"
    command += ' -v'
    command += ' --ignore-ssl'
    command += " --update-github-status=#{github_sha1}" if github_sha1
    command += ' --ignore-external' if ignore_external
    command += ' --ignore-internal' if ignore_internal
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

  host_to_test = ARGV[0]
  if host_to_test.nil? || host_to_test.empty?
    puts 'Please specify the host to test as the first argument to this script e.g. ruby jenkins_test_runner.rb https://developers.redhat.com'
    Kernel.exit(1)
  end

  jenkins_test_runner = JenkinsBlinkrRunner.new(host_to_test, "#{__dir__}", ProcessRunner.new)
  execute(jenkins_test_runner)
end
