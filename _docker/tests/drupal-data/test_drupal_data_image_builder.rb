require 'minitest/autorun'
require 'mocha/mini_test'
require 'fileutils'

require_relative '../../../_docker/tests/test_helper'
require_relative '../../lib/drupal-data/drupal_data_image_builder'

class TestDrupalDataImageBuilder < Minitest::Test

  def setup
    @working_directory = File.expand_path(File.dirname(__FILE__)) + "/test-backup"
    @process_runner = mock()
    @drupal_data_image_builder = DrupalDataImageBuilder.new(@working_directory, @process_runner)
  end

  def teardown
    FileUtils.rm_f("#{@working_directory}/drupal-filesystem.tar.gz")
    FileUtils.rm_f("#{@working_directory}/drupal-db.sql.gz")
  end


  def test_should_fail_if_missing_filesystem_dump

    FileUtils.touch("#{@working_directory}/drupal-db.sql.gz")

    @process_runner.expects(:execute!).with("cd #{@working_directory} && docker-compose run --rm drupal_data_generator")

    assert_raises(StandardError, "Cannot locate both 'drupal-filesystem.tar.gz' and 'drupal-db.sql.gz' in directory '#{@working_directory}'."){
      @drupal_data_image_builder.build_and_push_docker_image(456)
    }

  end

  def test_should_fail_if_missing_db_dump

    FileUtils.touch("#{@working_directory}/drupal-filesystem.tar.gz")

    @process_runner.expects(:execute!).with("cd #{@working_directory} && docker-compose run --rm drupal_data_generator")

    assert_raises(StandardError, "Cannot locate both 'drupal-filesystem.tar.gz' and 'drupal-db.sql.gz' in directory '#{@working_directory}'."){
      @drupal_data_image_builder.build_and_push_docker_image(456)
    }
  end

  def test_should_create_and_push_image

    FileUtils.touch("#{@working_directory}/drupal-db.sql.gz")
    FileUtils.touch("#{@working_directory}/drupal-filesystem.tar.gz")

    @process_runner.expects(:execute!).with("cd #{@working_directory} && docker-compose run --rm drupal_data_generator")
    @process_runner.expects(:execute!).with("cd #{@working_directory} && docker build -t redhatdeveloper/drupal-data:latest -t redhatdeveloper/drupal-data:456 .")
    @process_runner.expects(:execute!).with('docker push redhatdeveloper/drupal-data:latest')
    @process_runner.expects(:execute!).with('docker push redhatdeveloper/drupal-data:456')
    @process_runner.expects(:execute!).with('docker rmi redhatdeveloper/drupal-data:latest redhatdeveloper/drupal-data:456')

    @drupal_data_image_builder.build_and_push_docker_image(456)
  end

end