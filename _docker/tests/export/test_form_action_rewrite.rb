require 'minitest/autorun'
require 'mocha/mini_test'
require 'fileutils'
require 'nokogiri'

require_relative '../../lib/export/form_action_rewrite'
require_relative '../test_helper'

class TestFormActionRewrite < MiniTest::Test

  def setup
    @form_action_rewrite = FormActionRewrite.new
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

  def get_form_action_url_from_html_doc(html_document, form_id)
    html_document.css("##{form_id}").first.attributes['action'].value
  end

  def test_should_rewrite_ok_with_angular_links
    @form_action_rewrite.rewrite_form_target_urls('docker',@export_directory)
    containers_html = get_html_document("#{@export_directory}/containers.html")
    assert_equal('{{blah.test[0]}}',containers_html.css("#angular-link").first.attributes['ng-href'].value)
  end

  def test_should_rewrite_form_action_urls

    @form_action_rewrite.rewrite_form_target_urls('docker',@export_directory)

    containers_html = get_html_document("#{@export_directory}/containers.html")
    assert_equal('search.html',get_form_action_url_from_html_doc(containers_html, 'modify'))
    assert_equal('http://myotherhost.com/savemefromdocker', get_form_action_url_from_html_doc(containers_html,'no-modify'))

    nested_containers_html = get_html_document("#{@export_directory}/nested_directory/more-containers.html")
    assert_equal('../search.html',get_form_action_url_from_html_doc(nested_containers_html, 'modify'))
    assert_equal('http://myotherhost.com/savemefromdocker', get_form_action_url_from_html_doc(nested_containers_html,'no-modify'))

  end

end
