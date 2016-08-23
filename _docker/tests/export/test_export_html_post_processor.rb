require 'minitest/autorun'
require 'mocha/mini_test'
require 'fileutils'
require 'nokogiri'


require_relative '../../lib/process_runner'
require_relative '../../lib/export/export_html_post_processor'
require_relative '../test_helper'

class TestExportHtmlPostProcessor < MiniTest::Test

  def setup
    @export_post_processor = ExportHtmlPostProcessor.new(ProcessRunner.new)
    @export_directory = Dir.mktmpdir
    test_export = Dir.open(File.expand_path('test_export_form_rewrite',File.dirname(__FILE__)))
    FileUtils.cp_r("#{test_export.path}/.", @export_directory)
  end

  def teardown
    FileUtils.rm_rf(@export_directory)
  end

  def get_html_document(html_document_name)
    containers_html = File.open(html_document_name) do | html_file |
      Nokogiri::HTML(html_file)
    end
  end

  def get_link_href(html_document, a_id)
    html_document.css("##{a_id}").first.attributes['href'].value
  end

  def get_form_action_url_from_html_doc(html_document, form_id)
    html_document.css("##{form_id}").first.attributes['action'].value
  end

  def test_should_rewrite_index_html_link

    @export_post_processor.post_process_html_export('docker', @export_directory)

    index_html = get_html_document("#{@export_directory}/index.html")
    assert_equal('./',get_link_href(index_html, 'home-link'))

    containers_html = get_html_document("#{@export_directory}/containers/index.html")
    assert_equal('../',get_link_href(containers_html, 'home-link'))

    containers_adoption_html = get_html_document("#{@export_directory}/containers/adoption/index.html")
    assert_equal('../../',get_link_href(containers_adoption_html, 'home-link'))
  end

  def should_remove_trailing_index_html_from_links

    @export_post_processor.post_process_html_export('docker', @export_directory)

    index_html = get_html_document("#{@export_directory}/index.html")
    assert_equal('containers/',get_link_href(index_html, 'containers-link'))

    containers_adoption_html = get_html_document("#{@export_directory}/containers/adoption/index.html")
    assert_equal('../../containers/',get_link_href(index_html, 'containers-link'))

  end


  def test_should_move_index_html_to_top_level_location

    assert(File.exist?("#{@export_directory}/index/index.html"))
    refute(File.exist?("#{@export_directory}/index.html"))

    @export_post_processor.post_process_html_export('docker', @export_directory)

    refute(File.exist?("#{@export_directory}/index/index.html"))
    assert(File.exist?("#{@export_directory}/index.html"))
  end


  def test_should_rewrite_form_action_ok_with_angular_links
    @export_post_processor.post_process_html_export('docker', @export_directory)
    containers_html = get_html_document("#{@export_directory}/containers/index.html")
    assert_equal('{{blah.test[0]}}',containers_html.css("#angular-link").first.attributes['ng-href'].value)
  end

  def test_should_rewrite_form_action_urls

    @export_post_processor.post_process_html_export('docker', @export_directory)

    index_html = get_html_document("#{@export_directory}/index.html")
    assert_equal('./search/',get_form_action_url_from_html_doc(index_html, 'modify'))

    containers_html = get_html_document("#{@export_directory}/containers/index.html")
    assert_equal('../search/',get_form_action_url_from_html_doc(containers_html, 'modify'))
    assert_equal('http://myotherhost.com/savemefromdocker', get_form_action_url_from_html_doc(containers_html,'no-modify'))

    nested_containers_html = get_html_document("#{@export_directory}/containers/adoption/index.html")
    assert_equal('../../search/',get_form_action_url_from_html_doc(nested_containers_html, 'modify'))
    assert_equal('http://myotherhost.com/savemefromdocker', get_form_action_url_from_html_doc(nested_containers_html,'no-modify'))

  end

end
