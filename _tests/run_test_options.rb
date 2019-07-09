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
        test_configuration[:e2e] = opt
      end

      opts.on('--profile PROFILE', String, 'Used to determine e2e test profile (mobile or desktop)') do |profile|
        test_configuration[:profile] = profile
      end

      opts.on('--base-url RHD_BASE_URL', String, 'Run the tests against the specified host e.g http://developers.stage.redhat.com') do |host|
        test_configuration[:base_url] = host
      end

      opts.on('--browser BROWSER', String, 'The driver to use when running the tests. [default=chrome]') do |browser|
        test_configuration[:browser] = browser
      end

      opts.on('--tags MOCHA_TAGS', String, 'The mocha tags to run or exclude in test run') do |tags|
        test_configuration[:tags] = tags
      end

      opts.on('--update-github-status SHA1', String, 'The SHA to report test results for on GitHub') do |sha1|
        test_configuration[:github_sha1] = sha1
      end

      # to be removed
      opts.on('--use-docker', 'Run the specified test type using Docker') do
        test_configuration[:docker] = true
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
    bind_e2e_environment_variables(test_configuration) if test_configuration[:e2e]
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
  # Binds e2e specific env variable to the specified value
  #
  def bind_e2e_environment_variables(test_configuration)
    bind_environment_variable('RHD_JS_DRIVER', test_configuration[:browser])
    bind_environment_variable('RHD_BASE_URL', test_configuration[:base_url])
    bind_environment_variable('RHD_TEST_PROFILE', test_configuration[:profile])
    bind_environment_variable('RHD_TEST_TAGS', test_configuration[:tags])
  end

end
