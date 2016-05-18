require 'date'

require_relative '../../../_docker/lib/default_logger'
require_relative '../../../_docker/lib/process_runner'
require_relative 'git_backup_strategy'

#
# The purpose of this class is to perform a backup of a RHD environment.
# It can be passed a single argument, which will name the folder into which the backup is placed.
#
# @author rblake@redhat.com
#
class Backup

  # Default name of the Drupal filesystem backup
  @@DRUPAL_FILESYSTEM_TAR = 'drupal-filesystem.tar.gz'

  # Default name of the Drupal database dump
  @@DRUPAL_DATABASE_SQL_DUMP = 'drupal-db.sql'

  def self.drupal_filesystem_tar
    @@DRUPAL_FILESYSTEM_TAR
  end

  def self.drupal_database_sql_dump
    @@DRUPAL_DATABASE_SQL_DUMP
  end

  @backup_directory
  @backup_strategy
  @drupal_directory
  @database_name
  @process_runner
  @log

  def initialize(drupal_directory, database_name, backup_directory, backup_strategy, process_runner)
    @process_runner = process_runner
    @log = DefaultLogger.logger
    @drupal_directory = drupal_directory
    @database_name = database_name
    @backup_directory = backup_directory
    @backup_strategy = backup_strategy
  end

  #
  # Creates a TAR archive of the contents of the directory mounted at @drupal_directory
  #
  private def backup_drupal_filesystem
    tar_name = "#{@backup_directory}/#{@@DRUPAL_FILESYSTEM_TAR}"
    @log.info("Creating TAR archive '#{tar_name}' of Drupal filesystem mounted at '#{@drupal_directory}'...")

    @process_runner.execute!("tar -czf #{tar_name} -C #{@drupal_directory} .")
    @backup_strategy.add_file_to_backup(@@DRUPAL_FILESYSTEM_TAR)

    @log.info('Successfully created TAR archive of Drupal filesystem.')
  end

  #
  # Creates a SQL dump of the database named @database_name
  #
  private def backup_drupal_database
    sql_dump = @backup_directory + "/" + @@DRUPAL_DATABASE_SQL_DUMP
    @log.info("Creating SQL dump '#{sql_dump}' of Drupal database...")

    @process_runner.execute!("mysqldump #{@database_name} > #{sql_dump}")
    @backup_strategy.add_file_to_backup(@@DRUPAL_DATABASE_SQL_DUMP)

    @log.info('Successfully created SQL dump of Drupal database.')
  end

  #
  # Generates a user-friendly timestamp for the back-up
  #
  private def generate_backup_time
    DateTime.now.strftime('%F-%H-%M-%S')
  end

  def execute(args)

    backup_time = generate_backup_time
    tag = args.first.to_s == '' ? backup_time : args.first

    backup_drupal_filesystem
    backup_drupal_database

    @backup_strategy.commit_backup("Backup prior to deployment '#{tag}' at '#{backup_time}'", tag)
  end

end

# The default directory at which the Drupal filesystem will be mounted
@DEFAULT_DRUPAL_FILESYSTEM_DIRECTORY = '/drupal'

# The default name of the database to backup on the host that we connect to
@DEFAULT_DATABASE_NAME = 'rhd_mysql'

# The default directory into which backups should be made
@DEFAULT_BACKUP_DIRECTORY = '/backups'

if $0 == __FILE__
  log = DefaultLogger.logger
  log.info('Beginning backup of current environment')
  begin
    process_runner = ProcessRunner.new(true);
    backup = Backup.new(@DEFAULT_DRUPAL_FILESYSTEM_DIRECTORY, @DEFAULT_DATABASE_NAME, @DEFAULT_BACKUP_DIRECTORY, GitBackupStrategy.new(@DEFAULT_BACKUP_DIRECTORY, process_runner), process_runner)
    backup.execute(ARGV)
    Kernel.exit!(0)
  rescue
    log.error('Failed to take backup of current environment.')
    Kernel.exit!(1)
  end
end