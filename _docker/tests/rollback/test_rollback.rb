require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../lib/rollback/rollback'

class TestRollback < MiniTest::Test

  def setup
    @export_archiver = mock()
    @static_export_rsync = mock()
    @rollback = Rollback.new(@export_archiver, @static_export_rsync)
  end

  def test_should_perform_rollback
    export_name = 'my-export'
    export_path = '/exports/export-archives/my-export'
    rsync_location = 'rhd@filemgmt.jboss.org:/foo/bar'

    @export_archiver.expects(:get_archive_path).with(export_name).returns(export_path)
    @static_export_rsync.expects(:rsync_static_export).with(export_path, rsync_location, false)
    @rollback.rollback!(export_name, rsync_location)
  end

  def test_command_line_arg_when_nil
    assert_equal(true, is_command_line_arg_empty(nil))
  end

  def test_command_line_arg_when_empty
    assert_equal(true, is_command_line_arg_empty(''))
  end

  def test_command_line_arg_when_neither_nil_or_empty
    assert_equal(false, is_command_line_arg_empty('foo'))
  end

end