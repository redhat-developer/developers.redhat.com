require_relative '../_docker/lib/process_runner'
require 'fileutils'
require 'json'

#
# This class is used as an environment-agnostic wrapper to execute broken links checks on Jenkins.
#
class JenkinsBlinkrRunner

  def initialize(host_to_test, control_script_directory, process_runner)
    @host_to_test = host_to_test
    @control_script_directory = control_script_directory
    @process_runner = process_runner
  end

  def run_checks
    execute_checks
  end

  private

  #
  # Execute the broken link checks
  #
  def execute_checks
    test_execution_command = build_run_tests_command
    @process_runner.execute!(test_execution_command)
    determine_result
  end

  #
  # Reads an environment variable, returning its value or nil if it is not set or empty
  #
  def read_env_variable(variable_name)
    return nil if ENV[variable_name].nil? || ENV[variable_name].empty?
    ENV[variable_name]
  end

  #
  # Builds the command to use to execute the checks, including whether or not we should send updates to GitHub.
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


  #
  # Reads blinkr report and fails build if the report contains broken links.
  #
  def determine_result
    report = "#{File.dirname(__FILE__)}/blinkr_errors.json"
    if File.exist?(report)
    file = File.read(report)
    blinkr_errors = JSON.parse(file)
    if blinkr_errors['pages'][0]['errors'].to_s.include?('Broken link')
      puts 'Blinkr failed.'
      Kernel.exit(1)
    else
      Kernel.exit(0)
    end
    end
  end

end
#
# Wraps the actual execution of the tests to allow us to unit test that call
#
def execute(jenkins_test_runner)
  jenkins_test_runner.run_checks
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
