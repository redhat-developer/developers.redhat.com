require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../../_tests/blc/run_blc_options'

class TestRunBlcOptions < MiniTest::Test

  def setup
    @test_dir = '_tests/blc'
    @run_tests_options = RunBlcOptions.new(@test_dir)
    clear_env_variables
  end

  def teardown
    clear_env_variables
  end

  def clear_env_variables
    ENV['github_status_sha1'] = nil
    ENV['github_status_context'] = nil
  end

  def test_default_execution_specifying_host
    test_configuration = @run_tests_options.parse_command_line(%w(--blinkr -c blinkr.yaml --base-url http://foo.com))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_excluding_external_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blinkr -c blinkr.yaml --base-url http://foo.com --ignore-external))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-external',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_excluding_internal_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blinkr -c blinkr.yaml --base-url http://foo.com --ignore-internal))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-internal',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_specifying_host
    test_configuration = @run_tests_options.parse_command_line(%w(--blinkr --use-docker -c blinkr.yaml --base-url http://foo.com))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_excluding_external_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blinkr --use-docker -c blinkr.yaml --base-url http://foo.com --ignore-external))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-external',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_excluding_internal_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blinkr --use-docker -c blinkr.yaml --base-url http://foo.com --ignore-internal))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-internal',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

end
