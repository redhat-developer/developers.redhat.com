require_relative '../_docker/lib/process_runner'
require_relative '../_docker/lib/default_logger'
require 'fileutils'

#
# This class wraps a number of calls to _docker/control.rb to allow us to run the broken link checks
# for developers.redhat.com site, and dcp content.
#
class BlcRunner

  def initialize(test_dir, control_script_directory, process_runner)
    @test_dir = test_dir
    @test_type = test_type
    @host_to_test = host_to_test
    @control_script_directory = control_script_directory
    @process_runner = process_runner
    @log = DefaultLogger.logger
  end

  #
  # Parses the command line supplied to the run-test.rb wrapper script.
  #
  def parse_command_line(args)
    test_configuration = {}

    option_parser = OptionParser.new do |opts|
      opts.banner = 'Usage: blc_runner.rb [options]'
      opts.separator 'Specific options:'

      opts.on('--blc', 'Execute broken link checks') do |opt|
        test_configuration[:website] = opt
      end

      opts.on('--base-url RHD_BASE_URL', String, 'Run the tests against the specified host e.g http://developers.stage.redhat.com') do |host|
        test_configuration[:base_url] = host
      end

      opts.on('--verbose', 'Verbose output for debugging') do |opt|
        bind_environment_variable('RHD_VERBOSE_OUTPUT', 'true')
        test_configuration[:verbose] = opt
      end

      opts.on('-c CONFIG_FILE', 'specify the config.yaml file for broken link checks') do |opt|
        test_configuration[:config] = opt
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
    bind_test_type_environment_variable(test_configuration)
    bind_github_status_environment_variables(test_configuration[:github_sha1], ENV['rhd_test'].to_s, test_configuration[:profile])
    bind_browser_environment_variables(test_configuration[:docker], test_configuration[:browser], test_configuration) if test_configuration[:e2e]
    build_test_execution_command(test_configuration)
    test_configuration
  end

  #
  # Run the checks based on user specified test type
  #
  def execute_checks(args = [])
    tests_passed = true
    case @test_type
      when 'blc'
        tests_passed &= execute_blc
      when 'dcp'
        tests_passed &= execute_blc
      else
        fail(StandardError, "#{@test_type} is not a recognised test type, please check and try again")
    end
    tests_passed
  end

  private

  #
  # Execute the blc checks, if critical link checks fail it will bail and fail build
  #
  def execute_blc
    success = true
    test_execution_command = build_blc_run_test_command
    begin
      @process_runner.execute!(test_execution_command)
    rescue
      puts 'Run of blc failed.'
      success = false
    end
    success
  end

  #
  # Builds the command to use to execute the broken-link checks, including whether or not
  # we should send updates to GitHub
  #
  def blc_run_test_command
    github_sha1 = read_env_variable('ghprbActualCommit')
    config = read_env_variable('CONFIG')
    command = "bundle exec blinkr -c #{config} --base-url=#{@host_to_test}"
    command += " --update-github-status=#{github_sha1}" if github_sha1
    command += ' --use-docker'
    command
  end

  #
  # Builds the command to use to execute the dcp-broken-link checks
  #
  def dcp_run_test_command(test_configuration)
    run_tests_command = ''
    run_tests_command += " -c #{test_configuration[:config]}" if test_configuration[:config]
    run_tests_command += " -u #{test_configuration[:base_url]}" if test_configuration[:base_url]
    run_tests_command += " -s #{test_configuration[:single_url]}" if test_configuration[:single_url]
    run_tests_command += ' --ignore-internal' if test_configuration[:ignore_internal]
    run_tests_command += ' --ignore-external' if test_configuration[:ignore_external]
    run_tests_command += ' --ignore-ssl' if test_configuration[:ignore_ssl]
    run_tests_command += ' -v' if test_configuration[:verbose]
    test_configuration[:run_tests_command] = "bundle exec dcp-checker #{run_tests_command}"
  end

  #
  # Reads an environment variable, returning its value or nil if it is not set or empty
  #
  def read_env_variable(variable_name)
    return nil if ENV[variable_name].nil? || ENV[variable_name].empty?
    ENV[variable_name]
  end

  #
  # Builds the tests base Docker image
  #
  def build_base_docker_image(test_dir)
    @process_runner.execute!("cd #{test_dir} && docker build -t test-base:0.1.0 .")
  end

  #
  # Runs the specified test type within Docker by executing
  # a number of Docker commands in sequence.
  #
  def run_tests_in_docker
    build_base_docker_image(@test_dir)
    compose_environment_directory = "#{@test_dir}/#{@test_type}/environments"
    compose_project_name = "rhd_#{@test_type}_testing"

    @log.info("Launching #{@test_type} testing environment...")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p rhd_#{@test_type}_testing build")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} up")

    @log.info("Test environment up and running. Running #{@test_type} tests...")
    @process_runner.execute!("cd #{compose_environment_directory} && docker-compose -p #{compose_project_name} run --rm --no-deps rhd_#{@test_type}_testing #{send("#{@test_type}_run_test_command")}")
    @log.info("Completed run of #{@test_type} tests.")
  end

  def run_tests_from_command_line
    @log.info("Running #{@test_type} tests from the command line...")
    @process_runner.execute!(send("#{@test_type}_run_test_command"))
    @log.info("Completed command line run of #{@test_type} tests.")
  end
end

#
# Wraps the actual execution of the tests to allow us to unit test that call
#
def execute(jenkins_test_runner)
  tests_passed = jenkins_test_runner.run_tests
  Kernel.exit(tests_passed ? 0 : 1)
end

# Guard to allow us to unit test this class
if $PROGRAM_NAME == __FILE__
  base_dir = File.dirname(__FILE__)
  begin
    run_tests = BlcRunner.new(base_dir, ProcessRunner.new)
    run_tests.execute_tests(ARGV)
    Kernel.exit(0)
  rescue
    Kernel.exit(1)
  end
end
