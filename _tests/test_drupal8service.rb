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
        .with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"full_html\"}],\"path\":{\"alias\":\"/article/testing-service\"}}",
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
        .with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"as_is_html\"}],\"path\":{\"alias\":\"/article/testing-service\"}}",
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

    stub_request(:get, 'http://testing/article/testing-service?_format=hal_json').
        with(:headers => {'Accept'=>'application/json,application/hal+json', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization'=>'Basic dGVzdGluZzp0ZXN0aW5n', 'Content-Type'=>'application/json', 'Cookie'=>'session-cookie', 'User-Agent'=>'Faraday v0.9.2', 'X-Csrf-Token'=>'some-token'}).
        to_return(:status => 200, :body => get_hal_json, :headers => {})

    return_json = JSON.parse get_hal_json
    return_json['body'].first['value'] = 'Hello World'
    return_json['body'].first['summary'] = 'Learn how to use the Testing Service'
    return_json.delete 'changed'
    return_json.delete 'revision_timestamp'
    return_json['_embedded'].delete (return_json['_embedded'].keys.find {|k| k.include? 'revision_uid'})

    stub_request(:patch, 'http://testing/node/1745?_format=hal_json').
        with(body: return_json.to_json,
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

    stub_request(:get, 'http://testing/article/testing-service?_format=hal_json').
        with(:headers => {'Accept'=>'application/json,application/hal+json', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization'=>'Basic dGVzdGluZzp0ZXN0aW5n', 'Content-Type'=>'application/json', 'Cookie'=>'session-cookie', 'User-Agent'=>'Faraday v0.9.2', 'X-Csrf-Token'=>'some-token'}).
        to_return(:status => 200, :body => get_hal_json, :headers => {})

    return_json = JSON.parse get_hal_json
    return_json['body'].first['value'] = 'Hello World'
    return_json['body'].first['summary'] = 'Learn how to use the Testing Service'
    return_json.delete 'changed'
    return_json.delete 'revision_timestamp'
    return_json['_embedded'].delete (return_json['_embedded'].keys.find {|k| k.include? 'revision_uid'})

    stub_request(:patch, 'http://testing/node/1745?_format=hal_json').
        with(body: return_json.to_json,
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
        .with(body: "{\"title\":[{\"value\":\"Testing Service\"}],\"_links\":{\"type\":{\"href\":\"http://testing/rest/type/node/page\"}},\"body\":[{\"value\":\"Hello World\",\"summary\":\"Learn how to use the Testing Service\",\"format\":\"full_html\"}],\"path\":{\"alias\":\"/article/testing-service\"}}",
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

    stub_request(:get, 'http://testing/article/testing-service?_format=hal_json').
        with(:headers => {'Accept'=>'application/json,application/hal+json', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization'=>'Basic dGVzdGluZzp0ZXN0aW5n', 'Content-Type'=>'application/json', 'Cookie'=>'session-cookie', 'User-Agent'=>'Faraday v0.9.2', 'X-Csrf-Token'=>'some-token'}).
        to_return(:status => 200, :body => get_hal_json, :headers => {})

    return_json = JSON.parse get_hal_json
    return_json['body'].first['value'] = "Hello World"
    return_json['body'].first['summary'] = "Learn how to use the Testing Service"
    return_json.delete 'changed'
    return_json.delete 'revision_timestamp'
    return_json['_embedded'].delete (return_json['_embedded'].keys.find {|k| k.include? 'revision_uid'})

    stub_request(:patch, 'http://testing/node/1745?_format=hal_json').
        with(body: return_json.to_json,
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

  def get_hal_json
    '{"_links":{"self":{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/?_format=hal_json"},"type":{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/type\/node\/page"},"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/relation\/node\/page\/uid":[{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/user\/1?_format=hal_json","lang":"en"}],"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/relation\/node\/page\/revision_uid":[{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/user\/1?_format=hal_json"}],"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/relation\/node\/page\/workspace":[{"href":""}]},"nid":[{"value":"1745"}],"uuid":[{"value":"7dd79368-e1fc-48ba-aee6-ee373a02f039"}],"vid":[{"value":"2643015"}],"langcode":[{"value":"en","lang":"en"}],"type":[{"target_id":"page"}],"title":[{"value":"Red Hat Developers","lang":"en"}],"_embedded":{"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/relation\/node\/page\/uid":[{"_links":{"self":{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/user\/1?_format=hal_json"},"type":{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/type\/user\/user"}},"uuid":[{"value":"7b50228e-4875-4809-b455-4c94b6b0a8cd"}],"lang":"en"}],"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/relation\/node\/page\/revision_uid":[{"_links":{"self":{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/user\/1?_format=hal_json"},"type":{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/type\/user\/user"}},"uuid":[{"value":"7b50228e-4875-4809-b455-4c94b6b0a8cd"}]}],"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/relation\/node\/page\/workspace":[{"_links":{"self":{"href":""},"type":{"href":"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/rest\/type\/workspace\/basic"}},"uuid":[{"value":"8f1ee5d6-1496-4b89-8341-0dcb8491969a"}]}]},"status":[{"value":"1","lang":"en"}],"created":[{"value":"1472625506","lang":"en"}],"changed":[{"value":"1476298266","lang":"en"}],"promote":[{"value":"0"}],"sticky":[{"value":"0","lang":"en"}],"revision_timestamp":[{"value":"1472625506"}],"revision_translation_affected":[{"value":"1","lang":"en"}],"default_langcode":[{"value":"1","lang":"en"}],"_deleted":[{"value":"0","lang":"en"}],"_rev":[{"value":"129-797fdec4b38ad6f1460c335f77b8fc90","lang":"en"}],"body":[{"value":"<section class=\"homepage-main\"><div class=\"row\">\n<div class=\"large-13 columns homepage-cta\">\n<h2>Build It Better<\/h2>\n<h4>Get the<\/h4>\n<h3>Linux Commands<br> Cheatsheet<\/h3>\n<a class=\"button inverse\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/promotions\/linux-cheatsheet\">Download Cheatsheet<\/a>\n<\/div>\n<div class=\"large-8 columns homepage-getstarted\"><div class=\"row\"><div class=\"large-24 medium-12 columns\">\n<h4 class=\"caps\">Get the Others<\/h4>\n<ul>\n<li><a href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/promotions\/linux-cheatsheet\">Linux Cheat Sheet<\/a><\/li>\n<li><a href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/promotions\/docker-cheatsheet\">Container Cheat Sheet<\/a><\/li>\n<li><a href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/promotions\/mongodb-cheatsheet\">MongoDB Cheat Sheet<\/a><\/li>\n<\/ul>\n<\/div><\/div><\/div>\n<\/div><\/section><div class=\"spotlights-wrap\"><div class=\"row\"><div class=\"large-24\"><div class=\"spotlights-container\">\n<a class=\"spotlight-item\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/events\/javaone\/2016\"><img src=\"http:\/\/static.jboss.org\/images\/rhd\/promo\/RHDev_homepromo_javaonerecap_05oct2016.jpg\" alt=\"Java One recap.\"><span>Kubernetes, Microservices, Red Hat JBoss, and more<\/span><\/a><a class=\"spotlight-item\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/promotions\/microservices-for-java-developers\"><img src=\"http:\/\/static.jboss.org\/images\/rhd\/feature\/RHDev_homefeature_microservicesforjava_13jun2016.png\" alt=\"Microservices for Java developers ebook available for free.\"><span>Hands-on intro to frameworks and containers<\/span><\/a><a class=\"spotlight-item\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/products\/devstudio\/overview\"><img src=\"http:\/\/static.jboss.org\/images\/rhd\/promo\/RHDev_homepromo_devstudio10_16jun2016.png\" alt=\"Red Hat JBoss Developer Studio 10 is here.\"><span>DevStudio 10 now with OpenShift integration<\/span><\/a><a class=\"spotlight-item\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/products\/openjdk\/overview\"><img src=\"http:\/\/static.jboss.org\/images\/rhd\/promo\/RHDev_homepromo_openjdk_05oct2016.png\" alt=\"OpenJDK is now available for Windows. Join RHD now to download.\"><span>Join Red Hat Developers and try OpenJDK<\/span><\/a><a class=\"spotlight-item\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/products\/eap\/download\"><img src=\"http:\/\/static.jboss.org\/_root\/images\/rhd\/promo\/RHDev_homepromo_eap7launch_14jun2016.png\" alt=\"Ready. Set. Code! JBoss Enterprise Application Platform 7 is here.\"><span>Download it now and get started<\/span><\/a>\n<\/div><\/div><\/div><\/div><div class=\"row featured-and-latest\">\n<div class=\"large-24 columns\"><h3 class=\"caps\">Cool Stuff You Should Know...<\/h3><\/div>\n<div class=\"medium-12 columns\">\n<p>Knowledge should be shared, and with so much to learn, do and accomplish having a starting point is key. With suggested content \u2014 our favorite pieces \u2014 and easy access to the latest content on the site, you can jump in quickly and easily.<\/p>\n<h4 class=\"caps\">Featured Content<\/h4>\n<ul class=\"homepage-resources\">\n<li>\n<img class=\"resource-thumbnail\" src=\"http:\/\/static.jboss.org\/images\/rhd\/feature\/RHDev_homefeature_microprofile_04oct2016.png\"><span><a class=\"title\" href=\"http:\/\/developers.redhat.com\/blog\/2016\/06\/27\/microprofile-collaborating-to-bring-microservices-to-enterprise-java\">MicroProfile \u2013 Collaborating to bring Microservices to Enterprise Java<\/a><p class=\"date author\">Jun 27, 2016 | By Rich Sharples<\/p>\n<p class=\"description\">Learn more about MicroProfile and its importance to the future of Enterprise Java<\/p><\/span>\n<\/li>\n<li>\n<img class=\"resource-thumbnail\" src=\"http:\/\/static.jboss.org\/images\/rhd\/feature\/RHDev_homefeature_surveylocalization_30sept2016.png\"><span><a class=\"title\" href=\"http:\/\/developers.redhat.com\/blog\/2016\/09\/26\/survey-what-do-you-care-about-internationalization-and-localization-anyway\">Survey: What do you care about internationalization and localization, anyway?<\/a><p class=\"date author\">Sep 26, 2016 | By Yu Shao<\/p>\n<p class=\"description\">How do you internationalize and localize applications? Take this survey to let us know.<\/p><\/span>\n<\/li>\n<li>\n<img class=\"resource-thumbnail\" src=\"http:\/\/static.jboss.org\/images\/rhd\/feature\/RHDev_homefeature_javavisualstudio_30sep2016.png\"><span><a class=\"title\" href=\"http:\/\/developers.redhat.com\/blog\/2016\/09\/19\/java-language-support-for-visual-studio-code-has-landed\">Java Language Support for Visual Studio Code has landed<\/a><p class=\"date author\">Sep 19, 2016 | By Gorkem Ercan<\/p>\n<p class=\"description\">\u200bLearn more about Red Hat\'s release of \u200bJava language support extension to Visual Studio Code marketplace.<\/p><\/span>\n<\/li>\n<\/ul>\n<\/div>\n<div class=\"medium-12 columns\">\n<h4 class=\"caps\">Latest Content<\/h4>\n<ul class=\"homepage-resources homepage-resources-latest\"><\/ul>\n<\/div>\n<\/div><section class=\"register-banner inverse\"><div class=\"row\"><div class=\"large-24 columns home-join-img\">\n<img class=\"desktop\" src=\"\/\/static.jboss.org\/rhd\/fonts\/images_design_RHDev_homepage_jointext_desktop-2.svg\" alt=\"Join RHD\"><img class=\"mobile\" src=\"\/\/static.jboss.org\/rhd\/fonts\/images_design_RHDev_homepage_jointext_mobile-2.svg\" alt=\"Join RHD\">\n<\/div><\/div>\n<div class=\"row home-jointext\">\n<div class=\"large-10 columns\"><a class=\"button\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/register\">Join Today - It\'s Free!<\/a><\/div>\n<div class=\"large-14 columns\">\n<p>Red Hat delivers the resources and ecosystem of experts to help professional programmers to be more productive and get ahead of the curve as they build great applications.<a class=\"dark-background\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/register\"> Join now for free!<\/a><\/p>\n<p><img class=\"inline-icon\" src=\"\/\/static.jboss.org\/rhd\/fonts\/images_design_RHDev_homepage_download-3.svg\" alt=\"Download icon\"> Get immediate access to<b> download<\/b> Red Hat\u00ae products<\/p>\n<p><img class=\"inline-icon\" src=\"\/\/static.jboss.org\/rhd\/fonts\/images_design_RHDev_homepage_cloud-3.svg\" alt=\"Download icon\"> Launch your new apps in the<b> cloud<\/b> on Red Hat\u00ae OpenShift<\/p>\n<p><img class=\"inline-icon\" src=\"\/\/static.jboss.org\/rhd\/fonts\/images_design_RHDev_homepage_lowercost-3.svg\" alt=\"Download icon\"> Offers and<b> discounts<\/b> on products, services, training, &amp; events<\/p>\n<\/div>\n<\/div><\/section><section class=\"contributors-banner inverse\"><div class=\"row\"><div class=\"large-24 column\">\n<h2>Become a content contributor and get swag.<\/h2>\n<h4>Learn more. Code more. Share more.<\/h4>\n<div class=\"row\">\n<div class=\"large-14 columns\">\n<p>Our content is only as good as its contributors and we\'d like to feature yours. Anything from blogs, videos, demos, photos, screenshots, and more that can help enterprise developers do their jobs faster.<\/p>\n<p>It\'s easy to get started with three ways to contribute.<\/p>\n<\/div>\n<div class=\"large-10 columns\"><a class=\"button\" href=\"http:\/\/developer-drupal.web.prod.ext.phx2.redhat.com\/community\/contributor\">Learn More<\/a><\/div>\n<\/div>\n<div class=\"row banner-icons\">\n<div class=\"large-8 small-24 columns\">\n<img src=\"\/\/static.jboss.org\/rhd\/images\/images_content-contributors_wc_icon-3.png\"><h3>General Contributor<\/h3>\n<\/div>\n<div class=\"large-8 small-24 columns\">\n<img src=\"\/\/static.jboss.org\/rhd\/images\/images_content-contributors_mvc_icon-3.png\"><h3>Most Valuable Contributor<\/h3>\n<\/div>\n<div class=\"large-8 small-24 columns\">\n<img src=\"\/\/static.jboss.org\/rhd\/images\/images_content-contributors_dots_icon-3.png\"><h3>Developer on the Street<\/h3>\n<\/div>\n<\/div>\n<\/div><\/div><\/section>","format":"full_html","summary":"The simple, modern & productive way to build apps and infrastructure.","lang":"en"}]}'
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

  private :setup_service, :stub_exists_call_good, :stub_exists_call_bad, :get_hal_json
end
