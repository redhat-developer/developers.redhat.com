require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../_cucumber/lib/options/run_tests_options'

class TestRunTestsOptions < MiniTest::Test

  def setup
    @cucumber_dir = "#{File.dirname(__FILE__)}/../../_cucumber"
    @run_tests_options = RunTestsOptions.new(@cucumber_dir)
    clear_env_variables
  end

  def teardown
    clear_env_variables
  end

  def clear_env_variables
    ENV['CUCUMBER_TAGS'] = nil
    ENV['github_status_sha1'] = nil
    ENV['github_status_context'] = nil
    ENV['HOST_TO_TEST'] = nil
    ENV['RHD_JS_DRIVER'] = nil
    ENV['RHD_TEST_PROFILE'] = nil
    ENV['RHD_DOCKER_DRIVER'] = nil
    ENV['STUBBED_DATA'] = nil
  end

  def test_non_docker_execution_with_no_args

    test_configuration = @run_tests_options.parse_command_line(%w())

    refute(test_configuration[:docker])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
  end

  def test_non_docker_execution_specifying_profile

    test_configuration = @run_tests_options.parse_command_line(%w(--profile=kc_dm))

    refute(test_configuration[:docker])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=kc_dm STUBBED_DATA=true', test_configuration[:run_tests_command])
  end

  def test_non_docker_execution_specifying_driver

    test_configuration = @run_tests_options.parse_command_line(%w(--profile=kc_dm --driver=iphone_6))

    refute(test_configuration[:docker])
    assert_equal('iphone_6', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=iphone_6 RHD_TEST_PROFILE=kc_dm STUBBED_DATA=true', test_configuration[:run_tests_command])
  end

  def test_non_docker_execution_specifying_unknown_profile

    Kernel.expects(:abort).with("'foo' is not a recognised Cucumber profile, see '#{@cucumber_dir}/cucumber.yml' file for valid profiles.")

    test_configuration = @run_tests_options.parse_command_line(%w(--profile=foo))

    refute(test_configuration[:docker])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=foo STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal(nil, ENV['RHD_DOCKER_DRIVER'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_non_docker_execution_specifying_cucumber_tags

    test_configuration = @run_tests_options.parse_command_line(%w(--profile=kc_dm --cucumber-tags=foo))

    refute(test_configuration[:docker])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=kc_dm STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('foo', ENV['CUCUMBER_TAGS'])
    assert_equal(nil, ENV['RHD_DOCKER_DRIVER'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_non_docker_execution_specifying_update_github_status

    test_configuration = @run_tests_options.parse_command_line(%w(--profile=kc_dm --cucumber-tags=foo --update-github-status=123))

    refute(test_configuration[:docker])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=kc_dm STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('foo', ENV['CUCUMBER_TAGS'])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal(nil, ENV['RHD_DOCKER_DRIVER'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_non_docker_execution_specifying_host_to_test

    test_configuration = @run_tests_options.parse_command_line(%w(--profile=kc_dm --cucumber-tags=foo --host-to-test=http://foo.com))

    refute(test_configuration[:docker])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features HOST_TO_TEST=http://foo.com RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=kc_dm STUBBED_DATA=true', test_configuration[:run_tests_command])

    assert_equal('http://foo.com', ENV['HOST_TO_TEST'])
    assert_equal('chrome', ENV['RHD_JS_DRIVER'])
    assert_equal('kc_dm', ENV['RHD_TEST_PROFILE'])
    assert_equal('foo', ENV['CUCUMBER_TAGS'])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal(nil, ENV['RHD_DOCKER_DRIVER'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_non_docker_execution_specifying_unknown_driver

    Kernel.expects(:abort).with("Invalid device specified! Device 'foo' was not found \n see available test devices here: '#{@cucumber_dir}/driver/device_config/chromium_devices.json'")

    test_configuration = @run_tests_options.parse_command_line(%w(--driver=foo))

    refute(test_configuration[:docker])
    assert_equal('foo', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=foo RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
  end


  def test_default_execution_using_docker

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker))

    assert(test_configuration[:docker])
    assert_equal(2, test_configuration[:browser_count])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('chrome', ENV['RHD_JS_DRIVER'])
    assert_equal('docker_chrome', ENV['RHD_DOCKER_DRIVER'])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_docker_execution_specifying_number_of_browsers

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --browser-count=5))

    assert(test_configuration[:docker])
    assert_equal(5, test_configuration[:browser_count])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('chrome', ENV['RHD_JS_DRIVER'])
    assert_equal('docker_chrome', ENV['RHD_DOCKER_DRIVER'])
    assert_equal('docker_chrome', test_configuration[:docker_node])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal('desktop', ENV['RHD_TEST_PROFILE'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_docker_execution_specifying_unknown_driver

    Kernel.expects(:abort).with("Invalid device specified! Device 'foo' was not found \n see available test devices here: '#{@cucumber_dir}/driver/device_config/chromium_devices.json'")
    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --driver=foo))

    assert(test_configuration[:docker])
    assert_equal('foo', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=foo RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
  end

  def test_docker_execution_specifying_mobile_driver

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --driver=iphone_6))

    assert(test_configuration[:docker])
    assert_equal(2, test_configuration[:browser_count])
    assert_equal('iphone_6', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=iphone_6 RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('iphone_6', ENV['RHD_JS_DRIVER'])
    assert_equal('docker_chrome', ENV['RHD_DOCKER_DRIVER'])
    assert_equal('docker_chrome', test_configuration[:docker_node])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal('desktop', ENV['RHD_TEST_PROFILE'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_docker_execution_specifying_firefox_driver

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --driver=firefox))

    assert(test_configuration[:docker])
    assert_equal(2, test_configuration[:browser_count])
    assert_equal('firefox', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=firefox RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('firefox', ENV['RHD_JS_DRIVER'])
    assert_equal('docker_firefox', ENV['RHD_DOCKER_DRIVER'])
    assert_equal('docker_firefox', test_configuration[:docker_node])
    assert_equal(nil, ENV['github_status_sha1'])
    assert_equal(nil, ENV['github_status_context'])
    assert_equal('desktop', ENV['RHD_TEST_PROFILE'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_multiple_cucumber_tags_can_be_specified_on_command_line

    test_configuration = @run_tests_options.parse_command_line(%w(--cucumber-tags=@wip,@kc))
    assert_equal('@wip,@kc', ENV['CUCUMBER_TAGS'])
  end

  def test_docker_execution_update_github_status_with_no_explict_profile_set

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --update-github-status=123))
    assert(test_configuration[:docker])
    assert_equal(2, test_configuration[:browser_count])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=desktop STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('chrome', ENV['RHD_JS_DRIVER'])
    assert_equal('docker_chrome', ENV['RHD_DOCKER_DRIVER'])
    assert_equal('123', ENV['github_status_sha1'])
    assert_equal('Drupal:FE Acceptance Tests', ENV['github_status_context'])
    assert_equal('desktop', ENV['RHD_TEST_PROFILE'])
    assert_equal('true', ENV['github_status_enabled'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_docker_execution_update_github_status_with_mobile_profile

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --profile=mobile --update-github-status=123))

    assert(test_configuration[:docker])
    assert_equal(2, test_configuration[:browser_count])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=mobile STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('chrome', ENV['RHD_JS_DRIVER'])
    assert_equal('docker_chrome', ENV['RHD_DOCKER_DRIVER'])
    assert_equal('123', ENV['github_status_sha1'])
    assert_equal('Drupal:Mobile FE Acceptance Tests', ENV['github_status_context'])
    assert_equal('mobile', ENV['RHD_TEST_PROFILE'])
    assert_equal('true', ENV['github_status_enabled'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_docker_execution_update_github_status_with_kc_dm_profile

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --profile=kc_dm --update-github-status=123))

    assert(test_configuration[:docker])
    assert_equal(2, test_configuration[:browser_count])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=kc_dm STUBBED_DATA=true', test_configuration[:run_tests_command])
    assert_equal('chrome', ENV['RHD_JS_DRIVER'])
    assert_equal('docker_chrome', ENV['RHD_DOCKER_DRIVER'])
    assert_equal('123', ENV['github_status_sha1'])
    assert_equal('Drupal:FE KC/DM Acceptance Tests', ENV['github_status_context'])
    assert_equal('kc_dm', ENV['RHD_TEST_PROFILE'])
    assert_equal('true', ENV['github_status_enabled'])
    assert_equal('true', ENV['STUBBED_DATA'])
  end

  def test_docker_execution_specify_unknown_profile

    Kernel.expects(:abort).with("'foo' is not a recognised Cucumber profile, see '#{@cucumber_dir}/cucumber.yml' file for valid profiles.")

    test_configuration = @run_tests_options.parse_command_line(%w(--use-docker --profile=foo))

    assert(test_configuration[:docker])
    assert_equal('chrome', test_configuration[:driver])
    assert_equal('bundle exec rake -f cucumber.rake features RHD_JS_DRIVER=chrome RHD_TEST_PROFILE=foo STUBBED_DATA=true', test_configuration[:run_tests_command])
  end

end
