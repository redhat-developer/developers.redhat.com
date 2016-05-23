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
  def initialize(verbose)
    @verbose = verbose
    @log = DefaultLogger.logger
  end

  def determine_process_status(cmd, exit_code)
    raise ProcessFailedError.new("Execution of command '#{cmd}' failed. Exit code '#{exit_code}'.") if exit_code != 0
  end

  #
  # By appending a ; to the command, we force it to be executed in the default shell of the current user
  #
  def prepare_command_for_execution(cmd)
    cmd.end_with?(';') ? cmd : cmd + ';'
  end

  #
  # <p>Execute the given command specified by cmd.</p>
  #
  # @throws - ProcessFailedError if the command exits with a non-zero status
  #
  def execute!(cmd)

    cmd = prepare_command_for_execution(cmd)
    @log.info("Executing command '#{cmd}'")

    Open3.popen3(cmd) do |_, stdout, stderr, wait_thr|

      if @verbose
        threads = []
        threads << Thread.new(stdout) do |i|
          while ( ! i.eof? )
            @log.info("(Console): #{i.readline}")
          end
        end
        threads << Thread.new(stderr) do |i|
          while ( ! i.eof? )
            @log.error("(Console): #{i.readline}")
          end
        end
        threads.each{|t|t.join}
      end

      exit_code = wait_thr.value
      determine_process_status(cmd, exit_code)
    end
  end

  private :determine_process_status, :prepare_command_for_execution

end