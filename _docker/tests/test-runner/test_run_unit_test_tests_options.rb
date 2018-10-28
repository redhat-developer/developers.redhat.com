require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../../_docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend/run_unit_test_options'

class TestRunUnitTestOptions < MiniTest::Test

  def setup
    @test_dir = "#{File.dirname(__FILE__)}/../../../_docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend"
    @run_tests_options = RunUnitTestOptions.new(@test_dir)
    clear_env_variables
  end

  def teardown
    clear_env_variables
  end

  def clear_env_variables
    ENV['github_status_sha1'] = nil
    ENV['github_status_context'] = nil
    ENV['rhd_test'] = 'unit'
  end

  def test_non_docker_unit_test_executions
    test_configuration = @run_tests_options.parse_command_line(%w(--unit))
    refute(test_configuration[:docker])
    assert_equal('npm test', test_configuration[:run_tests_command])
  end

  def test_default_execution_using_docker

    test_configuration = @run_tests_options.parse_command_line(%w(--unit --use-docker))

    assert(test_configuration[:docker])
    assert_equal('npm test', test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_execution_specifying_update_github_status

    test_configuration = @run_tests_options.parse_command_line(%w(--unit --use-docker --update-github-status=123))

    assert(test_configuration[:docker])
    assert_equal('npm test', test_configuration[:run_tests_command])
    assert_equal('123', ENV['github_status_sha1'])
    assert_equal('js-unit-tests', ENV['github_status_context'])
    assert_equal('true', ENV['github_status_enabled'])
  end

end
