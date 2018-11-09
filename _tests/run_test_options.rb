require 'optparse'
require 'json'
require_relative '../_docker/lib/default_logger'

#
# Class implementation that parses the options supplied to the
# run-test.rb script.
#
#
class RunTestOptions

  def initialize(test_dir)
    @test_dir = test_dir
    @logger = DefaultLogger.logger
  end

  #
  # Parses the command line supplied to the run-test.rb wrapper script.
  #
  def parse_command_line(args)
    test_configuration = {}

    option_parser = OptionParser.new do |opts|
      opts.banner = 'Usage: run-tests.rb [options]'
      opts.separator 'Specific options:'

      opts.on('--unit', 'Execute frontend unit-tests') do |opt|
        test_configuration[:unit] = opt
      end

      opts.on('--e2e', 'Execute frontend end-to-end tests') do |opt|
        test_configuration = create_default_test_configuration
        test_configuration[:e2e] = opt
      end

      opts.on('--base-url RHD_BASE_URL', String, 'Run the tests against the specified host e.g http://developers.stage.redhat.com') do |host|
        test_configuration[:base_url] = host
      end

      opts.on('--verbose', 'Verbose output for debugging') do |opt|
        bind_environment_variable('RHD_VERBOSE_OUTPUT', 'true')
        test_configuration[:verbose] = opt
      end

      opts.on('--browser BROWSER', String, 'The driver to use when running the tests. [default=chrome]') do |browser|
        test_configuration[:browser] = browser
      end

      opts.on('--use-browserstack', 'Run the specified test type using Docker') do
        test_configuration[:browserstack] = true
      end

      opts.on('--mocha-tags MOCHA_TAGS', String, 'The mocha tags to run or exclude in test run') do |mocha_tags|
        test_configuration[:mocha_tags] = mocha_tags
      end

      #
      # Options supporting the execution of the tests within Docker
      #
      opts.on('--use-docker', 'Run the specified test type using Docker') do
        test_configuration[:docker] = true
      end

      opts.on('--update-github-status SHA1', String, 'The SHA to report test results for on GitHub') do |sha1|
        test_configuration[:github_sha1] = sha1
      end

      opts.on('--profile PROFILE', String, 'Used to determine the git status context for e2e tests') do |profile|
        test_configuration[:profile] = profile
      end

      opts.on_tail('-h', '--help', 'Show this message') do
        puts opts
        Kernel.exit(1)
      end
    end

    begin
      option_parser.parse!(args)
    rescue OptionParser::InvalidOption => e
      puts e
      option_parser.parse(%w(-h))
    end
    bind_test_type_environment_variable(test_configuration)
    bind_github_status_environment_variables(test_configuration[:github_sha1], ENV['rhd_test'].to_s, test_configuration[:profile])
    bind_browser_environment_variables(test_configuration[:browser]) if test_configuration[:e2e]
    build_test_execution_command(test_configuration)
    test_configuration
  end


  private

  #
  # Create a generic environment variable for specified test type. Will be used
  # within the run_tests.rb script in order to generate the correct test resources
  # and run commands based on the test type.
  #
  def bind_test_type_environment_variable(test_configuration)
    test_configuration[:unit] ? bind_environment_variable('rhd_test', 'unit') : bind_environment_variable('rhd_test', 'e2e')
  end

  #
  # Builds the command that will be used to execute the specified tests
  #
  def build_test_execution_command(test_configuration)
    test_configuration[:unit] ? build_unit_test_execution_cmd(test_configuration) : build_e2e_test_execution_cmd(test_configuration)
  end

  #
  # Should we wish to update GitHub statuses, this will set the required environment variables
  #
  def bind_github_status_environment_variables(github_sha_1, test_type, profile)
    return unless github_sha_1
    @logger.info("Enabling update of GitHub status for SHA1: '#{github_sha_1}'")
    bind_environment_variable('github_status_enabled', 'true')
    bind_environment_variable('github_status_sha1', github_sha_1)
    bind_environment_variable('github_status_context', 'js-unit-tests') if test_type == 'unit'
    if test_type == 'e2e'
      bind_environment_variable('github_status_context', 'js-e2e-tests') if profile == 'desktop'
      bind_environment_variable('github_status_context', 'js-mobile-e2e-tests') if profile == 'mobile'
      bind_environment_variable('github_status_context', 'js-drupal-e2e-tests') if profile == 'drupal'
    end
  end

  #
  # Binds the given env variable to the specified value
  #
  def bind_environment_variable(env_variable_name, value)
    return if value.nil? || value.empty?
    ENV[env_variable_name] = value
  end

  #
  # Builds unit-test command for local and inside docker testing
  #
  def build_unit_test_execution_cmd(test_configuration)
    test_configuration[:run_tests_command] = 'npm test'
  end

  #
  # Builds e2e test command for local, browserstack, and inside docker testing
  #
  def build_e2e_test_execution_cmd(test_configuration)
    run_tests_command = ''
    # bind environment variable for base url to be used in e2e base config.
    Kernel.abort('Please specify a base url. For example --base-url=http://foo.com') if test_configuration[:base_url].nil?
    bind_environment_variable('RHD_BASE_URL', test_configuration[:base_url])
    bind_environment_variable('RHD_TEST_CONFIG', 'docker') if test_configuration[:docker]
    bind_environment_variable('RHD_TEST_CONFIG', 'browserstack') if test_configuration[:browserstack]
    bind_environment_variable('RHD_TEST_PROFILE', test_configuration[:profile]) if test_configuration[:profile]
    bind_environment_variable('RHD_MOCHA_TAGS', test_configuration[:mocha_tags]) if test_configuration[:mocha_tags]

    run_tests_command += " --baseUrl=#{test_configuration[:base_url]}"
    run_tests_command += " --#{test_configuration[:mocha_tags]}" if test_configuration[:mocha_tags]
    if test_configuration[:docker]
      if test_configuration[:browserstack]
        test_configuration[:run_tests_command] = "npm run e2e:browserstack -- #{run_tests_command}"
      else
        test_configuration[:run_tests_command] = "npm run e2e:ci -- #{run_tests_command}"
      end
    else
      # run tests via a local browser
      test_configuration[:run_tests_command] = "cd #{@test_dir}/e2e && npm run e2e -- #{run_tests_command}"
    end
  end


  #
  # Checks that the user has supplied us with a valid supported browser
  #
  def bind_browser_environment_variables(browser)
    bind_environment_variable('RHD_JS_DRIVER', browser)
  end

  #
  # Creates a default e2e test configuration
  #
  def create_default_test_configuration
    default_configuration = {}
    default_configuration[:browser] = 'chrome'
    default_configuration[:docker] = false
    default_configuration[:browserstack] = false
    default_configuration[:profile] = 'desktop'
    default_configuration
  end
end
