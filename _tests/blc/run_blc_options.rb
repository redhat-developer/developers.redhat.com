require 'optparse'
require 'json'
require_relative '../../_docker/lib/default_logger'

#
# Class implementation that parses the options supplied to the
# run_checks.rb script.
#
#
class RunBlcOptions

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

      opts.on('--blinkr', 'Execute broken link checks') do |opt|
        test_configuration[:blinkr] = opt
      end

      opts.on('--dcp', 'Execute dcp broken link checks') do |opt|
        test_configuration[:dcp] = opt
      end

      opts.on('--base-url RHD_BASE_URL', String, 'Run the tests against the specified host e.g http://developers.stage.redhat.com') do |host|
        test_configuration[:base_url] = host
      end

      opts.on('-c CONFIG_FILE', 'specify the config.yaml file for broken link checks') do |opt|
        test_configuration[:config] = opt
      end

      opts.on('--ignore-internal', "Ignore internal URL's") do |opt|
        test_configuration[:ignore_internal] = opt
      end

      opts.on('--ignore-external', "Ignore external URL's") do |opt|
        test_configuration[:ignore_external] = opt
      end

      opts.on('--update-github-status SHA1', String, 'The SHA to report test results for on GitHub') do |sha1|
        test_configuration[:github_sha1] = sha1
      end

      #
      # Options supporting the execution of the tests within Docker
      #
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
    bind_github_status_environment_variables(test_configuration)
    build_test_execution_command(test_configuration)
    test_configuration
  end

  private

  #
  # Create a generic environment variable for specified test type. Will be used
  # within the run_checks.rb script in order to generate the correct test resources
  # and run commands based on the test type.
  #
  def bind_test_type_environment_variable(test_configuration)
    test_configuration[:blinkr] ?
        bind_environment_variable('rhd_test', 'blinkr') :
        bind_environment_variable('rhd_test', 'dcp')
  end

  #
  # Builds the command that will be used to execute the specified tests
  #
  def build_test_execution_command(test_configuration)
    test_configuration[:blinkr] ?
        test_configuration[:run_tests_command] = build_blc_test_execution_cmd(test_configuration) :
        test_configuration[:run_tests_command] = build_dcp_test_execution_cmd(test_configuration)
  end


  #
  # Should we wish to update GitHub statuses, this will set the required environment variables
  #
  def bind_github_status_environment_variables(test_configuration)
    return unless test_configuration[:github_sha1]
    @logger.info("Enabling update of GitHub status for SHA1: '#{test_configuration[:github_sha1]}'")
    bind_environment_variable('github_status_enabled', 'true')
    bind_environment_variable('github_status_context', 'broken-link-checks') if test_configuration[:blinkr]
  end

  #
  # Binds the given env variable to the specified value
  #
  def bind_environment_variable(env_variable_name, value)
    return if value.nil? || value.empty?
    ENV[env_variable_name] = value
  end

  #
  # Builds broken link checking test command based on given parameters
  #
  def build_blc_test_execution_cmd(test_configuration)
    run_tests_command = ''
    run_tests_command += " -c #{test_configuration[:config]}" if test_configuration[:config]
    run_tests_command += " -u #{test_configuration[:base_url]}" if test_configuration[:base_url]
    run_tests_command += " -s #{test_configuration[:single_url]}" if test_configuration[:single_url]
    run_tests_command += ' --ignore-internal' if test_configuration[:ignore_internal]
    run_tests_command += ' --ignore-external' if test_configuration[:ignore_external]
    run_tests_command += ' --ignore-ssl' if test_configuration[:ignore_ssl]
    run_tests_command += ' -v' if test_configuration[:verbose]
    test_configuration[:run_tests_command] = "bundle exec blinkr#{run_tests_command}"
  end

  #
  # Builds the command to use to execute the dcp-broken-link checks
  #
  def build_dcp_test_execution_cmd(test_configuration)
    run_tests_command = ''
    run_tests_command += " --config #{test_configuration[:config]}" if test_configuration[:config]
    run_tests_command += " --base-url=#{test_configuration[:base_url]}" if test_configuration[:base_url]
    test_configuration[:run_tests_command] = "bundle exec dcp-checker#{run_tests_command}"
  end
end
