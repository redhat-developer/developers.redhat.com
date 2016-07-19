require_relative '../process_runner'
require_relative '../export/export_archiver'
require_relative '../export/export_archive_pruner'
require_relative '../export/static_export_rsync'

#
# Acts as a controller on the rollback process. Simply checks that the specified export exists
# and then rsyncs it to the specified destination.
#
class Rollback

  def initialize(export_archiver, static_export_rsync)
    @export_archiver = export_archiver
    @static_export_rsync = static_export_rsync
  end

  def rollback!(export_to_rollback_to, rsync_destination)
    export_archive_path = @export_archiver.get_archive_path(export_to_rollback_to)
    @static_export_rsync.rsync_static_export(export_archive_path, rsync_destination, false)
  end
end

#
# Double check that the command line arg has been set
#
def is_command_line_arg_empty(arg)
  arg.nil? or arg.empty?
end

@DEFAULT_EXPORT_ARCHIVE_DIRECTORY = '/export/export-archives'

if $0 == __FILE__
  rsync_destination = ARGV[0]
  export_for_rollback = ARGV[1]
  if is_command_line_arg_empty(rsync_destination) or is_command_line_arg_empty(export_for_rollback)
    puts 'Usage: rollback.rb <rsync_destination> <archived_export>'
  end

  export_archiver = ExportArchiver.new(@DEFAULT_EXPORT_ARCHIVE_DIRECTORY, ExportArchivePruner.new(@DEFAULT_EXPORT_ARCHIVE_DIRECTORY))
  static_export_rsync = StaticExportRsync.new(ProcessRunner.new, export_archiver)
  rollback = Rollback.new(export_archiver, static_export_rsync)

  rollback.rollback!(export_for_rollback, rsync_destination)
  Kernel.exit(0)
end