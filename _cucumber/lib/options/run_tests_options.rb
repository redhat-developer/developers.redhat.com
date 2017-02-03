require 'optparse'
require 'json'
require_relative '../../../_docker/lib/default_logger'

#
# Class implementation that parses the options supplied to the run-tests.rb script
#
# @author rblake@redhat.com
#
class RunTestsOptions

  def initialize(cucumber_dir)
    @cucumber_dir = cucumber_dir
    @supported_drivers = %w(chrome firefox)
    @supported_profiles = %w(desktop mobile kc_dm)
    @logger = DefaultLogger.logger
  end

  #
  # Parses the command line supplied to the run-test.rb wrapper script.
  #
  def parse_command_line(args)
    test_configuration = create_default_test_configuration

    option_parser = OptionParser.new do |opts|
      opts.banner = 'Usage: run-tests.rb [options]'
      opts.separator 'Specific options:'

      opts.on('--host-to-test HOST_TO_TEST', String, 'Run the tests against the specified host e.g http://developers.stage.redhat.com') do |host|
        test_configuration[:host_to_test] = host
      end

      opts.on('--profile PROFILE', String, 'The Cucumber profile to use when running the tests [default=desktop]') do |profile|
        test_configuration[:profile] = profile
      end

      opts.on('--cucumber-tags CUCUMBER_TAGS', String, 'The cucumber tags to use') do |cucumber_tags|
        test_configuration[:cucumber_tags] = cucumber_tags
      end

      opts.on('--driver DRIVER', String, 'The driver to use when running the tests. [default=chrome]') do |driver|
        check_supported_driver(driver)
        test_configuration[:driver] = driver
      end

      #
      # Options supporting the execution of the tests within Docker
      #
      opts.on('--use-docker', 'Run the acceptance tests using Docker') do
        test_configuration[:docker] = true
      end

      opts.on('--browser-count BROWSER_COUNT', String, 'The number of browsers to launch when running the tests with Docker [default=2]') do |browser_count|
        test_configuration[:browser_count] = browser_count.to_i
      end

      opts.on('--update-github-status SHA1', String, 'The SHA to report test results for on GitHub') do |sha1|
        test_configuration[:github_sha1] = sha1
      end

      opts.on_tail('-h', '--help', 'Show this message') do
        puts opts
        Kernel.exit(1)
      end
    end

    begin
      option_parser.parse!(args)
    rescue OptionParser::InvalidOption => e
      puts "#{e}"
      option_parser.parse(%w(-h))
    end

    #
    # Bind the environment variables required by the tests from the user supplied configuration
    #
    bind_environment_variable('HOST_TO_TEST', test_configuration[:host_to_test])
    bind_environment_variable('CUCUMBER_TAGS', test_configuration[:cucumber_tags])

    bind_profile_environment_variables(test_configuration[:profile])
    bind_driver_environment_variables(test_configuration[:docker], test_configuration[:driver], test_configuration)
    bind_github_status_environment_variables(test_configuration[:docker], test_configuration[:github_sha1], test_configuration[:profile])

    build_test_execution_command(test_configuration)
    test_configuration
  end

  private

  #
  # Builds the command that will be used to execute the tests.
  #
  def build_test_execution_command(test_configuration)
    run_tests_command = 'bundle exec rake -f cucumber.rake features'

    if ENV['HOST_TO_TEST']
      run_tests_command += " HOST_TO_TEST=#{ENV['HOST_TO_TEST']}"
    end

    if ENV['RHD_JS_DRIVER']
      run_tests_command += " RHD_JS_DRIVER=#{ENV['RHD_JS_DRIVER']}"
    end

    if ENV['RHD_TEST_PROFILE']
      run_tests_command += " RHD_TEST_PROFILE=#{ENV['RHD_TEST_PROFILE']}"
    end

    test_configuration[:run_tests_command] = run_tests_command
  end

  #
  # Should we wish to update GitHub statuses when running in Docker, this will set the required environment variables.
  #
  def bind_github_status_environment_variables(use_docker, github_sha_1, test_profile)
    return unless use_docker && github_sha_1

    @logger.info("Enabling update of GitHub status for SHA1: '#{github_sha_1}'")

    bind_environment_variable('github_status_enabled', 'true')
    bind_environment_variable('github_status_sha1', github_sha_1)
    github_status_context = nil

    case test_profile
      when 'desktop'
        github_status_context = 'Drupal:FE Acceptance Tests'
      when 'mobile'
        github_status_context = 'Drupal:Mobile FE Acceptance Tests'
      when 'kc_dm'
        github_status_context = 'Drupal:FE KC/DM Acceptance Tests'
    end

    bind_environment_variable('github_status_context', github_status_context)
  end

  #
  # Binds the profile environment variable, firstly checking that the user has supplied a valid profile
  #
  def bind_profile_environment_variables(profile)
    Kernel.abort("'#{profile}' is not a recognised Cucumber profile, see '#{@cucumber_dir}/cucumber.yml' file for valid profiles.") unless @supported_profiles.include?(profile)
    bind_environment_variable('RHD_TEST_PROFILE', profile)
  end

  #
  # Binds the environment variables required to correctly influence the driver used by Cucumber.
  # If we are trying to run in Docker, we also set the RHD_DOCKER_DRIVER env variable.
  #
  def bind_driver_environment_variables(run_in_docker, driver, test_configuration)
    if run_in_docker
      #
      # We set the docker driver to either docker_chrome or docker_firefox. docker_chrome is the default
      # when we are looking to emulate other drivers e.g. iphone_6
      #
      docker_driver = @supported_drivers.include?(driver) ? "docker_#{driver}" : 'docker_chrome'
      driver = @supported_drivers.include?(driver) ? "docker_#{driver}" : driver
      bind_environment_variable('RHD_DOCKER_DRIVER', docker_driver)
      test_configuration[:docker_node] = docker_driver
    end

    bind_environment_variable('RHD_JS_DRIVER', driver)
  end

  #
  # Checks that the user has supplied us with a valid driver name
  #
  def check_supported_driver(driver)
    return if @supported_drivers.include?(driver)
    # Check that the device being used for emulation is supported by chrome
    driver_config_file = "#{@cucumber_dir}/driver/device_config/chromium_devices.json"
    json = File.read(driver_config_file)
    config = JSON.parse(json)
    Kernel.abort("Invalid device specified! Device '#{driver}' was not found \n see available test devices here: '#{driver_config_file}'") unless config.include?(driver)
  end

  #
  # Binds the given env variable to the specified value
  #
  def bind_environment_variable(env_variable_name, value)
    return if value.nil? || value.empty?
    ENV[env_variable_name] = value
  end

  #
  # Creates the default test configuration
  #
  def create_default_test_configuration
    default_configuration = {}
    default_configuration[:profile] = 'desktop'
    default_configuration[:driver] = 'chrome'
    default_configuration[:browser_count] = 2
    default_configuration[:docker] = false
    default_configuration
  end
end
