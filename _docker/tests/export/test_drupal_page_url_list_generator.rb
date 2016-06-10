require 'fileutils'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/tests/test_helper'
require_relative '../../lib/export/drupal_page_url_list_generator'

class TestDrupalPageUrlListGenerator < Minitest::Test

  def setup
    @export_directory = Dir.mktmpdir
    @drupal_endpoint = '192.168.99.100:32769'
    @drupal_page_list_url_generator = DrupalPageUrlListGenerator.new(@drupal_endpoint, @export_directory)
  end

  def teardown
    FileUtils.rm_r(@export_directory)
  end

  def test_should_download_parse_and_generate_links_file

    sitemap_contents = mock()
    sitemap_contents.expects(:code).returns(200)
    sitemap_contents.expects(:body).returns(File.open(File.expand_path('sitemap.xml',File.dirname(__FILE__))).read)

    Net::HTTP.expects(:get_response).with do | url |
      assert_equal('http://192.168.99.100:32769/sitemap.xml', url.to_s)
    end.returns(sitemap_contents)

    @drupal_page_list_url_generator.generate_page_url_list!

    lines = File.readlines("#{@export_directory}/url-list.txt")
    assert_equal(8, lines.length)
    lines.each do | line |
      assert(line.start_with?('http://192.168.99.100:32769/'))
    end

    assert_equal(lines.last, "http://192.168.99.100:32769/robots.txt\n")

  end

  def test_should_raise_error_if_fails_to_download
    sitemap_contents = mock()
    sitemap_contents.expects(:code).returns(403).twice

    Net::HTTP.expects(:get_response).with do | url |
      assert_equal('http://192.168.99.100:32769/sitemap.xml', url.to_s)
    end.returns(sitemap_contents)

    assert_raises(StandardError) {
          @drupal_page_list_url_generator.generate_page_url_list!
    }

  end

  def test_should_not_raise_error_on_invalid_xml
    sitemap_contents = mock()
    sitemap_contents.expects(:code).returns(200)
    sitemap_contents.expects(:body).returns(File.open(File.expand_path('invalid-sitemap.xml',File.dirname(__FILE__))).read)

    Net::HTTP.expects(:get_response).with do | url |
      assert_equal('http://192.168.99.100:32769/sitemap.xml', url.to_s)
    end.returns(sitemap_contents)

    @drupal_page_list_url_generator.generate_page_url_list!
  end

end