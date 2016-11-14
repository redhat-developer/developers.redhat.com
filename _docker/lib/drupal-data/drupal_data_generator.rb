require 'fileutils'
require_relative '../default_logger'
require_relative 'null_op_backup_strategy'
require_relative '../../lib/process_runner'

#
# This class will take a backup of the current Drupal environment and place it into a pre-configured directory.
# Additionally before each run, this class will delete any pre-existing backup in the directory if it exists.
#
class DrupalDataGenerator

  def initialize(working_directory, backup)
    @working_directory = working_directory
    @backup = backup
    @log = DefaultLogger.logger
  end

  #
  # Cleans the backup directory of any existing Drupal data
  #
  def clean
    @log.info("Cleaning working directory '#{@working_directory}'...")
    FileUtils.rm_f("#{@working_directory}/#{@backup.drupal_tar_name}")
    FileUtils.rm_f("#{@working_directory}/#{@backup.drupal_database_sql_dump_name}")
    @log.info("Completed clean of working directory '#{@working_directory}'.")
  end

  #
  # Delegate to the backup script to take a backup of the current Drupal environment
  #
  def take_backup_of_current_environment
    @backup.execute([])
  end

  #
  # Generates the data required by the Drupal image
  #
  def generate_drupal_data
    clean
    take_backup_of_current_environment
  end

  private :clean, :take_backup_of_current_environment

end

if $0 == __FILE__

  # drupal_directory, database_name, backup_directory, backup_strategy, process_runner
  backup_directory = '/backups'

  backup = Backup.new('/drupal','rhd_mysql',backup_directory, NullOpBackupStrategy.new, ProcessRunner.new)
  data_generator = DrupalDataGenerator.new(backup_directory, backup)
  data_generator.generate_drupal_data
end