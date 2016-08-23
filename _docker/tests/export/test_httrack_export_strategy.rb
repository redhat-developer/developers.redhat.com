require 'fileutils'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/tests/test_helper'
require_relative '../../lib/export/httrack_export_strategy'

class TestHttrackExportStrategy < MiniTest::Test

  def setup

    @drupal_host = 'drupal:8080'
    @export_directory = Dir.mktmpdir
    @process_runner = mock()
    @export_inspector = mock()
    @export_post_processor = mock()
    @httrack_export_strategy = HttrackExportStrategy.new(@process_runner, @export_inspector, @export_post_processor)
    @url_list_file = File.open("#{@export_directory}/url-list.txt", 'w')

  end

  def teardown
    FileUtils.rm_rf(@export_directory)
  end


  def test_should_run_first_time_export

    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)

  end

  def test_should_update_existing_export

    Dir.mkdir("#{@export_directory}/hts-cache")
    FileUtils.touch("#{@export_directory}/hts-cache/doit.log")

    @process_runner.expects(:execute!).with("cd #{@export_directory} && httrack --update")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
  end

  def test_should_run_first_time_export_with_no_host_port
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://developer-drupal.web.stage.ext.phx2.redhat.com*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t")
    @export_post_processor.expects(:post_process_html_export).with('developer-drupal.web.stage.ext.phx2.redhat.com', "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'developer-drupal.web.stage.ext.phx2.redhat.com', @export_directory)
    assert_equal("#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com", export_dir)
  end

  def test_should_update_existing_export_with_no_host_port

    Dir.mkdir("#{@export_directory}/hts-cache")
    FileUtils.touch("#{@export_directory}/hts-cache/doit.log")

    @process_runner.expects(:execute!).with("cd #{@export_directory} && httrack --update")
    @export_post_processor.expects(:post_process_html_export).with('developer-drupal.web.stage.ext.phx2.redhat.com', "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'developer-drupal.web.stage.ext.phx2.redhat.com', @export_directory)
    assert_equal("#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com", export_dir)

  end
end