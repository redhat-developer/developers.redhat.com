require 'minitest/autorun'
require_relative '../../_docker/lib/process_runner'
require_relative 'test_helper'

class TestProcessRunner < Minitest::Test

  def setup
    @process_runner = ProcessRunner.new
  end

  def test_successful_execution
    Kernel.expects(:system).with('pwd').returns(true)
    @process_runner.execute!('pwd')
  end

  def test_failed_execution_raises_exception

    Kernel.expects(:system).with('pwd').returns(false)
    assert_raises(ProcessRunner::ProcessFailedError) {
      @process_runner.execute!('pwd')
    }

  end

  def test_successful_execution_returns_true
    Kernel.expects(:system).with('pwd').returns(true)
    assert(@process_runner.execute?('pwd'))
  end

  def test_failed_execution_returns_false_when_exit_code_is_nil
    Kernel.expects(:system).with('pwd').returns(nil)
    refute(@process_runner.execute?('pwd'))
  end

  def test_failed_execution_returns_false
    Kernel.expects(:system).with('pwd').returns(false)
    refute(@process_runner.execute?('pwd'))
  end


end