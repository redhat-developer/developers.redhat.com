require 'optparse'
require 'json'
require_relative '../../_docker/lib/default_logger'

#
# Class implementation that parses the options supplied to the run-tests.rb script
#
# @author ihamilto@redhat.com
#
class RunBlinkrOptions

  def initialize(blinkr_dir)
    @blinkr_dir = blinkr_dir
    @logger = DefaultLogger.logger
  end

  #
  # Parses the command line supplied to the run-test.rb wrapper script.
  #
  def parse_command_line(args)
    test_configuration = {}

    option_parser = OptionParser.new do |opts|
      opts.banner = 'Usage: run_blinkr.rb [options]'
      opts.separator 'Specific options:'

      opts.on('-c BLINKR_CONFIG_FILE', 'specify the config.yaml file') do |opt|
        test_configuration[:config] = opt
      end

      opts.on('-u  HOST_TO_TEST', 'specify the URL of the site root') do |opt|
        test_configuration[:base_url] = opt
      end

      opts.on('-v', 'output debugging info to the console') do |opt|
        test_configuration[:verbose] = opt
      end

      opts.on('-w', 'additionally, output libcurl debugging info to the console, normally used with -s') do |opt|
        test_configuration[:vverbose] = opt
      end

      opts.on('-s SINGLE_URL', 'test a single URL, outputting the response to the console') do |opt|
        test_configuration[:single_url] = opt
        test_configuration[:base_url] = opt
      end

      opts.on('--ignore-internal', "Ignore internal URL's") do |opt|
        test_configuration[:ignore_internal] = opt
      end

      opts.on('--ignore-external', "Ignore external URL's") do |opt|
        test_configuration[:ignore_external] = opt
      end

      opts.on('--ignore-ssl', 'Disable SSL certificate checking for staging environments') do |opt|
        test_configuration[:ignore_ssl] = opt
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
      puts e
      option_parser.parse(%w(-h))
    end

    bind_github_status_environment_variables(test_configuration[:github_sha1])
    build_test_execution_command(test_configuration)
    test_configuration
  end

  private

  #
  # Builds the command that will be used to execute the tests.
  #
  def build_test_execution_command(test_configuration)
    run_tests_command = ''

    run_tests_command += " -c #{test_configuration[:config]}" if test_configuration[:config]

    run_tests_command += " -u #{test_configuration[:base_url]}" if test_configuration[:base_url]

    run_tests_command += " -s #{test_configuration[:single_url]}" if test_configuration[:single_url]

    run_tests_command += ' --ignore-internal' if test_configuration[:ignore_internal]

    run_tests_command += ' --ignore-external' if test_configuration[:ignore_external]

    run_tests_command += ' -v' if test_configuration[:verbose]

    run_tests_command += ' -w' if test_configuration[:vverbose]

    run_tests_command += ' --ignore-ssl' if test_configuration[:ignore_ssl]

    test_configuration[:run_tests_command] = "jruby -S bundle exec blinkr#{run_tests_command}"
  end

  #
  # Should we wish to update GitHub statuses, this will set the required environment variables.
  #
  def bind_github_status_environment_variables(github_sha_1)
    return unless github_sha_1
    @logger.info("Enabling update of GitHub status for SHA1: '#{github_sha_1}'")
    bind_environment_variable('github_status_enabled', 'true')
    bind_environment_variable('github_status_sha1', github_sha_1)
    bind_environment_variable('github_status_context', 'Drupal:Blinkr Checks')
  end

  #
  # Binds the given env variable to the specified value
  #
  def bind_environment_variable(env_variable_name, value)
    return if value.nil? || value.empty?
    ENV[env_variable_name] = value
  end

end
