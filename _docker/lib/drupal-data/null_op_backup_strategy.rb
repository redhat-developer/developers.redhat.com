#
# This is a backup-strategy that does nothing with the files that have been generated as part of the backup process. We
# use then when generating the Docker drupal-data image to simply leave the backup files in the directory in which we are
# working.
#
class NullOpBackupStrategy

  def add_file_to_backup(file)
  end

  def commit_backup(backup_message, tag)
  end

end