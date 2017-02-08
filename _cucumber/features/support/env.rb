require 'watir'
require 'selenium/webdriver/remote/http/persistent'
require 'rspec'
require 'require_all'
require 'fileutils'
require 'gmail'
require 'faker'
require 'open-uri'
require 'json'
require 'pp'
require 'openssl'
require 'rest-client'
require 'json'
require 'uuid'
require 'fileutils'
require 'pry'
require 'date'
require 'watir-webdriver-performance'
require 'billy/watir/cucumber'
require_relative 'browsers'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/pages/abstract/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/*.rb"].each { |helper| load helper }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/rest/*/*.rb"].each { |helper| load helper }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/rest/*.rb"].each { |helper| load helper }

$os = :linux if RUBY_PLATFORM.include? 'linux'
$os = :mac if RUBY_PLATFORM.include? 'darwin'

$chrome_driver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os}/chrome", 'chromedriver')
$phantomjs_driver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os}/phantomjs", 'phantomjs')

$session_id = Faker::Number.number(5)

World PageHelper
World DriverHelper

if ENV['HOST_TO_TEST'].to_s.empty?
  @logger.warn("No host to test was set. This can be set via '--host-to-test=foo'. Defaulting to drupal dev...")
  $host_to_test = 'https://docker:9000'
  $keycloak_base_url = 'https://developers.stage.redhat.com'
  $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
else
  case ENV['HOST_TO_TEST']
    when 'dev'
      $host_to_test = 'http://docker:4242'
      $keycloak_base_url = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'staging'
      $host_to_test = 'https://developers.stage.redhat.com'
      $keycloak_base_url = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'production'
      $host_to_test = 'https://developers.redhat.com'
      $keycloak_base_url = 'https://developers.redhat.com'
      $download_manager_base_url = 'https://developers.redhat.com/download-manager/rest/available'
    when 'drupal_dev'
      $host_to_test = 'https://docker:9000'
      $keycloak_base_url = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'drupal_staging'
      $host_to_test = 'https://developer-drupal.web.stage.ext.phx2.redhat.com'
      $keycloak_base_url = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'drupal_production'
      $host_to_test = 'https://developer-drupal.web.prod.ext.phx2.redhat.com'
    else
      $host_to_test = ENV['HOST_TO_TEST'].chomp('/')
      if $host_to_test == ('https://developers.redhat.com' || 'http://developers.redhat.com')
        $keycloak_base_url = 'https://developers.redhat.com'
        $download_manager_base_url = 'https://developers.redhat.com/download-manager/rest/available'
      else
        $keycloak_base_url = 'https://developers.stage.redhat.com'
        $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
      end
  end
end

if ENV['RHD_JS_DRIVER'].to_s.empty?
  ENV['RHD_JS_DRIVER'] = 'chrome'
  browser = Browsers.setup(ENV['RHD_JS_DRIVER'])
else
  $device, $user_agent = Browsers.mobile?(ENV['RHD_JS_DRIVER'])
  browser = Browsers.setup(ENV['RHD_JS_DRIVER'], $device, $user_agent)
end

Before('@stubbed') do |scenario|
  if ENV['STUBBED_DATA'] == 'true'
    Billy.configure do |c|
      c.cache = true
      c.cache_request_headers = false
      c.whitelist = %w(developers-pr.stage.redhat.com cdn.ravenjs.com www.redhat.com assets.adobedtm.com www.youtube.com static.jboss.org maxcdn.bootstrapcdn.com cdn.tt.omtrdc.net
                       developers.stage.redhat.com redhat.sc.omtrdc.net s.ytimg.com dpm.demdex.net dpal-itmarketing.itos.redhat.com issues.jboss.org redhat.tt.omtrdc.net www.youtube.com)
      c.persist_cache = true
      feature_name = scenario.feature.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')
      scenario_name = scenario.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')
      c.cache_path = "#{$cucumber_dir}/lib/fixtures/req_cache/#{feature_name}/#{scenario_name}/"
      FileUtils.mkdir_p(Billy.config.cache_path) unless File.exist?(Billy.config.cache_path)
    end
    if defined? $browser.nil? || $browser.driver.browser != :phantomjs
      $browser = Browsers.setup('phantomjs', $device, $user_agent)
    end
  else
    $browser = browser
  end
end

After('@stubbed') do
  Billy.proxy.reset_cache if ENV['STUBBED_DATA'] == 'true'
end

Before('~@stubbed') do
  $browser = browser
end

at_exit do
  $browser.quit if defined? $browser
end
