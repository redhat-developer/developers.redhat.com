require_relative '../../default_logger'
require_relative '../../../lib/process_runner'

#
# This simple class performs a simple reset of the Git repository that we use to store backups in order to
# reclaim disk space.
#
# @author rblake@redhat.com
#
class BackupReset

  def initialize(backup_directory, git_backup_repository, process_runner)
    @backup_directory = backup_directory
    @git_backup_repository = git_backup_repository
    @process_runner = process_runner
    @log = DefaultLogger.logger
  end

  #
  # Cleans the backup repository by firstly deleting it and then cloning again using git lfs
  #
  def reset_backup_repository
    clean_existing_repository
    clone_backup_repository
  end

  private

  #
  # Clones the backup repository using Git LFS. Assumes that credentials have been configured on the container in which this
  # code is executing
  #
  def clone_backup_repository
    @process_runner.execute!("git lfs clone #{@git_backup_repository} #{@backup_directory}")
  end

  #
  # Deletes any content within the currently checked out repository, thus reclaiming disk space
  #
  def clean_existing_repository
    @process_runner.execute!("rm -rf #{@backup_directory}/* #{@backup_directory}/.git #{@backup_directory}/.gitattributes")
  end
end

if $PROGRAM_NAME == __FILE__
  backup_reset = BackupReset.new('/backups','https://github.com/redhat-developer/rhd-backups.git', ProcessRunner.new)
  backup_reset.reset_backup_repository
end