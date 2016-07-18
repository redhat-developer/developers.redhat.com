require_relative '../process_runner'
require_relative '../export/export_archiver'
require_relative '../export/static_export_rsync'

class Rollback

  def initialize(export_archiver)
    @export_archiver = export_archiver
  end


  def rollback!(export_to_rollback_to, rsync_destination)
    raise StandardError.new("Requested export '#{export_to_rollback_to}' does not exist.") unless @export_archiver.archive_exist?(export_to_rollback_to)



  end


end

@DEFAULT_EXPORT_ARCHIVE_DIRECTORY = '/export/export-archives'

if $0 == __FILE__
  rsync_destination = ARGV[0]
  export_for_rollback = ARGV[1]
  if export_for_rollback.nil? or export_for_rollback.empty?
    puts 'Usage: rollback.rb <rsync_destination> <archived_export>'
  end

  static_export_rsync = StaticExportRsync.new(ProcessRunner.new)
  export_archiver = ExportArchiver.new(@DEFAULT_EXPORT_ARCHIVE_DIRECTORY)
  rollback = Rollback.new(export_archiver)
  begin
    rollback.rollback!(export_for_rollback, rsync_destination)
    Kernel.exit(0)
  rescue


  end

end
