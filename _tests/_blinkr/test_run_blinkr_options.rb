require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../_blinkr/lib/run_blinkr_options'

class TestBlinkrRunOptions < MiniTest::Test

  def setup
    @blinkr_dir = "#{File.dirname(__FILE__)}/../../_blinkr"
    @run_tests_options = RunBlinkrOptions.new(@blinkr_dir)
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
    test_configuration = @run_tests_options.parse_command_line(%w(-c blinkr.yaml -u http://foo.com))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_specifying_single_url
    test_configuration = @run_tests_options.parse_command_line(%w(-c blinkr.yaml -s http://foo.com/somepage))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com/somepage -s http://foo.com/somepage',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_excluding_external_links
    test_configuration = @run_tests_options.parse_command_line(%w(-c blinkr.yaml -u http://foo.com --ignore-external))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-external',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_excluding_internal_links
    test_configuration = @run_tests_options.parse_command_line(%w(-c blinkr.yaml -u http://foo.com --ignore-internal))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-internal',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_with_verbose_output
    test_configuration = @run_tests_options.parse_command_line(%w(-c blinkr.yaml -u http://foo.com -v))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com -v',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_with_very_verbose_output
    test_configuration = @run_tests_options.parse_command_line(%w(-c blinkr.yaml -u http://foo.com -w))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com -w',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_with_ignore_ssl
    test_configuration = @run_tests_options.parse_command_line(%w(-c blinkr.yaml -u http://foo.com --ignore-ss))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-ssl',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

end
