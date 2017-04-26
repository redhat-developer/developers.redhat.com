require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../_blc/run_blc'

class TestRunBlc < MiniTest::Test

  def setup
    @blc_dir = '/tmp/blc'
    @process_runner = mock()
    @run_tests_options = mock()

    @run_tests = RunBrokenLinkCheck.new(@blc_dir, @process_runner, @run_tests_options)
  end

  def teardown
    ENV['COMPOSE_PROJECT_NAME'] = nil
  end

  def test_should_run_tests_from_docker

    test_configuration = {}
    test_configuration[:exclude_external] = false
    test_configuration[:exclude_internal] = false
    test_configuration[:verbose] = false
    test_configuration[:run_tests_command] = 'NODE_TLS_REJECT_UNAUTHORIZED=0 blc'

    @run_tests_options.expects(:parse_command_line).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/blc/environments && docker-compose -p rhdbrokenlinkcheck build')
    @process_runner.expects(:execute!).with('cd /tmp/blc/environments && docker-compose -p rhdbrokenlinkcheck run --rm --no-deps broken_link_check NODE_TLS_REJECT_UNAUTHORIZED=0 blc')

    @run_tests.run_broken_link_check
  end

  def test_should_run_tests_from_docker_with_user_specified_compose_project_name

    ENV['COMPOSE_PROJECT_NAME'] = 'foo'

    test_configuration = {}
    test_configuration[:exclude_external] = false
    test_configuration[:exclude_internal] = false
    test_configuration[:verbose] = false
    test_configuration[:run_tests_command] = 'NODE_TLS_REJECT_UNAUTHORIZED=0 blc'

    @run_tests_options.expects(:parse_command_line).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/blc/environments && docker-compose -p foo build')
    @process_runner.expects(:execute!).with('cd /tmp/blc/environments && docker-compose -p foo run --rm --no-deps broken_link_check NODE_TLS_REJECT_UNAUTHORIZED=0 blc')

    @run_tests.run_broken_link_check

  end

end
