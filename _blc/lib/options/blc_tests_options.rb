require 'optparse'
require 'json'
require_relative '../../../_docker/lib/default_logger'

#
# Class implementation that parses the options supplied to the run-tests.rb script
#
# @authors rblake@redhat.com & ihamilto@redhat.com
#
class RunBlcOptions

  def initialize(blc_dir)
    @blc_dir = blc_dir
    @logger = DefaultLogger.logger
  end

  #
  # Parses the command line supplied to the run-test.rb wrapper script.
  #
  def parse_command_line(args)
    test_configuration = {}

    option_parser = OptionParser.new do |opts|
      opts.banner = 'Usage: run_blc.rb [options]'
      opts.separator 'Specific options:'

      opts.on('--host-to-test HOST_TO_TEST', String, 'Run the broken link checks against the specified host e.g http://developers.stage.redhat.com') do |host|
        test_configuration[:host_to_test] = host
      end

      opts.on('--update-github-status SHA1', String, 'The SHA to report test results for on GitHub') do |sha1|
        test_configuration[:github_sha1] = sha1
      end

      opts.on('--exclude-external', 'Run broken link check excluding external links') do
        test_configuration[:exclude_external] = true
      end

      opts.on('--exclude-internal', 'Run broken link check excluding internal links') do
        test_configuration[:exclude_internal] = true
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
    bind_github_status_environment_variables(test_configuration[:github_sha1])
    bind_blc_environment_variables(test_configuration)

    build_test_execution_command(test_configuration)
    test_configuration
  end

  private

  #
  # Builds the command that will be used to execute the checks.
  #
  def build_test_execution_command(test_configuration)
    run_tests_command = 'NODE_TLS_REJECT_UNAUTHORIZED=0 blc'

    if ENV['HOST_TO_TEST']
      run_tests_command += " #{ENV['HOST_TO_TEST']}"
    end

    if ENV['exclude_external']
      run_tests_command += ' --exclude-external'
    end

    if ENV['exclude_internal']
      run_tests_command += ' --exclude-internal'
    end

    run_tests_command += ' --recursive --ordered | tee blc_results.txt'

    test_configuration[:run_tests_command] = run_tests_command

  end

  #
  # Should we wish to update GitHub statuses when running in Docker, this will set the required environment variables.
  #
  def bind_github_status_environment_variables(github_sha_1)
    return unless github_sha_1

    @logger.info("Enabling update of GitHub status for SHA1: '#{github_sha_1}'")

    bind_environment_variable('github_status_enabled', 'true')
    bind_environment_variable('github_status_sha1', github_sha_1)
    github_status_context = nil

    bind_environment_variable('github_status_context', github_status_context)
  end

  def bind_blc_environment_variables(test_configuration)
    if test_configuration[:exclude_external]
      @logger.info('External links are excluded')
      bind_environment_variable('exclude_external', '--exclude-external')
    end
    if test_configuration[:exclude_internal]
      @logger.info('Internal links are excluded')
      bind_environment_variable('exclude_internal', '--exclude-internal')
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
  # Creates the default test configuration
  #
  def create_default_test_configuration
    default_configuration = {}
    default_configuration[:exclude_external] = false
    default_configuration[:exclude_internal] = false
    default_configuration
  end

end
