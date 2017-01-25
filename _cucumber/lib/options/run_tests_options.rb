require 'optparse'

#
# Class implementation that parses the options supplied to the run-tests.rb script
#
# @author rblake@redhat.com
#
class RunTestsOptions

  #
  # Parses the command line supplied to the run-test.rb wrapper script.
  #
  def parse_command_line(args)

    test_configuration = create_default_test_configuration()

    option_parser = OptionParser.new do |opts|

      opts.banner = 'Usage: run-tests.rb [options]'
      opts.separator 'Specific options:'

      opts.on('--host-to-test HOST_TO_TEST', String, 'Run the tests against the specified host e.g http://developers.stage.redhat.com') do |host|
        test_configuration[:host_to_test] = host
        tasks[:acceptance_test_target_task] = ['--rm', '--service-ports','acceptance_tests', "bundle exec rake features HOST_TO_TEST=#{ENV['HOST_TO_TEST']} RHD_JS_DRIVER=#{ENV['RHD_JS_DRIVER']} RHD_TEST_PROFILE=#{ENV['RHD_TEST_PROFILE']}"]
      end

      opts.on('--use-docker', 'Run the acceptance tests using Docker') do
        test_configuration[:docker] = true
      end

      opts.on('--browser-count', String, 'The number of browsers to launch when running the tests with Docker [default=2]') do | browser_count |
        test_configuration[:browser_count] = browser_count.to_i
      end

      opts.on('--profile', String, 'The Cucumber profile to use when running the tests [default=desktop]') do | profile |
        test_configuration[:profile] = profile
      end

      opts.on('--browser', String, 'The browser to use when running the tests in Docker. Either chrome or firefox [default=chrome]') do | browser |
        check_supported_browser(browser)
        test_configuration[:browser] = browser
      end

      opts.on('--update-github-status', String, 'The SHA to report test results for on GitHub') do | sha1 |
        test_configuration[:update_github_status] = true
        test_configuration[:update_github_sha1] = sha1
      end

      opts.on('--cucumber-tags', String, 'The cucumber tags to use') do | cucumber_tags |
        test_configuration[:cucumber_tags] = cucumber_tags
      end

      opts.on_tail('-h', '--help', 'Show this message') do
        puts opts
        Kernel.exit(1)
      end
    end

    if args.empty?
      args = %w(-h)
    end

    option_parser.parse!(args)

    #
    # Bind the environment variables required by the tests from the user supplied configuration
    #
    bind_environment_variable('HOST_TO_TEST', test_configuration[:host_to_test])
    bind_environment_variable('RHD_TEST_PROFILE', test_configuration[:profile])
    bind_environment_variable('RHD_JS_DRIVER', test_configuration[:browser])
    bind_environment_variable('CUCUMBER_TAGS', test_configuration[:cucumber_tags])

    test_configuration

  end

  private

  #
  #
  #
  def build_test_execution_command(test_configuration)

  end


  #
  # Checks that the user has supplied us with a valid browser name
  #
  def check_supported_browser(browser_name)
    unless 'chrome' == browser_name or 'firefox' == browser_name
      puts "Browser '#{browser_name}' is not a supported browser. Please use one of either 'chrome' or 'firefox'"
      Kernel.exit(1)
    end
  end


  #
  # Binds the given env variable to the specified value
  #
  def bind_environment_variable(env_variable_name, value)
    unless value.nil? or value.empty?
      ENV[env_variable_name] = value;
    end
  end


  #
  # Creates the default test configuration
  #
  def create_default_test_configuration
    default_configuration = {}
    default_configuration[:host_to_test] = ''
    default_configuration[:profile] = 'desktop'
    default_configuration[:update_github_status] = false
    default_configuration[:update_github_sha1] = ''
    default_configuration[:browser] = 'chrome'
    default_configuration[:docker_browser_count] = 2
    default_configuration[:docker] = false
    default_configuration[:cucumber_tags] = ''
    default_configuration[:run_test_command] = 'rake -f cucumber.rake'

    default_configuration
  end

end