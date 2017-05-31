require 'fileutils'
require_relative '../process_runner'
require_relative '../default_logger'

module RedhatDeveloper
  module StagingSync

    #
    # This class syncs the staging database with a latest production database dump. First it takes a backup of the
    # current database. It then drops and re-creates the database before finally importing the current production
    # database dump.
    #
    # @author rblake@redhat.com
    class DatabaseSync

      def initialize(backup_directory, production_db_gzip_dump, process_runner, database_name = 'rhd_mysql')
        @backup_directory = backup_directory
        @database_gzip_dump_location = production_db_gzip_dump
        @process_runner = process_runner
        @database_name = database_name
        @log = DefaultLogger.logger
      end

      #
      # Syncs the current production database dump into the configured database
      #
      def sync_database
        backup_existing_database
        drop_and_recreate_database
        import_production_database
      end

      private

      #
      # Takes a backup of the existing database so that we can restore if we need to
      #
      def backup_existing_database
        database_backup_name = "#{@backup_directory}/drupal-db.sync.sql.gz"
        FileUtils.mv(database_backup_name, "#{database_backup_name}.old") if File.exist?(database_backup_name)
        @log.info("Backing up current database to '#{database_backup_name}'...")
        @process_runner.execute!("mysqldump #{@database_name} | gzip > #{database_backup_name}")
        @log.info('Completed backup of current database.')
      end

      #
      # Drops the current database and then immediately recreates it so that we can perform the import of content
      #
      def drop_and_recreate_database
        @log.info("Dropping and re-creating database '#{@database_name}'...")
        @process_runner.execute!("mysql -e 'drop database if exists #{@database_name};create database #{@database_name}'")
        @log.info("Successfully dropped and re-created database '#{@database_name}'.")
      end

      #
      # Imports the production database dump into the current empty database
      #
      def import_production_database
        @log.info("Importing production database dump from #{@database_gzip_dump_location} to database #{@database_name}. This may take a while...")
        @process_runner.execute!("gunzip -c #{@database_gzip_dump_location} | mysql #{@database_name}")
        @log.info("Successfully imported database dump from #{@database_gzip_dump_location} to database #{@database_name}.")
      end
    end
  end
end
