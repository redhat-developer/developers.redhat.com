require 'logger'

#
# Sets up the default logging style to be used across all functions
#
# @author rblake@redhat.com
#
class DefaultLogger

  #
  # @return A default configured logger instance
  #
  def self.logger
    # Causes output to be immediately flushed to STDOUT. Without this we lose some logging when the
    # Docker container exists before the buffer is flushed.
    STDOUT.sync = true
    log = Logger.new(STDOUT)
    log.formatter = proc do |severity, datetime, _, msg|
      date_format = datetime.strftime('%Y-%m-%d %H:%M:%S')
      "[#{date_format}] #{severity} - #{msg.gsub("\n",'')}\n"
    end
    log
  end
end