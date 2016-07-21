require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/lib/export/export'
require_relative '../../../_docker/tests/test_helper'

class TestExport < MiniTest::Test

  def setup
    @drupal_host = 'drupal:8080'
    @export_directory = '/export'
    @cron_invoker = mock()
    @page_url_list_generator = mock()
    @export_strategy = mock()
    @rsync_handler = mock()
    @rsync_destination = 'foo@bar:/my/export'
    @export = Export.new(@drupal_host, @export_directory, @cron_invoker, @page_url_list_generator, @export_strategy, @rsync_handler, @rsync_destination)
  end

  def test_export

    url_list_file = mock()

    @cron_invoker.expects(:invoke_cron!)
    @page_url_list_generator.expects(:generate_page_url_list!).returns(url_list_file)
    @page_url_list_generator.expects(:fetch_sitemap_contents)
    @page_url_list_generator.expects(:save_sitemap).with(nil, '/export/foo/sitemap.xml')
    @export_strategy.expects(:export!).with(url_list_file, @drupal_host, @export_directory).returns('/export/foo')
    @rsync_handler.expects(:rsync_static_export).with('/export/foo', @rsync_destination, true)

    @export.export!
  end

  def test_export_with_no_rsync_location
    @export = Export.new(@drupal_host, @export_directory, @cron_invoker, @page_url_list_generator, @export_strategy, @rsync_handler, nil)

    url_list_file = mock()

    @cron_invoker.expects(:invoke_cron!)
    @page_url_list_generator.expects(:generate_page_url_list!).returns(url_list_file)
    @page_url_list_generator.expects(:fetch_sitemap_contents)
    @page_url_list_generator.expects(:save_sitemap).with(nil, '/export/foo/sitemap.xml')
    @export_strategy.expects(:export!).with(url_list_file, @drupal_host, @export_directory).returns('/export/foo')
    @rsync_handler.expects(:rsync_static_export).with('/export/foo', @rsync_destination).never

    @export.export!
  end


end