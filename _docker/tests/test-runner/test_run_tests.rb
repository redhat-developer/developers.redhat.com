require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../../_tests/run_tests'

class TestRunTests < MiniTest::Test

  def setup
    @test_dir = '/tmp/_tests'
    @process_runner = mock()
    @run_tests_options = mock()
    @run_tests = RunTest.new(@test_dir, @process_runner, @run_tests_options)
  end

  def teardown
    ENV['rhd_test'] = nil
    ENV['COMPOSE_PROJECT_NAME'] = nil
  end

  def test_should_run_unit_tests_from_docker_when_docker_specified

    ENV['rhd_test'] = 'unit'
    test_configuration = {}
    test_configuration[:docker] = true
    test_configuration[:run_tests_command] = 'npm run test:docker'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)

    @process_runner.expects(:execute!).with('cd /tmp/_tests && docker build -t test-base:2.3.0 .')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/unit/environments && docker-compose -p rhd_unit_testing build')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/unit/environments && docker-compose -p rhd_unit_testing run --rm --no-deps rhd_unit_testing npm run test:docker')

    @run_tests.execute_tests(%w(--use-docker))
  end

  def test_should_run_unit_tests_from_docker_with_user_specified_compose_project_name

    ENV['COMPOSE_PROJECT_NAME'] = 'foo'
    ENV['rhd_test'] = 'unit'
    test_configuration = {}
    test_configuration[:docker] = true
    test_configuration[:run_tests_command] = 'npm run test:docker'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)

    @process_runner.expects(:execute!).with('cd /tmp/_tests && docker build -t test-base:2.3.0 .')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/unit/environments && docker-compose -p foo build')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/unit/environments && docker-compose -p foo run --rm --no-deps rhd_unit_testing npm run test:docker')

    @run_tests.execute_tests(%w(--use-docker))
  end

  def test_should_run_e2e_tests_from_docker_when_docker_specified

    ENV['rhd_test'] = 'e2e'
    test_configuration = {}
    test_configuration[:e2e] = true
    test_configuration[:docker] = true
    test_configuration[:run_tests_command] = 'npm run e2e:ci'
    test_configuration[:browser_count] = 5
    test_configuration[:browser] = 'chrome'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)

    @process_runner.expects(:execute!).with('cd /tmp/_tests && docker build -t test-base:2.3.0 .')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/e2e/environments && docker-compose -p rhd_e2e_testing build')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/e2e/environments && docker-compose -p rhd_e2e_testing up -d chrome')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/e2e/environments && docker-compose -p rhd_e2e_testing run --rm --no-deps rhd_e2e_testing npm run e2e:ci')

    @run_tests.execute_tests(%w(--use-docker))
  end

  def test_should_run_e2e_tests_from_docker_with_user_specified_compose_project_name

    ENV['COMPOSE_PROJECT_NAME'] = 'foo'
    ENV['rhd_test'] = 'e2e'
    test_configuration = {}
    test_configuration[:e2e] = true
    test_configuration[:docker] = true
    test_configuration[:docker_node] = 'chrome'
    test_configuration[:run_tests_command] = 'npm run e2e:ci'
    test_configuration[:browser_count] = 5
    test_configuration[:browser] = 'chrome'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)

    @process_runner.expects(:execute!).with('cd /tmp/_tests && docker build -t test-base:2.3.0 .')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/e2e/environments && docker-compose -p foo build')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/e2e/environments && docker-compose -p foo up -d chrome')

    @process_runner.expects(:execute!).with('cd /tmp/_tests/e2e/environments && docker-compose -p foo run --rm --no-deps rhd_e2e_testing npm run e2e:ci')

    @run_tests.execute_tests(%w(--use-docker))

  end
end