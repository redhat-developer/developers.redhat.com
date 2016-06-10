require 'tmpdir'
require_relative '../../lib/process_runner'
require_relative '../../lib/default_logger'

#
# This class uses rsync to copy a static export of a Drupal site to a given location on a target host.
#
# If the target directory structure does not exist, then it will be created first.
#
class StaticExportRsync

  attr_accessor :empty_directory

  def initialize(process_runner)
    @process_runner = process_runner
    @log = DefaultLogger.logger
    @empty_directory = Dir.mktmpdir
  end

  #
  # Syncs the given export_directory to the rsync target location. It is assumed that the rsync target location will be in the format
  # user@host:/required/target/path.
  #
  def rsync_static_export(export_directory, rsync_target_location)
    validate_target_location_format(rsync_target_location)
    @log.info("Beginning rsync of '#{export_directory}' to '#{rsync_target_location}'...")

    target_host, target_directory = rsync_target_location.split(':')
    build_target_directory_structure(target_host, target_directory)
    rsync(export_directory, rsync_target_location)

    @log.info("Completed rsync of '#{export_directory}' to '#{rsync_target_location}.'")
  end

  #
  # Performs an rsync. Rsync options copied verbatim from legacy Rakefile
  #
  def rsync(local_folder, remote_destination)
    @log.info("rsyncing folder '#{local_folder}' to '#{remote_destination}'...")
    @process_runner.execute!("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{local_folder}/ #{remote_destination}")
  end

  #
  # Creates the target directory structure on the remote host
  #
  def build_target_directory_structure(target_host, target_directory)
   @log.info("Creating target directory structure '#{target_directory}' on host '#{target_host}'...")

   remote_path = []
   target_directory.split('/').each do | directory |
      if !directory.empty?
        remote_path << directory
        rsync(@empty_directory, "#{target_host}:/#{remote_path.join('/')}")
      end
   end

   @log.info("Successfully created target directory structure '#{target_directory}' on host '#{target_host}'.")
  end

  #
  # Validates that the user has provided a valid rsync host structure
  #
  def validate_target_location_format(rsync_target_location)
    rsync_pattern = /^\w+@.+:[\/\w+]+$/
    raise StandardError.new("Rsync target '#{rsync_target_location}' is not supported. Please use format: 'user@host:/target/directory'") if !rsync_pattern.match(rsync_target_location)
  end

  private :rsync, :build_target_directory_structure, :validate_target_location_format


end