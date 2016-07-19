require 'fileutils'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../lib/export/export_archive_pruner'

class TestExportArchivePruner < MiniTest::Test

  def setup
    @export_directory = Dir.mktmpdir
    @export_archive_pruner = ExportArchivePruner.new(@export_directory, 1)
  end

  def teardown
    FileUtils.rm_rf(@export_directory)
  end

  def create_export_directory(export_name)
    directory_name = "#{@export_directory}/#{export_name}"
    FileUtils.mkdir_p(directory_name)
    directory_name
  end

  def test_should_clean_old_archives

    export_1 = create_export_directory('export-2016-07-10-12-34-16')
    export_2 = create_export_directory('export-2015-12-12-12-23-00')

    assert_equal(true, Dir.exist?(export_1))
    assert_equal(true, Dir.exist?(export_2))

    @export_archive_pruner.prune_export_archives

    assert_equal(true, Dir.exist?(export_1))
    assert_equal(false, Dir.exist?(export_2))
  end

  def test_should_ignore_non_archive_directories

    export_1 = create_export_directory('export-2016-07-10-12-34-16')
    export_2 = create_export_directory('export-2015-12-12-12-23-00')
    export_3 = create_export_directory('this-should-be-ignored')

    assert_equal(true, Dir.exist?(export_1))
    assert_equal(true, Dir.exist?(export_2))
    assert_equal(true, Dir.exist?(export_3))

    @export_archive_pruner.prune_export_archives

    assert_equal(true, Dir.exist?(export_1))
    assert_equal(true, Dir.exist?(export_3))
    assert_equal(false, Dir.exist?(export_2))
  end

  def test_should_remove_expected_amount_of_old_archives
    @export_archive_pruner.max_number_of_exports = 2

    export_1 = create_export_directory('export-2015-07-10-12-34-16')
    export_2 = create_export_directory('export-2015-08-12-12-23-00')
    export_3 = create_export_directory('export-2015-09-12-12-23-00')
    export_4 = create_export_directory('export-2015-10-12-12-23-00')
    export_5 = create_export_directory('export-2015-11-12-12-23-00')

    assert_equal(true, Dir.exist?(export_1))
    assert_equal(true, Dir.exist?(export_2))
    assert_equal(true, Dir.exist?(export_3))
    assert_equal(true, Dir.exist?(export_4))
    assert_equal(true, Dir.exist?(export_5))

    @export_archive_pruner.prune_export_archives

    assert_equal(false, Dir.exist?(export_1))
    assert_equal(false, Dir.exist?(export_2))
    assert_equal(false, Dir.exist?(export_3))
    assert_equal(true, Dir.exist?(export_4))
    assert_equal(true, Dir.exist?(export_5))
  end

end