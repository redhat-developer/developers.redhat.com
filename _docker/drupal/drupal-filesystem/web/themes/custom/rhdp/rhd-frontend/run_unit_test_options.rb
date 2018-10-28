require 'optparse'
require 'json'
require_relative '../../../../../../../../_docker/lib/default_logger'

#
# Class implementation that parses the options supplied to the
# run-test.rb script.
#
#
class RunUnitTestOptions

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
      
      opts.on('--use-docker', 'Run the specified test type using Docker') do
        test_configuration[:docker] = true
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
    bind_environment_variable('rhd_test', 'unit')
    bind_github_status_env_vars(test_configuration[:github_sha1])
    build_unit_test_execution_cmd(test_configuration)
    test_configuration
  end


  private

  #
  # Should we wish to update GitHub statuses, this will set the required environment variables
  #
  def bind_github_status_env_vars(github_sha_1)
    return unless github_sha_1
    @logger.info("Enabling update of GitHub status for SHA1: '#{github_sha_1}'")
    bind_environment_variable('github_status_enabled', 'true')
    bind_environment_variable('github_status_sha1', github_sha_1)
    bind_environment_variable('github_status_context', 'js-unit-tests')
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
  
end
