require 'minitest/autorun'
require 'mocha/mini_test'
require 'sawyer'
require 'ostruct'
require_relative '../_ext/jboss_developer'
require_relative 'test_helper.rb'
require 'logging'

class TestDrupal8Service < Minitest::Test

  Logging.init :trace, :debug, :verbose, :info, :warn, :error, :fatal
  $LOG = Logging.logger.new 'awestruct'
  $LOG.add_appenders(
      Logging.appenders.string_io({level: :info, layout: Logging.layouts.pattern(pattern: "%m\n"),
          color_scheme: :default})
  )
  $LOG.level = :debug


  def test_initialize
    # No drupal_base_url
    assert_raises RuntimeError do
      Aweplug::Helpers::Drupal8Service.default(OpenStruct.new)
    end

    # No env variables for user / password
    assert_raises RuntimeError do
      site = OpenStruct.new
      site.drupal_base_url = 'http://testing'

      ENV['drupal_user'] = nil
      ENV['drupal_password'] = 'blah'

      Aweplug::Helpers::Drupal8Service.default(site)
    end

    assert_raises RuntimeError do
      site = OpenStruct.new
      site.drupal_base_url = 'http://testing'

      ENV['drupal_user'] = 'blah'
      ENV['drupal_password'] = nil

      Aweplug::Helpers::Drupal8Service.default(site)
    end

  end

  def test_exists_good
    # Test for a page that does exist

    # Setup the service and the params for testing
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'

    # Setup the mock http call
    stub_exists_call_good

    assert service.exists?(page)
  end

  def test_exists_bad
    # Setup the service and the params for testing
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'

    stub_exists_call_bad

    refute service.exists?(page)
  end

  def test_create_page
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'
    page.title = 'Testing Service'
    page.description = 'Learn how to use the Testing Service'
    content = 'Hello World'

    # Setup the mock http call
    stub_exists_call_good

    stub_request(:post, 'http://testing/entity/node')
        .with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"full_html\"}],\"path\":{\"alias\":\"/article/testing-service\"},\"status\":[{\"value\":\"1\",\"lang\":\"en\"}]}",
             headers: {'Authorization' => 'Basic dGVzdGluZzp0ZXN0aW5n',
                       'Content-Type' => 'application/hal+json'})
        .to_return(status: 201)

    service.create_page page, content
  end

  def test_create_page_as_is_html
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'
    page.title = 'Testing Service'
    page.description = 'Learn how to use the Testing Service'
    page.drupal_format = 'as_is_html'
    content = 'Hello World'

    # Setup the mock http call
    stub_exists_call_good

    stub_request(:post, 'http://testing/entity/node')
        .with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"as_is_html\"}],\"path\":{\"alias\":\"/article/testing-service\"},\"status\":[{\"value\":\"1\",\"lang\":\"en\"}]}",
             headers: {'Authorization' => 'Basic dGVzdGluZzp0ZXN0aW5n',
                       'Content-Type' => 'application/hal+json'})
        .to_return(status: 201)

    service.create_page page, content
  end

  def test_update_page
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'
    page.title = 'Testing Service'
    page.description = 'Learn how to use the Testing Service'
    content = 'Hello World'

    # Setup the mock http call
    stub_exists_call_bad

    stub_request(:patch, 'http://testing/article/testing-service?_format=hal_json').
        with(:body => "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"full_html\"}],\"path\":{\"alias\":\"/article/testing-service\"},\"status\":[{\"value\":\"1\",\"lang\":\"en\"}]}",
             headers: {'Accept' => 'application/hal+json', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization' => 'Basic dGVzdGluZzp0ZXN0aW5n', 'Content-Type' => 'application/hal+json', 'User-Agent' => 'Faraday v0.9.2'}).
        to_return(status: 204)

    service.update_page(page, content)
  end

  def test_update_page_as_is_html
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'
    page.title = 'Testing Service'
    page.description = 'Learn how to use the Testing Service'
    page.drupal_format = 'as_is_html'
    content = 'Hello World'

    # Setup the mock http call
    stub_exists_call_bad

    stub_request(:patch, 'http://testing/article/testing-service?_format=hal_json').
        with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"as_is_html\"}],\"path\":{\"alias\":\"/article/testing-service\"},\"status\":[{\"value\":\"1\",\"lang\":\"en\"}]}",
             headers: {'Accept' => 'application/hal+json', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization' => 'Basic dGVzdGluZzp0ZXN0aW5n', 'Content-Type' => 'application/hal+json', 'User-Agent' => 'Faraday v0.9.2'}).
        to_return(status: 204)

    service.update_page(page, content)
  end

  def test_send_page_create
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'
    page.title = 'Testing Service'
    page.description = 'Learn how to use the Testing Service'
    content = 'Hello World'

    # Setup the mock http call
    stub_exists_call_bad

    stub_request(:post, 'http://testing/entity/node')
        .with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"full_html\"}],\"path\":{\"alias\":\"/article/testing-service\"},\"status\":[{\"value\":\"1\",\"lang\":\"en\"}]}",
              headers: {'Authorization' => 'Basic dGVzdGluZzp0ZXN0aW5n',
                        'Content-Type' => 'application/hal+json'})
        .to_return(status: 201)

    service.send_page(page, content)
  end

  def test_send_page_update
    service = setup_service
    page = OpenStruct.new
    page.output_path = '/article/testing-service/index.html'
    page.title = 'Testing Service'
    page.description = 'Learn how to use the Testing Service'
    page.input_mtime = Time.now
    content = 'Hello World'

    # Setup the mock http call
    stub_exists_call_good

    stub_request(:patch, 'http://testing/article/testing-service?_format=hal_json').
        with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"full_html\"}],\"path\":{\"alias\":\"/article/testing-service\"},\"status\":[{\"value\":\"1\",\"lang\":\"en\"}]}",
             headers: {'Accept' => 'application/hal+json', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization' => 'Basic dGVzdGluZzp0ZXN0aW5n', 'Content-Type' => 'application/hal+json', 'User-Agent' => 'Faraday v0.9.2'}).
        to_return(status: 204)

    service.send_page(page, content)
  end

  def test_send_page_bad

  end

  def setup_service
    return @service if @service

    # Set up data needed for the initialization of the class under test
    site = OpenStruct.new
    site.drupal_base_url = 'http://testing'
    site.base_url = 'http://testing'

    site.drupal_user = 'testing'
    site.drupal_password = 'testing'

    # Setup mocking HTTP requests for auth
    stub_request(:post, 'http://testing/user/login')
        .with(body: {'form_id' => 'user_login_form',
                     'name' => 'testing',
                     'pass' => 'testing'})
        .to_return(status: 200, body: '', headers: {'set-cookie' => 'session-cookie'})

    # Mocking for the token check
    stub_request(:get, 'http://testing/rest/session/token')
        .with(headers: {'Cookie'=>'session-cookie'})
    .to_return(status: 200, body: 'some-token')

    stub_request(:get, "http://testing/cron/rhd")
        .to_return(:status => 200, :body => "", :headers => {})

    stub_request(:get, "http://testing/sitemap.xml")
        .to_return(status: 200, body:
            "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:xhtml='http://www.w3.org/1999/xhtml'></urlset>",
                   :headers => {})

    @service = Aweplug::Helpers::Drupal8Service.new(site.to_h)
  end

  def stub_exists_call_good
    stub_request(:get, "http://testing/sitemap.xml")
      .to_return(status: 200, body:
"<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:xhtml='http://www.w3.org/1999/xhtml'>
  <url>
    <loc>http://developer-drupal.web.prod.ext.phx2.redhat.com/article/testing-service</loc>
    <priority>1</priority>
    <lastmod>2016-09-01T02:43:43-07:00</lastmod>
  </url>
</urlset>", :headers => {})
  end

  def stub_exists_call_bad
    stub_request(:get, "http://testing/sitemap.xml")
        .to_return(status: 200, body:
            "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9' xmlns:xhtml='http://www.w3.org/1999/xhtml'>
  <url>
    <loc>http://developer-drupal.web.prod.ext.phx2.redhat.com/</loc>
    <priority>1</priority>
    <lastmod>2016-09-01T02:43:43-07:00</lastmod>
  </url>
</urlset>", :headers => {})
  end

  private :setup_service, :stub_exists_call_good, :stub_exists_call_bad
end
