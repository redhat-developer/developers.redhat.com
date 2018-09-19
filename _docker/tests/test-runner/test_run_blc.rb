require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../../_tests/blc/run_checks'

class TestRunBlc < MiniTest::Test

  def setup
    @test_dir = '/tmp/_tests/blc'
    @process_runner = mock()
    @run_tests_options = mock()
    @run_tests = RunChecks.new(@test_dir, @process_runner, @run_tests_options)
  end

  def teardown
    ENV['rhd_test'] = nil
    ENV['COMPOSE_PROJECT_NAME'] = nil
  end

  def test_should_run_blinkr_tests_from_command_line_when_no_docker

    ENV['rhd_test'] = 'blinkr'

    test_configuration = {}
    test_configuration[:docker] = false
    test_configuration[:run_tests_command] = 'bundle exec blinkr'

    @run_tests_options.expects(:parse_command_line).with(%w()).returns(test_configuration)
    @process_runner.expects(:execute!).with('bundle exec blinkr')

    @run_tests.execute_checks(%w())
  end

  def test_should_run_blinkr_tests_from_docker_when_docker_specified

    ENV['rhd_test'] = 'blinkr'

    test_configuration = {}
    test_configuration[:blinkr] = true
    test_configuration[:docker] = true
    test_configuration[:run_tests_command] = 'bundle exec blinkr'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/_tests/blc && docker build -t test-base:0.1.0 .')
    @process_runner.expects(:execute!).with('cd /tmp/_tests/blc/blinkr/environments && docker-compose -p rhd_blinkr_testing build')
    @process_runner.expects(:execute!).with('cd /tmp/_tests/blc/blinkr/environments && docker-compose -p rhd_blinkr_testing up -d blinkr_chrome')
    @process_runner.expects(:execute!).with('cd /tmp/_tests/blc/blinkr/environments && docker-compose -p rhd_blinkr_testing run --rm --no-deps rhd_blinkr_testing bundle exec blinkr')

    @run_tests.execute_checks(%w(--use-docker))
  end

  def test_should_run_dcp_tests_from_command_line_when_no_docker

    ENV['rhd_test'] = 'dcp'

    test_configuration = {}
    test_configuration[:docker] = false
    test_configuration[:run_tests_command] = 'bundle exec dcp-checker'

    @run_tests_options.expects(:parse_command_line).with(%w()).returns(test_configuration)
    @process_runner.expects(:execute!).with('bundle exec dcp-checker')

    @run_tests.execute_checks(%w())
  end

  def test_should_run_dcp_tests_from_docker_when_docker_specified

    ENV['rhd_test'] = 'dcp'

    test_configuration = {}
    test_configuration[:dcp] = true
    test_configuration[:docker] = true
    test_configuration[:run_tests_command] = 'bundle exec dcp-checker'

    @run_tests_options.expects(:parse_command_line).with(%w(--use-docker)).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/_tests/blc && docker build -t test-base:0.1.0 .')
    @process_runner.expects(:execute!).with('cd /tmp/_tests/blc/dcp/environments && docker-compose -p rhd_dcp_testing build')
    @process_runner.expects(:execute!).with('cd /tmp/_tests/blc/dcp/environments && docker-compose -p rhd_dcp_testing run --rm --no-deps rhd_dcp_testing bundle exec dcp-checker')

    @run_tests.execute_checks(%w(--use-docker))
  end
end