require 'minitest/autorun'
require_relative '../../_docker/lib/process_runner'

class TestProcessRunner < Minitest::Test

  def test_non_verbose_successful_execution_is_ok
    process_runner = ProcessRunner.new(false)
    process_runner.execute!('pwd')
  end

  def test_non_verbose_failed_execution_raises_exception
    process_runner = ProcessRunner.new(false)

    assert_raises(ProcessRunner::ProcessFailedError) {
      process_runner.execute!('no_such_command')
    }

  end

  def test_verbose_successful_execution_is_ok
    process_runner = ProcessRunner.new(true)
    process_runner.execute!('pwd')
  end

  def test_verbose_failed_execution_raises_exception
    process_runner = ProcessRunner.new(true)

    assert_raises(ProcessRunner::ProcessFailedError) {
      process_runner.execute!('no_such_command')
    }
  end

end