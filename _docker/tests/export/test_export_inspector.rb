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
    @inspector = ExportInspector.new
  end

  def teardown
    FileUtils.remove_entry_secure @export_directory
  end

  def test_all_links_are_valid
    # Go through and create the files that are expected
    expected_files = %w(index.html about.html events/devnation/2016.html community/contributor/signup.html articles/rhel-what-you-need-to-know.html)

    expected_files.each do |file|
      FileUtils.mkdir_p File.join(@export_directory, File.dirname(file))
      FileUtils.touch File.join(@export_directory, file)
    end

    assert_output("================================ EXPORT SUMMARY ================================\n") do
      @inspector.inspect_export @url_list, @export_directory
    end
  end

  def test_no_links_are_valid
    expected_output = <<EOD
================================ EXPORT SUMMARY ================================
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/' at expected path: '#{@export_directory}/index.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/about' at expected path: '#{@export_directory}/about.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/events/devnation/2016' at expected path: '#{@export_directory}/events/devnation/2016.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/community/contributor/signup' at expected path: '#{@export_directory}/community/contributor/signup.html'
WARNING: Cannot locate export of 'http://developer-drupal.web.stage.ext.phx2.redhat.com/articles/rhel-what-you-need-to-know' at expected path: '#{@export_directory}/articles/rhel-what-you-need-to-know.html'
WARNING: Of '5' pages, '5' are not found in the export.
EOD
    assert_output(expected_output) do
      @inspector.inspect_export @url_list, @export_directory
    end
  end
end