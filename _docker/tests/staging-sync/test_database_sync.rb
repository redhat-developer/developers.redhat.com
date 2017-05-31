require 'tmpdir'
require 'fileutils'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../lib/staging-sync/database_sync'
require_relative '../test_helper'

module RedhatDeveloper
  module StagingSync
    class TestDatabaseSync < MiniTest::Test

      def setup
        @backup_directory = Dir.mktmpdir
        @process_runner = mock()
        @database_sync = RedhatDeveloper::StagingSync::DatabaseSync.new(@backup_directory,'/drupal-db.sql.gz',@process_runner)
      end

      def teardown
        FileUtils.rm_rf(@backup_directory)
      end

      def test_should_correctly_sync_database
        refute(File.exist?("#{@backup_directory}/drupal-db.sync.sql.gz"))

        @process_runner.expects(:execute!).with("mysqldump rhd_mysql | gzip > #{@backup_directory}/drupal-db.sync.sql.gz")
        @process_runner.expects(:execute!).with('mysql -e \'drop database if exists rhd_mysql;create database rhd_mysql\'')
        @process_runner.expects(:execute!).with('gunzip -c /drupal-db.sql.gz | mysql rhd_mysql')

        @database_sync.sync_database
      end

      def test_should_correctly_sync_database_and_move_existing_backup
        FileUtils.touch("#{@backup_directory}/drupal-db.sync.sql.gz")
        assert(File.exist?("#{@backup_directory}/drupal-db.sync.sql.gz"))

        @process_runner.expects(:execute!).with("mysqldump rhd_mysql | gzip > #{@backup_directory}/drupal-db.sync.sql.gz")
        @process_runner.expects(:execute!).with('mysql -e \'drop database if exists rhd_mysql;create database rhd_mysql\'')
        @process_runner.expects(:execute!).with('gunzip -c /drupal-db.sql.gz | mysql rhd_mysql')

        @database_sync.sync_database

        refute(File.exist?("#{@backup_directory}/drupal-db.sync.sql.gz"))
        assert(File.exist?("#{@backup_directory}/drupal-db.sync.sql.gz.old"))
      end

    end
  end
end
