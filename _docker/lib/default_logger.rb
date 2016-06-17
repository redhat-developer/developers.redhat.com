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
    log = Logger.new(STDOUT)
    log.formatter = proc do |severity, datetime, _, msg|
      date_format = datetime.strftime('%Y-%m-%d %H:%M:%S')
      "[#{date_format}] #{severity} - #{msg.gsub("\n",'')}\n"
    end
    log
  end
end