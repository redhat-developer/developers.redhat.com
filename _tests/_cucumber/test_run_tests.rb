require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../_cucumber/run_tests'

class TestRunTests < MiniTest::Test

  def setup
    @cucumber_dir = '/tmp/cucumber'
    @process_runner = mock()
    @run_tests_options = mock()

    @run_tests = RunTests.new(@cucumber_dir, @process_runner, @run_tests_options)
  end

  def teardown
    ENV['COMPOSE_PROJECT_NAME'] = nil
  end

  def test_should_run_tests_from_command_line_when_no_docker

    test_configuration = {}
    test_configuration[:docker] = false
    test_configuration[:run_tests_command] = 'rake -f cucumber.rake features'

    @run_tests_options.expects(:parse_command_line).with(%w()).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/cucumber && rake -f cucumber.rake features')

    @run_tests.run_acceptance_tests(%w())
  end

  def test_should_run_tests_from_docker_when_docker_specified

    test_configuration = {}
    test_configuration[:docker] = true
    test_configuration[:docker_node] = 'docker_chrome'
    test_configuration[:run_tests_command] = 'rake -f cucumber.rake features'
    test_configuration[:browser_count] = 5

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p rhdtesting build')
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p rhdtesting up -d docker_chrome')
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p rhdtesting scale docker_chrome=5')
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p rhdtesting run --rm --no-deps tests rake -f cucumber.rake features')

    @run_tests.run_acceptance_tests(%w(--use-docker))
  end

  def test_should_run_tests_from_docker_with_user_specified_compose_project_name

    ENV['COMPOSE_PROJECT_NAME'] = 'foo'

    test_configuration = {}
    test_configuration[:docker] = true
    test_configuration[:docker_node] = 'docker_chrome'
    test_configuration[:run_tests_command] = 'rake -f cucumber.rake features'
    test_configuration[:browser_count] = 3

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p foo build')
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p foo up -d docker_chrome')
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p foo scale docker_chrome=3')
    @process_runner.expects(:execute!).with('cd /tmp/cucumber/environments && docker-compose -p foo run --rm --no-deps tests rake -f cucumber.rake features')

    @run_tests.run_acceptance_tests(%w(--use-docker))

  end

end
