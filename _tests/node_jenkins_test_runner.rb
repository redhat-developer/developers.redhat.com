require_relative '../_docker/lib/process_runner'
require 'fileutils'
#
# This class wraps a number of calls to _docker/control.rb to allow us to run the e2e tests with a number of profiles
# or broken-link checks, and then amalgamate the result into a generalised fail or pass.
#
class NodeJenkinsTestRunner

  def initialize(test_type, host_to_test, control_script_directory, process_runner)
    @test_type = test_type
    @host_to_test = host_to_test
    @control_script_directory = control_script_directory
    @process_runner = process_runner
  end

  #
  # Run the tests based on user specified test type
  #
  def run_tests
    tests_passed = true
    if @test_type == 'e2e' || @test_type == 'kc_e2e'
      %w(desktop mobile).each do |profile|
        tests_passed &= execute_e2e(profile)
      end
    else
      tests_passed &= execute_blc
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
    begin
      @process_runner.execute!(test_execution_command)
    rescue
      puts "Run of test profile '#{profile}' failed."
      success = false
    end
    clear_download_dir
    success
  end

  def clear_download_dir
    FileUtils.rm_rf("#{@control_script_directory}/e2e/tmp/chromeDownloads")
  end

  #
  # Execute the blc tests for the given profile
  #
  def execute_blc
    success = true
    test_execution_command = build_blc_run_tests_command
    begin
      @process_runner.execute!(test_execution_command)
    rescue
      puts 'Run of blc failed.'
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
    command = "ruby _tests/run_tests.rb --e2e --use-docker --base-url=#{@host_to_test}"
    github_sha1 = read_env_variable('ghprbActualCommit')
    cucumber_tags = read_env_variable('CUCUMBER_TAGS')
    command += " --update-github-status=#{github_sha1}" if github_sha1
    command += ' --kc' if @test_type == 'kc_e2e'
    command += ' --browser=iphone_6' if profile == 'mobile'
    command += " --profile=#{profile}"
    if cucumber_tags.nil?
      if profile == 'desktop'
        command += ' --cucumber-tags=~@mobile'
      else
        command += ' --cucumber-tags=~@desktop'
      end
    else
      if profile == 'desktop'
        command += " --cucumber-tags=~@mobile,#{cucumber_tags}"
      else
        command += " --cucumber-tags=~@desktop,#{cucumber_tags}"
      end
    end
    command
  end

  #
  # Builds the command to use to execute the broken-link checks, including whether or not
  # we should send updates to GitHub
  #
  def build_blc_run_tests_command
    github_sha1 = read_env_variable('ghprbActualCommit')
    config = read_env_variable('CONFIG')
    command = "ruby _tests/run_tests.rb --blc -c #{config} --base-url=#{@host_to_test}"
    command += " --update-github-status=#{github_sha1}" if github_sha1
    command += ' --use-docker'
    command
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
  available_test_types = %w[blc e2e kc_e2e]
  test_type = ARGV[0]
  unless available_test_types.include?(test_type)
    puts "Please specify a valid test type that you wish to run. Available test types: #{available_test_types}"
    Kernel.exit(1)
  end

  host_to_test = ARGV[1]
  if host_to_test.nil? || host_to_test.empty?
    puts 'Please specify the host to test as the first argument to this script e.g. ruby jenkins_test_runner.rb https://developers.redhat.com'
    Kernel.exit(1)
  end
  jenkins_test_runner = NodeJenkinsTestRunner.new(test_type, host_to_test, "#{__dir__}", ProcessRunner.new)
  execute(jenkins_test_runner)
end