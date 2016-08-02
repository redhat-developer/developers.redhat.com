require 'fileutils'
require_relative '../default_logger'

#
# This performs house-keeping on the export archives kept on disk. It will keep a
# given number of export archives. The number to keep is configurable.
#
# @author rblake@redhat.com
#
class ExportArchivePruner

  attr_accessor :max_number_of_exports

  def initialize(export_archive_directory, max_number_of_exports = 15)
    @export_archive_directory = export_archive_directory
    @max_number_of_exports = max_number_of_exports
    @log = DefaultLogger.logger
  end

  def remove_old_export(export_directory)
    begin
      FileUtils.rm_rf("#{@export_archive_directory}/#{export_directory}")
    rescue
      @log.warn("Failed to clean old export directory '#{export_directory}'.")
    end
  end

  #
  # Inspects the current exports and prunes them if needs be
  #
  def prune_export_archives

    current_exports = Dir.entries(@export_archive_directory).select do | directory |
      directory.start_with?('export-')
    end

    unless current_exports.length <= @max_number_of_exports

      sorted_exports = current_exports.sort
      number_to_delete = current_exports.length - @max_number_of_exports

      number_to_delete.times do | n |
        remove_old_export(sorted_exports[n])
      end

    end

  end

  private :remove_old_export

end