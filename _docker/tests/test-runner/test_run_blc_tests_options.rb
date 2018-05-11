require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../../_tests/lib/run_test_options'

class TestRunTestOptions < MiniTest::Test

  def setup
    @test_dir = '_tests'
    @run_tests_options = RunTestOptions.new(@test_dir)
    clear_env_variables
  end

  def teardown
    clear_env_variables
  end

  def clear_env_variables
    ENV['github_status_sha1'] = nil
    ENV['github_status_context'] = nil
  end

  def test_docker_execution_specifying_update_github_status
    test_configuration = @run_tests_options.parse_command_line(%w(--blc -c blinkr.yaml --base-url http://foo.com --use-docker --update-github-status=123))
    assert(test_configuration[:docker])
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com',
                 test_configuration[:run_tests_command])
    assert_equal('123', ENV['github_status_sha1'])
    assert_equal('broken-link-checks', ENV['github_status_context'])
    assert_equal('true', ENV['github_status_enabled'])
  end


  def test_default_execution_specifying_host
    test_configuration = @run_tests_options.parse_command_line(%w(--blc -c blinkr.yaml --base-url http://foo.com))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_specifying_single_url
    test_configuration = @run_tests_options.parse_command_line(%w(--blc -c blinkr.yaml -s http://foo.com/somepage))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com/somepage -s http://foo.com/somepage',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_excluding_external_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blc -c blinkr.yaml --base-url http://foo.com --ignore-external))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-external',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_excluding_internal_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blc -c blinkr.yaml --base-url http://foo.com --ignore-internal))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-internal',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_with_verbose_output
    test_configuration = @run_tests_options.parse_command_line(%w(--blc -c blinkr.yaml --base-url http://foo.com --verbose))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com -v',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_default_execution_with_ignore_ssl
    test_configuration = @run_tests_options.parse_command_line(%w(--blc -c blinkr.yaml --base-url http://foo.com --ignore-ssl))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-ssl',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_specifying_host
    test_configuration = @run_tests_options.parse_command_line(%w(--blc --use-docker -c blinkr.yaml --base-url http://foo.com))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_specifying_single_url
    test_configuration = @run_tests_options.parse_command_line(%w(--blc --use-docker -c blinkr.yaml -s http://foo.com/somepage))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com/somepage -s http://foo.com/somepage',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_excluding_external_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blc --use-docker -c blinkr.yaml --base-url http://foo.com --ignore-external))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-external',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_excluding_internal_links
    test_configuration = @run_tests_options.parse_command_line(%w(--blc --use-docker -c blinkr.yaml --base-url http://foo.com --ignore-internal))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-internal',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_with_verbose_output
    test_configuration = @run_tests_options.parse_command_line(%w(--blc --use-docker -c blinkr.yaml --base-url http://foo.com --verbose))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com -v',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

  def test_docker_default_execution_with_ignore_ssl
    test_configuration = @run_tests_options.parse_command_line(%w(--blc --use-docker -c blinkr.yaml --base-url http://foo.com --ignore-ssl))
    assert_equal('bundle exec blinkr -c blinkr.yaml -u http://foo.com --ignore-ssl',
                 test_configuration[:run_tests_command])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
  end

end
