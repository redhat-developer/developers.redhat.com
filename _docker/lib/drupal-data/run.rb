require_relative '../../lib/process_runner'
require_relative '../../lib/backup/backup'
require_relative 'drupal_data_generator'
require_relative 'null_op_backup_strategy'

# drupal_directory, database_name, backup_directory, backup_strategy, process_runner
backup_directory = '/backups'

backup = Backup.new('/drupal','rhd_mysql',backup_directory, NullOpBackupStrategy.new, ProcessRunner.new)
data_generator = DrupalDataGenerator.new(backup_directory, backup)
data_generator.generate_drupal_data