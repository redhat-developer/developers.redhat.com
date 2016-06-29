require 'open3'
require_relative 'default_logger'

#
# <p> Class that wraps the execution of command line. Will raise an Error if the requested command does not return
# with a zero status.
# </p>
#
# @author rblake@redhat.com
#
class ProcessRunner

  class ProcessFailedError < StandardError

  end

  #
  # Initialise the instance. If verbose is true, then full output of stdout and stderr is printed to the
  # console
  #
  def initialize
    @log = DefaultLogger.logger
  end

  def determine_process_status(cmd, execution_result)
    raise ProcessFailedError.new("Execution of command '#{cmd}' failed.") unless execution_result
  end

  #
  # <p>Execute the given command specified by cmd.</p>
  #
  # @throws - ProcessFailedError if the command exits with a non-zero status
  #
  def execute!(cmd)
    @log.info("Executing command '#{cmd}'...")
    execution_result = Kernel.system(cmd)
    determine_process_status(cmd, execution_result)
  end

  private :determine_process_status

end