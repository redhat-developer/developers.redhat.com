require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../../_tests/run_test_options'

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
    ENV['rhd_test'] = 'e2e'
    ENV['HOST_TO_TEST'] = nil
    ENV['RHD_JS_DRIVER'] = nil
  end

  def test_docker_execution_specifying_update_github_status
    test_configuration = @run_tests_options.parse_command_line(%w(--e2e --base-url=http://foo.com --use-docker --update-github-status=123))
    assert(test_configuration[:docker])
    assert_equal('npm run e2e:ci --  --baseUrl=http://foo.com', test_configuration[:run_tests_command])
    assert_equal('123', ENV['github_status_sha1'])
    assert_equal('js-e2e-tests', ENV['github_status_context'])
    assert_equal('true', ENV['github_status_enabled'])
  end

end
