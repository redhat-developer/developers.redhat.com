require 'fileutils'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/tests/test_helper'
require_relative '../../lib/export/static_export_rsync'

class TestStaticExportRsync < MiniTest::Test

  def setup
    @process_runner = mock()
    @empty_directory = Dir.mktmpdir
    @static_export_rsync = StaticExportRsync.new(@process_runner)
    @static_export_rsync.empty_directory = @empty_directory
  end

  def teardown
    FileUtils.rm_rf(@empty_directory)
  end

  def test_should_reject_invalid_rsync_target

    assert_raises(StandardError, "Rsync target '/export/foo' is not supported. Please use format: 'user@host:/target/directory'") {
      @static_export_rsync.rsync_static_export('/export/foo', '/bar')
    }
  end

  def test_should_not_create_directory_structure_if_nothing_to_create
    export_dir = '/export/drupal_8080'
    target_host = 'rhd@filemgnt.jboss.org'
    target_host_directory = 'rhd@filemgnt.jboss.org:/my/target/directory'

    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{export_dir}/ #{target_host_directory}")
    @static_export_rsync.rsync_static_export(export_dir, target_host_directory)
  end

  def test_should_fail_if_no_closing_directory_structure
    export_dir = '/export/drupal_8080'
    target_host = 'rhd@filemgnt.jboss.org'
    target_host_directory = 'rhd@filemgnt.jboss.org:/it-rhd-stg/stg_main[my/target/directory'

    assert_raises(StandardError,"You must enclose the path to be created with a trailing ']'") {
      @static_export_rsync.rsync_static_export(export_dir, target_host_directory)
    }
  end

  def test_should_fail_if_no_opening_directory_structure
    export_dir = '/export/drupal_8080'
    target_host = 'rhd@filemgnt.jboss.org'
    target_host_directory = 'rhd@filemgnt.jboss.org:/it-rhd-stg/stg_mainmy/target/directory]'

    assert_raises(StandardError,"You must enclose the path to be created with a preceeding '['") {
      @static_export_rsync.rsync_static_export(export_dir, target_host_directory)
    }
  end

  def test_fail_to_rsync_with_missing_slash_on_path_creation

    export_dir = '/export/drupal_8080'
    target_host = 'rhd@filemgnt.jboss.org'
    target_host_directory = 'rhd@filemgnt.jboss.org:/it-rhd-stg/stg_main[my/target/directory]'

    assert_raises(StandardError,"The path to create must start with a '/'. It is currently 'my/target/directory'") {
      @static_export_rsync.rsync_static_export(export_dir, target_host_directory)
    }
  end

  def test_should_rsync_and_create_partial_directory

    export_dir = '/export/drupal_8080'
    target_host = 'rhd@filemgnt.jboss.org'
    target_host_directory = 'rhd@filemgnt.jboss.org:/it-rhd-stg/stg_main[/my/target/directory]'

    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{@empty_directory}/ #{target_host}:/it-rhd-stg/stg_main/my")
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{@empty_directory}/ #{target_host}:/it-rhd-stg/stg_main/my/target")
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{@empty_directory}/ #{target_host}:/it-rhd-stg/stg_main/my/target/directory")
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{export_dir}/ #{target_host}:/it-rhd-stg/stg_main/my/target/directory")

    @static_export_rsync.rsync_static_export(export_dir, target_host_directory)


  end


  def test_rsync_and_create_full_directory_structure

    export_dir = '/export/drupal_8080'
    target_host = 'rhd@filemgnt.jboss.org'
    target_host_directory = 'rhd@filemgnt.jboss.org:[/my/target/directory]'

    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{@empty_directory}/ #{target_host}:/my")
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{@empty_directory}/ #{target_host}:/my/target")
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{@empty_directory}/ #{target_host}:/my/target/directory")
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{export_dir}/ #{target_host}:/my/target/directory")

    @static_export_rsync.rsync_static_export(export_dir, target_host_directory)

  end

end