require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../_cucumber/jenkins_test_runner'
require_relative 'test_helper.rb'

class TestJenkinsTestRunner < Minitest::Test

  def test_should_exit_with_status_zero_if_all_success

    jenkins_test_runner = mock()
    jenkins_test_runner.expects(:run_tests).returns(true)
    Kernel.expects(:exit).with(0)

    execute(jenkins_test_runner)

  end

  def test_should_exit_with_status_one_if_any_failure

    jenkins_test_runner = mock()
    jenkins_test_runner.expects(:run_tests).returns(false)
    Kernel.expects(:exit).with(1)

    execute(jenkins_test_runner)
  end

  def test_successful_execution_of_all_profiles_returns_true

    process_runner = mock()
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby ./control.rb -e drupal-pull-request --acceptance_test_profile=desktop --acceptance_test_target=http://foo.com')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby ./control.rb -e drupal-pull-request --acceptance_test_profile=mobile --acceptance_test_target=http://foo.com')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby ./control.rb -e drupal-pull-request --acceptance_test_profile=kc_dm --acceptance_test_target=http://foo.com')

    jenkins_test_runner = JenkinsTestRunner.new('http://foo.com', '/my/scripts', process_runner)
    assert(jenkins_test_runner.run_tests)
  end

  def test_any_failed_profile_returns_false

    process_runner = mock()
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby ./control.rb -e drupal-pull-request --acceptance_test_profile=desktop --acceptance_test_target=http://foo.com')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby ./control.rb -e drupal-pull-request --acceptance_test_profile=mobile --acceptance_test_target=http://foo.com').raises(StandardError.new('foo'))
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby ./control.rb -e drupal-pull-request --acceptance_test_profile=kc_dm --acceptance_test_target=http://foo.com')

    jenkins_test_runner = JenkinsTestRunner.new('http://foo.com', '/my/scripts', process_runner)
    refute(jenkins_test_runner.run_tests)
  end



end