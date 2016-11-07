require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../lib/drupal-data/drupal_data_generator'
require_relative '../../../_docker/tests/test_helper'


class TestDrupalDataGenerator < Minitest::Test

  def setup
    @drupal_tar_name = 'drupal.tar.gz'
    @drupal_db_sql_dump = 'drupal.db.sql.gz'
    @backup = mock()
    @working_directory = File.expand_path(File.dirname(__FILE__)) + "/test-backup"
    @drupal_data_generator = DrupalDataGenerator.new(@working_directory, @backup)
  end

  def teardown
    FileUtils.rm_f("#{@working_directory}/#{@drupal_tar_name}")
    FileUtils.rm_f("#{@working_directory}/#{@drupal_db_sql_dump}")
  end

  def test_should_generate_new_backup

    FileUtils.touch("#{@working_directory}/#{@drupal_tar_name}")
    FileUtils.touch("#{@working_directory}/#{@drupal_db_sql_dump}")

    assert(File.exists?("#{@working_directory}/#{@drupal_tar_name}"))
    assert(File.exists?("#{@working_directory}/#{@drupal_db_sql_dump}"))

    @backup.expects(:drupal_tar_name).returns(@drupal_tar_name)
    @backup.expects(:drupal_database_sql_dump_name).returns(@drupal_db_sql_dump)
    @backup.expects(:execute).with([])

    @drupal_data_generator.generate_drupal_data

    refute(File.exists?("#{@working_directory}/#{@drupal_tar_name}"))
    refute(File.exists?("#{@working_directory}/#{@drupal_db_sql_dump}"))
  end

end