require 'date'
require 'fileutils'
require_relative '../default_logger'

#
# This class will archive exports that have been successfully rsynced to the remote
# Apache instance for serving. This means that you can rollback to the archived version
# if you need to.
#
class ExportArchiver

  def initialize(export_archive_directory, export_archive_pruner)
    @export_archive_directory = export_archive_directory
    @export_archive_pruner = export_archive_pruner
    @log = DefaultLogger.logger
    make_directory(@export_archive_directory)
  end

  def make_directory(directory_to_make)
    FileUtils.mkdir_p(directory_to_make)
  end

  def make_archive_directory
    dir_name = "#{@export_archive_directory}/export-#{DateTime.now.strftime('%F-%H-%M-%S')}"
    make_directory(dir_name)
    Dir.open(dir_name)
  end

  def copy_export_to_archive_directory(export_directory, export_archive_directory)
    FileUtils.cp_r("#{export_directory}/.", export_archive_directory)
  end

  #
  # Archives the given export directory
  #
  def archive_site_export(export_directory)
    export_archive_directory = make_archive_directory
    @log.info("Archiving export directory '#{export_directory}' to '#{export_archive_directory.path}'...")
    copy_export_to_archive_directory(export_directory, export_archive_directory)
    @log.info("Successfully archived export directory '#{export_directory}' to '#{export_archive_directory.path}.'")
    @export_archive_pruner.prune_export_archives
    export_archive_directory.path
  end

  #
  # Determines if the specified archive exists. Returns true if it exists, false otherwise
  #
  def archive_exist?(archive_name)
    archive_directory = "#{@export_archive_directory}/#{archive_name}"
    exists = Dir.exist?(archive_directory)

    if exists
      exists = sanity_check_requested_archive(archive_directory)
    end

    exists
  end

  #
  # Gets the path to the export in the archive, first checking that it is a valid archive.
  #
  def get_archive_path(archive_name)
    raise StandardError.new("The requested export archive '#{archive_name}' does not exist or is not valid.") unless archive_exist?(archive_name)
    "#{@export_archive_directory}/#{archive_name}"
  end

  #
  # Performs a basic sanity check on the archive. Makes sure that the directory is not empty
  # and that it contains an index.html
  #
  def sanity_check_requested_archive(archive_directory)
    files_in_archive = Dir.entries(archive_directory)
    !files_in_archive.empty? and files_in_archive.include?('index.html')
  end

  private :make_archive_directory, :copy_export_to_archive_directory, :make_directory, :sanity_check_requested_archive

end