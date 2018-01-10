require_relative '../test_helper'
require_relative '../../lib/export/export_inspector'
require 'fileutils'

class TestExportInspector < MiniTest::Test

  def setup
    @export_directory = Dir.mktmpdir
    @url_list = File.new(File.join(@export_directory, 'url-list.txt'), 'w+')

    links = <<EOD
http://developer-drupal.web.stage.ext.phx2.redhat.com/
http://developer-drupal.web.stage.ext.phx2.redhat.com/about
http://developer-drupal.web.stage.ext.phx2.redhat.com/events/devnation/2016
http://developer-drupal.web.stage.ext.phx2.redhat.com/community/contributor/signup
http://developer-drupal.web.stage.ext.phx2.redhat.com/articles/rhel-what-you-need-to-know
EOD

    @url_list.write links
    @url_list.flush
    @inspector = ExportInspector.new("#{File.dirname(__FILE__)}/test-critical-links.txt")
  end

  def teardown
    FileUtils.remove_entry_secure @export_directory
    ENV['drupal.export.fail_on_missing'] = nil
  end

  def test_should_not_fail_when_all_critical_links_present
    @inspector.verify_all_critical_pages!(@url_list)
  end

  def test_should_fail_if_there_are_missing_critical_links
    @inspector = ExportInspector.new("#{File.dirname(__FILE__)}/test-missing-critical-links.txt")

    assert_raises(StandardError, "The export list or sitemap.xml did not contain all critical pages. Missing critical pages  are [/products/the-null]. Failing export process.") {
      @inspector.verify_all_critical_pages!(@url_list)
    }
  end

  def test_all_pages_present_in_export
    # Go through and create the files that are expected
    expected_files = %w(index.html about/index.html events/devnation/2016/index.html community/contributor/signup/index.html articles/rhel-what-you-need-to-know/index.html)

    expected_files.each do |file|
      FileUtils.mkdir_p File.join(@export_directory, File.dirname(file))
      FileUtils.touch File.join(@export_directory, file)
    end

    assert_output("================================ EXPORT SUMMARY ================================\n") do
      @inspector.inspect_export @url_list, @export_directory
    end
  end

  def test_should_fail_when_pages_missing_from_export
    assert_raises(StandardError, "There are '5' pages missing from the site export (see warnings for missing content). Failing export process.") do
      @inspector.inspect_export(@url_list, @export_directory)
    end
  end

  def test_should_fail_when_pages_missing_and_override_empty
    ENV['drupal.export.fail_on_missing'] = ''
    assert_raises(StandardError, "There are '5' pages missing from the site export (see warnings for missing content). Failing export process.") do
      @inspector.inspect_export(@url_list, @export_directory)
    end
  end

  def test_should_fail_when_pages_missing_and_override_nil
    ENV['drupal.export.fail_on_missing'] = nil
    assert_raises(StandardError, "There are '5' pages missing from the site export (see warnings for missing content). Failing export process.") do
      @inspector.inspect_export(@url_list, @export_directory)
    end
  end


  def test_missing_pages_in_export_but_set_to_ignore
    expected_output = <<EOD
================================ EXPORT SUMMARY ================================
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/' at expected path: '#{@export_directory}/index.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/about' at expected path: '#{@export_directory}/about/index.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/events/devnation/2016' at expected path: '#{@export_directory}/events/devnation/2016/index.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/community/contributor/signup' at expected path: '#{@export_directory}/community/contributor/signup/index.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/articles/rhel-what-you-need-to-know' at expected path: '#{@export_directory}/articles/rhel-what-you-need-to-know/index.html'
WARNING: Of '5' pages, '5' are not found in the export.
EOD
    ENV['drupal.export.fail_on_missing'] = 'false'
    assert_output(expected_output) do
      @inspector.inspect_export(@url_list, @export_directory)
    end
  end
end
