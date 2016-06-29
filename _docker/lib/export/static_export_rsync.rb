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
    path_to_create = get_path_to_create(rsync_target_location)
    @log.info("'#{path_to_create}' of '#{rsync_target_location}' will be created...")

    final_destination = replace_create_path(rsync_target_location)

    target_host, target_directory = final_destination.split(':')
    check_and_build_target_directory_structure(target_host, target_directory, path_to_create)
    rsync(export_directory, final_destination)

    @log.info("Completed rsync of '#{export_directory}' to '#{rsync_target_location}.'")
  end

  #
  # Performs an rsync. Rsync options copied verbatim from legacy Rakefile
  #
  def rsync(local_folder, remote_destination)
    @log.info("rsyncing folder '#{local_folder}' to '#{remote_destination}'...")
    @process_runner.execute!("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{local_folder}/ #{remote_destination}")
  end

  def replace_create_path(path)
    path.gsub('[','').gsub(']','')
  end

  def validate_path_to_create_structure(create_path_start, create_path_end)
    raise StandardError.new("You must enclose the path to be created with a trailing ']'") if create_path_end.nil? and !create_path_start.nil?
    raise StandardError.new("You must enclose the path to be created with preceeding '['") if create_path_start.nil? and !create_path_end.nil?
  end

  def get_path_to_create(target_directory)

    path_to_create=nil
    create_path_start = target_directory.index('[')
    create_path_end = target_directory.index(']')

    validate_path_to_create_structure(create_path_start, create_path_end)

    unless create_path_start.nil?

      path_to_create = replace_create_path(target_directory[create_path_start, create_path_end])
      raise StandardError.new("The path to create must start with a '/'. It is currently '#{path_to_create}'") unless path_to_create.start_with?('/')

    end

    path_to_create
  end

  #
  # Checks to see if any of the remote directory structure needs to be created, and if yes, creates it
  #
  def check_and_build_target_directory_structure(target_host, target_directory, path_to_create)

   unless path_to_create.nil?

     @log.info("Attempting to create '#{path_to_create}' of target directory' '#{target_host}:#{target_directory}'...")

     path_to_create_parts = path_to_create.split('/')
     remote_path = []

     target_directory.split('/').each do | directory |
       if !directory.empty?
         directory_path = directory.start_with?('/') ? directory : "/#{directory}"
         remote_path << directory

         if path_to_create_parts.include?(directory)
          rsync(@empty_directory, "#{target_host}:/#{remote_path.join('/')}")
         end

       end
     end
     @log.info("Successfully created '#{path_to_create}' of directory structure '#{target_host}:#{target_directory}'.")

   else
     @log.info("Not attempting to create any of remote path '#{target_directory}' on host '#{target_host}'")
   end
  end


  #
  # Validates that the user has provided a valid rsync host structure
  #
  def validate_target_location_format(rsync_target_location)
    rsync_pattern = /^\w+@.+:.+$/
    raise StandardError.new("Rsync target '#{rsync_target_location}' is not supported. Please use format: 'user@host:/target/directory'") if !rsync_pattern.match(rsync_target_location)
  end

  private :rsync, :check_and_build_target_directory_structure, :validate_target_location_format


end