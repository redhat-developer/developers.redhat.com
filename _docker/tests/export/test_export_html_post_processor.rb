require 'minitest/autorun'
require 'mocha/mini_test'
require 'fileutils'
require 'nokogiri'

require_relative '../../lib/process_runner'
require_relative '../../lib/export/export_html_post_processor'
require_relative '../test_helper'

class TestExportHtmlPostProcessor < MiniTest::Test

  def setup
    @export_directory = Dir.mktmpdir
    test_export = Dir.open(File.expand_path('test_export_form_rewrite',File.dirname(__FILE__)))
    FileUtils.cp_r("#{test_export.path}/.", @export_directory)

    test_static_resources = File.expand_path('test_static_resources',File.dirname(__FILE__))
    @export_post_processor = ExportHtmlPostProcessor.new(ProcessRunner.new, test_static_resources)
  end

  def teardown
    FileUtils.rm_rf(@export_directory)
    ENV['drupal.export.final_base_url'] = nil
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

  def test_should_copy_static_resources
    @export_post_processor.post_process_html_export('docker', @export_directory)
    assert(File.exist?("#{@export_directory}/robots.txt"))
    assert(File.exist?("#{@export_directory}/.htaccess"))
    assert(File.exist?("#{@export_directory}/nested/nested-file.txt"))
  end

  def test_should_copy_static_resources_into_existing_directory
    FileUtils.mkdir("#{@export_directory}/nested")
    assert(File.exist?("#{@export_directory}/nested"))

    @export_post_processor.post_process_html_export('docker', @export_directory)
    assert(File.exist?("#{@export_directory}/robots.txt"))
    assert(File.exist?("#{@export_directory}/.htaccess"))
    assert(File.exist?("#{@export_directory}/nested/nested-file.txt"))
  end

  def test_shouldnot_rewrite_access_redhat_com_documentation_links
    @export_post_processor.post_process_html_export('docker', @export_directory)

    index_html = get_html_document("#{@export_directory}/index.html")
    assert_equal('https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html/Software_Collections_Guide',get_link_href(index_html, 'documentation'))
    assert_equal('https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html/Software_Collections_Guide/',get_link_href(index_html, 'documentation-trailing-slash'))
    assert_equal('https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html/Software_Collections_Guide#foobar',get_link_href(index_html, 'documentation-with-anchor'))
    assert_equal('https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html/Software_Collections_Guide/mypage.html', get_link_href(index_html, 'documentation-with-html'))
    assert_equal('https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html/Software_Collections_Guide/my.epub', get_link_href(index_html, 'documentation-with-epub'))
    assert_equal('https://access.redhat.com/documentation/en-US/Red_Hat_Developer_Toolset/1/html/Software_Collections_Guide/my.pdf', get_link_href(index_html, 'documentation-with-pdf'))
    assert_equal('https://access.redhat.com/security', get_link_href(index_html, 'not-documentation'))
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

  def test_should_not_rewrite_keycloak_src
    @export_post_processor.post_process_html_export('docker', @export_directory)
    homepage_html = get_html_document("#{@export_directory}/homepage/index.html")

    keycloak_include = homepage_html.css('script#keycloak')
    assert_equal(keycloak_include.attr('src').text, '/auth/js/keycloak.js')
  end

  def test_should_rewrite_404_error_page_to_user_supplied_value_if_present
    ENV['drupal.export.final_base_url'] = 'https://developers.stage.redhat.com'
    @export_post_processor.post_process_html_export('docker', @export_directory)

    error_page = get_html_document("#{@export_directory}/404-error/index.html")
    assert_equal('https://developers.stage.redhat.com/',get_link_href(error_page, 'home-link'))

    containers_page = get_html_document("#{@export_directory}/containers/index.html")
    assert_equal('../', get_link_href(containers_page, 'home-link'))
  end

  def test_should_rewrite_404_error_page
    @export_post_processor.post_process_html_export('docker', @export_directory)

    error_page = get_html_document("#{@export_directory}/404-error/index.html")
    assert_equal('https://developers.redhat.com/',get_link_href(error_page, 'home-link'))

    containers_page = get_html_document("#{@export_directory}/containers/index.html")
    assert_equal('../', get_link_href(containers_page, 'home-link'))
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

  def test_should_remove_drupal_host_identifying_markup

    page_with_drupal_markup = get_html_document("#{@export_directory}/remove-drupal-url/index.html")
    drupal_elements = page_with_drupal_markup.css('link[rel="shortlink"],link[rel="revision"],meta[name="Generator"]')
    assert(drupal_elements.size > 0)

    @export_post_processor.post_process_html_export('docker', @export_directory)

    page_with_drupal_markup = get_html_document("#{@export_directory}/remove-drupal-url/index.html")
    drupal_elements = page_with_drupal_markup.css('link[rel="shortlink"],link[rel="revision"],meta[name="Generator"]')
    assert_equal(0, drupal_elements.size)
  end

  def test_should_remove_all_drupal_host_references_from_markup
    test_page = get_html_document("#{@export_directory}/drupal-host-leak/index.html")
    assert test_page.to_s.include? 'rhdp-drupal.redhat.com'

    stub_request(:get, 'http://rhdp-drupal.redhat.com/sites/default/files/styles/share/public/share-image-homepage.png').
        to_return(status: 200, body: "", headers: {})

    @export_post_processor.post_process_html_export('rhdp-drupal.redhat.com', @export_directory)
    test_page = get_html_document("#{@export_directory}/drupal-host-leak/index.html")
    refute test_page.to_s.include? 'rhdp-drupal.redhat.com'

    assert_requested(:get, 'http://rhdp-drupal.redhat.com/sites/default/files/styles/share/public/share-image-homepage.png')
  end
end