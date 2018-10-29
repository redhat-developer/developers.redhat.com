require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../../_docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend/run_unit_tests'

class TestRunUnitTests < MiniTest::Test

  def setup
    @test_dir = '/tmp/rhd-frontend'
    @process_runner = mock()
    @run_tests_options = mock()
    @run_tests = RunUnitTest.new(@test_dir, @process_runner, @run_tests_options)
  end

  def teardown
    ENV['rhd_test'] = nil
    ENV['COMPOSE_PROJECT_NAME'] = nil
  end

  def test_should_run_unit_tests_from_command_line_when_no_docker

    ENV['rhd_test'] = 'unit'

    test_configuration = {}
    test_configuration[:docker] = false
    test_configuration[:run_tests_command] = 'npm test'

    @run_tests_options.expects(:parse_command_line).with(%w()).returns(test_configuration)
    @process_runner.expects(:execute!).with('npm test')

    @run_tests.execute_tests(%w())
  end

  def test_should_run_unit_tests_from_docker_when_docker_specified

    ENV['rhd_test'] = 'unit'
    test_configuration = {}
    test_configuration[:docker] = true
    test_configuration[:run_tests_command] = 'npm test'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)

    @process_runner.expects(:execute!).with('cd /tmp/rhd-frontend && docker build -t unit-test:0.0.1 .')

    @process_runner.expects(:execute!).with('cd environments && docker-compose -p rhd_unit_testing build')

    @process_runner.expects(:execute!).with('cd environments && docker-compose -p rhd_unit_testing run --rm --no-deps rhd_unit_testing npm test')

    @run_tests.execute_tests(%w(--use-docker))
  end

  def test_should_run_unit_tests_from_docker_with_user_specified_compose_project_name

    ENV['COMPOSE_PROJECT_NAME'] = 'foo'
    ENV['rhd_test'] = 'unit'
    test_configuration = {}
    test_configuration[:docker] = true
    test_configuration[:run_tests_command] = 'npm test'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)

    @process_runner.expects(:execute!).with('cd /tmp/rhd-frontend && docker build -t unit-test:0.0.1 .')

    @process_runner.expects(:execute!).with('cd environments && docker-compose -p foo build')

    @process_runner.expects(:execute!).with('cd environments && docker-compose -p foo run --rm --no-deps rhd_unit_testing npm test')

    @run_tests.execute_tests(%w(--use-docker))
  end
end