require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../_blinkr/run_blinkr'

class TestRunBlinkr < MiniTest::Test

  def setup
    @blinkr_dir = '/tmp/blinkr'
    @process_runner = mock()
    @run_tests_options = mock()
    @run_tests = RunBlinkr.new(@blinkr_dir, @process_runner, @run_tests_options)
  end

  def teardown
    ENV['COMPOSE_PROJECT_NAME'] = nil
  end

  def test_should_run_blinkr_from_docker

    test_configuration = {}
    test_configuration[:run_tests_command] = 'jruby -S bundle exec blinkr'

    @run_tests_options.expects(:parse_command_line).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/blinkr/environments && docker-compose -p rhdblinkr build')
    @process_runner.expects(:execute!).with('cd /tmp/blinkr/environments && docker-compose -p rhdblinkr run --rm --no-deps broken_link_checks jruby -S bundle exec blinkr')

    @run_tests.run_blinkr(%w())

  end

  def test_should_run_tests_from_docker_with_user_specified_compose_project_name

    ENV['COMPOSE_PROJECT_NAME'] = 'foo'

    test_configuration = {}
    test_configuration[:run_tests_command] = 'jruby -S bundle exec blinkr'

    @run_tests_options.expects(:parse_command_line).returns(test_configuration)
    @process_runner.expects(:execute!).with('cd /tmp/blinkr/environments && docker-compose -p foo build')
    @process_runner.expects(:execute!).with('cd /tmp/blinkr/environments && docker-compose -p foo run --rm --no-deps broken_link_checks jruby -S bundle exec blinkr')

    @run_tests.run_blinkr(%w())
  end

end
