require 'fileutils'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../lib/export/export_archiver'

class TestExportArchiver < MiniTest::Test

  def setup
    @export_directory = Dir.mktmpdir
    @export_archiver = ExportArchiver.new(@export_directory)
  end

  def teardown
    FileUtils.rm_rf(@export_directory)
  end

  def get_archive_name(archive_directory)
    last_slash = archive_directory.rindex('/') + 1
    archive_directory[last_slash..archive_directory.length]
  end

  def test_archive_exists

    test_export = Dir.open('test_export')
    export_archive = @export_archiver.archive_site_export(test_export.path)
    export_name = get_archive_name(export_archive)

    assert_equal(true, @export_archiver.archive_exist?(export_name))
  end

  def test_archive_exists_but_empty_directory

    test_export = Dir.open('test_export')
    export_archive = @export_archiver.archive_site_export(test_export.path)

    Dir.entries(export_archive).each do | file |
      if file.end_with?('.html')
        FileUtils.rm_f("#{export_archive}/#{file}")
      end
    end

    export_name = get_archive_name(export_archive)
    assert_equal(false, @export_archiver.archive_exist?(export_name))

  end

  def test_archive_exists_but_missing_index_dot_html

    test_export = Dir.open('test_export')
    export_archive = @export_archiver.archive_site_export(test_export.path)

    Dir.entries(export_archive).each do | file |
      if file.end_with?('index.html')
        FileUtils.rm_f("#{export_archive}/#{file}")
      end
    end

    export_name = get_archive_name(export_archive)
    assert_equal(false, @export_archiver.archive_exist?(export_name))
  end

  def test_archive_does_not_exist
    assert_equal(false, @export_archiver.archive_exist?('archive-123'))
  end


  def test_should_copy_export_to_archive

    test_export = Dir.open('test_export')
    @export_archiver.archive_site_export(test_export.path)

    export_archive = Dir.entries(@export_directory).select do | file |
      file.start_with?('export')
    end[0]

    assert_equal(false, export_archive.nil?)

    copied_files = Dir.entries("#{@export_directory}/#{export_archive}").select do | file |
      file.end_with?('.html')
    end

    assert_equal(2, copied_files.length)
    copied_files.sort!

    assert_equal('containers.html', copied_files[0])
    assert_equal('index.html', copied_files[1])

  end

end