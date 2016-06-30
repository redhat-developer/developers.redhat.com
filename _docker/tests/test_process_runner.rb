require 'minitest/autorun'
require_relative '../../_docker/lib/process_runner'
require_relative 'test_helper'

class TestProcessRunner < Minitest::Test

  def test_successful_execution
    Kernel.expects(:system).with('pwd').returns(true)
    process_runner = ProcessRunner.new
    process_runner.execute!('pwd')
  end

  def test_failed_execution_raises_exception

    Kernel.expects(:system).with('pwd').returns(false)
    process_runner = ProcessRunner.new


    assert_raises(ProcessRunner::ProcessFailedError) {
      process_runner.execute!('pwd')
    }

  end

end