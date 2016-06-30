require 'octokit'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../lib/default_logger'
require_relative '../../lib/pull_request/exec_with_git_hub_status_wrapper'
require_relative '../test_helper'

class TestExecWithGitHubStatusWrapper < MiniTest::Test

  def setup
      ENV['foo'] = 'bar'
      @git_repo = 'redhat-developer/developers.redhat.com'
      @git_sha1 = 'foo'
      @context = 'Unit Tests'
      @target_url = 'http://foo.com'
      @execution_wrapper = ExecWithGitHubStatusWrapper.new(@git_repo, @git_sha1, @context, @target_url)
  end

  def teardown
     ENV['foo'] = nil
  end

  def test_get_env_variable_if_set
    assert_equal('bar', get_env_value('foo', false))
  end

  def test_get_env_variable_if_not_set_dont_raise
    assert_equal(nil, get_env_value('blob', false))
  end

  def test_get_env_variable_if_not_set_and_raise
    assert_raises(StandardError) {
      get_env_value('blob', true)
    }
  end

  def test_initialise_github_statuses

    statuses = 'Blinkr,Acceptance Tests,Unit Tests'

    execution_wrapper = mock()
    execution_wrapper.expects(:initialise_contexts).with(['Blinkr','Acceptance Tests','Unit Tests'])

    initialise_github_statuses(execution_wrapper, statuses)

  end

  def test_initialise_github_statuses_empty_variable

    execution_wrapper = mock()
    execution_wrapper.expects(:initialise_contexts).never

    initialise_github_statuses(execution_wrapper, '')
  end

  def test_initialise_github_statuses_nil_variable

    execution_wrapper = mock()
    execution_wrapper.expects(:initialise_contexts).never

    initialise_github_statuses(execution_wrapper, nil)
  end


  def test_execute_command
    command = %w(rake git_setup clean gen[drupal_pull_request])
    execution_wrapper = mock()
    execution_wrapper.expects(:execute_command_and_update_status!).with('rake git_setup clean gen[drupal_pull_request]')

    execute_command(execution_wrapper, command)
  end

  def test_initialise_contexts

    contexts = ['Unit Tests']

    Octokit.expects(:create_status).with do | github_repo, git_sha1, status, options |
      assert_equal(@git_repo, github_repo)
      assert_equal(@git_sha1, git_sha1)
      assert_equal('pending', status)
      assert_equal(@target_url, options[:target_url])
      assert_equal('Unit Tests', options[:context])
      assert_equal('Unit Tests is pending...', options[:description])
    end

    @execution_wrapper.initialise_contexts(contexts)

  end

  def test_execute_command_that_succeeds

    command = 'rake git_setup clean gen[drupal_pull_request]'
    Kernel.expects(:system).with(command).returns(true)

    Octokit.expects(:create_status).with do | github_repo, git_sha1, status, options |
      assert_equal(@git_repo, github_repo)
      assert_equal(@git_sha1, git_sha1)
      assert_equal('success', status)
      assert_equal(@target_url, options[:target_url])
      assert_equal('Unit Tests', options[:context])
      assert_equal('Unit Tests completed successfully.', options[:description])
    end

    @execution_wrapper.execute_command_and_update_status!(command)

  end

  def test_execute_command_that_fails
    command = 'rake git_setup clean gen[drupal_pull_request]'
    Kernel.expects(:system).with(command).returns(false)

    Octokit.expects(:create_status).with do | github_repo, git_sha1, status, options |
      assert_equal(@git_repo, github_repo)
      assert_equal(@git_sha1, git_sha1)
      assert_equal('failure', status)
      assert_equal(@target_url, options[:target_url])
      assert_equal('Unit Tests', options[:context])
      assert_equal('Unit Tests failed.', options[:description])
    end

    assert_raises(StandardError){
      @execution_wrapper.execute_command_and_update_status!(command)
    }
  end

end