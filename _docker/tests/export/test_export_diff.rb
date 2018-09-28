require 'minitest/autorun'
require 'mocha/mini_test'
require 'fileutils'

require_relative '../test_helper'
require_relative '../../lib/export/export_diff'


class TestExportDiff < MiniTest::Test

  def setup
    @example_sitemaps_dir = Dir.open(File.expand_path('test_export_diff',File.dirname(__FILE__))).path
    @export_dir = Dir.mktmpdir
    @export_archive_dir = Dir.mktmpdir

    @export_diff = RedhatDeveloper::Export::ExportDiff.new(@export_archive_dir)
  end

  def make_export_archives
    @first_export_archive = "#{@export_archive_dir}/export-2018-09-12-21-14-51"
    @second_export_archive = "#{@export_archive_dir}/export-2018-09-13-10-15-19"

    FileUtils.mkdir([@first_export_archive, @second_export_archive])
    FileUtils.cp("#{@example_sitemaps_dir}/sitemap-1.xml", "#{@first_export_archive}/sitemap.xml")
    FileUtils.cp("#{@example_sitemaps_dir}/sitemap-1.xml", "#{@second_export_archive}/sitemap.xml")
  end

  def make_current_sitemap(sitemap_file='sitemap-1.xml')
    FileUtils.cp("#{@example_sitemaps_dir}/#{sitemap_file}", "#{@export_dir}/sitemap.xml")
  end

  def test_cannot_perform_comparison_with_no_export_archives
    make_current_sitemap
    assert_equal([], @export_diff.modified_content_urls(@export_dir))
  end

  def test_cannot_perform_comparison_with_no_current_sitemap
      assert_equal([], @export_diff.modified_content_urls(@export_dir))
  end

  def test_no_urls_reported_when_all_modification_times_the_same
    make_current_sitemap
    make_export_archives

    assert_equal([], @export_diff.modified_content_urls(@export_dir))
  end

  def test_correctly_reports_modified_urls
    make_current_sitemap('sitemap-2.xml')
    make_export_archives

    urls = @export_diff.modified_content_urls(@export_dir)
    assert_equal(3, urls.size)
    assert(urls.include?('http://developers.redhat.com/articles/no-cost-rhel-faq'))
    assert(urls.include?('http://developers.redhat.com/about'))
    assert(urls.include?('http://developers.redhat.com/articles/rhel-what-you-need-to-know'))
  end

  def teardown
    FileUtils.rm_rf(@export_dir)
    FileUtils.rm_rf(@export_archive_dir)
  end

end