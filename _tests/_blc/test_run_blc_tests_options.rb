require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../_blc/lib/options/blc_tests_options'

class TestBlcRunOptions < MiniTest::Test

  def setup
    @blc_dir = "#{File.dirname(__FILE__)}/../../_cucumber"
    @run_tests_options = RunBlcOptions.new(@blc_dir)
    clear_env_variables
  end

  def teardown
    clear_env_variables
  end

  def clear_env_variables
    ENV['github_status_sha1'] = nil
    ENV['github_status_context'] = nil
    ENV['exclude_external'] = nil
    ENV['exclude_internal'] = nil
    ENV['HOST_TO_TEST'] = nil
  end

  def test_default_execution_specifying_host
    test_configuration = @run_tests_options.parse_command_line(%w(--host-to-test=http://foo.com))
    assert_equal('NODE_TLS_REJECT_UNAUTHORIZED=0 blc http://foo.com --recursive --ordered | tee blc_results.txt', test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal(nil, ENV['exclude_external'])
    assert_equal(nil, ENV['exclude_internal'])
  end

  def test_default_execution_excluding_external_links
    test_configuration = @run_tests_options.parse_command_line(%w(--host-to-test=http://foo.com --exclude-external))
    assert_equal('NODE_TLS_REJECT_UNAUTHORIZED=0 blc http://foo.com --exclude-external --recursive --ordered | tee blc_results.txt', test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal('--exclude-external', ENV['exclude_external'])
    assert_equal(nil, ENV['exclude_internal'])
  end

  def test_default_execution_excluding_internal_links
    test_configuration = @run_tests_options.parse_command_line(%w(--host-to-test=http://foo.com --exclude-internal))
    assert_equal('NODE_TLS_REJECT_UNAUTHORIZED=0 blc http://foo.com --exclude-internal --recursive --ordered | tee blc_results.txt', test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal(nil, ENV['exclude_external'])
    assert_equal('--exclude-internal', ENV['exclude_internal'])
  end

end
