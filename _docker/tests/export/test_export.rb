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
    @export = Export.new(@drupal_host, @export_directory, @cron_invoker, @page_url_list_generator, @export_strategy)
  end

  def test_export

    url_list_file = mock()

    @cron_invoker.expects(:invoke_cron!)
    @page_url_list_generator.expects(:generate_page_url_list!).returns(url_list_file)
    @export_strategy.expects(:export!).with(url_list_file, @drupal_host, @export_directory)

    @export.export!
  end

end