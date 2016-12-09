require_relative '../_docker/lib/process_runner'

#
# This class wraps a number of calls to _docker/control.rb to allow us to run the acceptance tests with a number of profiles
# and amalgamate the result into a generalised fail or pass
#
class JenkinsTestRunner

  def initialize(host_to_test, control_script_directory, process_runner)
    @host_to_test = host_to_test
    @control_script_directory = control_script_directory
    @process_runner = process_runner
  end

  #
  # Run the tests for each of our test profiles
  #
  def run_tests
    tests_passed = true
    %w(desktop mobile kc_dm).each do |profile|
      tests_passed &= execute_test(profile)
    end
    tests_passed
  end

  #
  # Execute the tests for the given profile
  #
  def execute_test(profile)
    success = true

    begin
      @process_runner.execute!("cd #{@control_script_directory} && bundle exec ruby ./control.rb -e drupal-pull-request --acceptance_test_profile=#{profile} --acceptance_test_target=#{@host_to_test}")
    rescue
      puts "Run of test profile '#{profile}' failed."
      success = false
    end
    success
  end

  private :execute_test

end

#
# Wraps the actual execution of the tests to allow us to unit test that call
#
def execute(jenkins_test_runner)
  tests_passed = jenkins_test_runner.run_tests
  Kernel.exit(tests_passed ? 0 : 1)
end

if $PROGRAM_NAME == __FILE__

  host_to_test = ARGV[0]
  if host_to_test.nil? || host_to_test.empty?
    puts 'Please specify the host to test as the first argument to this script e.g. ruby jenkins_test_runner.rb https://developers.redhat.com'
    Kernel.exit(1)
  end

  jenkins_test_runner = JenkinsTestRunner.new(host_to_test, "#{__dir__}/../_docker", ProcessRunner.new)
  execute(jenkins_test_runner)
end
