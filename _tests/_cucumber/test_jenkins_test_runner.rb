require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../_cucumber/jenkins_test_runner'
require_relative '../test_helper'

class TestJenkinsTestRunner < Minitest::Test

  def setup
    clear_environment
  end

  def teardown
    clear_environment
  end

  def clear_environment
    ENV['CUCUMBER_TAGS'] = nil
    ENV['ghprbActualCommit'] = nil
    ENV['STUBBED_DATA'] = nil
  end

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

  def test_enables_github_status_update_and_cucumber_tags_if_both_present
    ENV['CUCUMBER_TAGS'] = 'foo'
    ENV['ghprbActualCommit'] = '123'
    ENV['STUBBED_DATA'] = 'true'
    process_runner = mock()
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=desktop --host-to-test=http://foo.com --update-github-status=123 --cucumber-tags=foo --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=mobile --host-to-test=http://foo.com --update-github-status=123 --cucumber-tags=foo --driver=iphone_6 --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=kc_dm --host-to-test=http://foo.com --update-github-status=123 --cucumber-tags=foo --stubbed-data=true')

    jenkins_test_runner = JenkinsTestRunner.new('http://foo.com', '/my/scripts', process_runner)
    assert(jenkins_test_runner.run_tests)
  end

  def test_enables_cucumber_tags_if_present_in_env
    ENV['CUCUMBER_TAGS'] = 'foo'
    ENV['STUBBED_DATA'] = 'true'
    process_runner = mock()
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=desktop --host-to-test=http://foo.com --cucumber-tags=foo --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=mobile --host-to-test=http://foo.com --cucumber-tags=foo --driver=iphone_6 --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=kc_dm --host-to-test=http://foo.com --cucumber-tags=foo --stubbed-data=true')

    jenkins_test_runner = JenkinsTestRunner.new('http://foo.com', '/my/scripts', process_runner)
    assert(jenkins_test_runner.run_tests)
  end

  def test_enables_github_status_update_if_sha1_present_in_env
    ENV['ghprbActualCommit'] = '123'
    ENV['STUBBED_DATA'] = 'true'
    process_runner = mock()
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=desktop --host-to-test=http://foo.com --update-github-status=123 --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=mobile --host-to-test=http://foo.com --update-github-status=123 --driver=iphone_6 --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=kc_dm --host-to-test=http://foo.com --update-github-status=123 --stubbed-data=true')

    jenkins_test_runner = JenkinsTestRunner.new('http://foo.com', '/my/scripts', process_runner)
    assert(jenkins_test_runner.run_tests)
  end

  def test_successful_execution_of_all_profiles_returns_true
    ENV['STUBBED_DATA'] = 'true'
    process_runner = mock()
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=desktop --host-to-test=http://foo.com --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=mobile --host-to-test=http://foo.com --driver=iphone_6 --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=kc_dm --host-to-test=http://foo.com --stubbed-data=true')

    jenkins_test_runner = JenkinsTestRunner.new('http://foo.com', '/my/scripts', process_runner)
    assert(jenkins_test_runner.run_tests)
  end

  def test_any_failed_profile_returns_false
    ENV['STUBBED_DATA'] = 'true'
    process_runner = mock()
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=desktop --host-to-test=http://foo.com --stubbed-data=true')
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=mobile --host-to-test=http://foo.com --driver=iphone_6 --stubbed-data=true').raises(StandardError.new('foo'))
    process_runner.expects(:execute!).with('cd /my/scripts && bundle exec ruby run_tests.rb --use-docker --profile=kc_dm --host-to-test=http://foo.com --stubbed-data=true')

    jenkins_test_runner = JenkinsTestRunner.new('http://foo.com', '/my/scripts', process_runner)
    refute(jenkins_test_runner.run_tests)
  end

end
