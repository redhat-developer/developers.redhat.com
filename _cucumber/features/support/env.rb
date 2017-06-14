require 'watir-ng'
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
require 'octokit'
require 'date'
require 'watir-webdriver-performance'
require 'billy/watir/cucumber'
require 'webdrivers'
require_relative 'browsers'
WatirNg.register(:data_page).patch!
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/pages/abstract/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/*.rb"].each { |helper| load helper }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/rest/*/*.rb"].each { |helper| load helper }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/rest/*.rb"].each { |helper| load helper }

$os = :linux if RUBY_PLATFORM.include? 'linux'
$os = :mac if RUBY_PLATFORM.include? 'darwin'

$session_id = Faker::Number.number(5)

World PageHelper
World DriverHelper

if ENV['HOST_TO_TEST'].to_s.empty?
  warn("No host to test was set. This can be set via '--host-to-test=foo'. Defaulting to drupal dev...")
  $host_to_test = 'http://docker:9000'
  $keycloak_base_url = 'https://developers.stage.redhat.com'
  $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
else
  case ENV['HOST_TO_TEST']
    when 'dev'
      $host_to_test = 'http://docker:9000'
      $keycloak_base_url = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'stage'
      $host_to_test = 'https://developers.stage.redhat.com'
      $keycloak_base_url = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'prod'
      $host_to_test = 'https://developers.redhat.com'
      $keycloak_base_url = 'https://developers.redhat.com'
      $download_manager_base_url = 'https://developers.redhat.com/download-manager/rest/available'
    else
      $host_to_test = ENV['HOST_TO_TEST'].chomp('/')
      unless $host_to_test =~ [/\Ahttps:\/\//]
        $host_to_test = $host_to_test.gsub('http://', 'https://')
      end
      if $host_to_test == ('https://developers.redhat.com' || 'http://developers.redhat.com')
        $keycloak_base_url = 'https://developers.redhat.com'
        $download_manager_base_url = 'https://developers.redhat.com/download-manager/rest/available'
      else
        $keycloak_base_url = 'https://developers.stage.redhat.com'
        $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
      end
  end
end

def mobile?(browser_name)
  json = File.read("#{$cucumber_dir}/driver/device_config/chromium_devices.json")
  config = JSON.parse(json)
  if config.include?(browser_name)
    device = config[browser_name]['device']['name']
    user_agent = config[browser_name]['ua']
    return device, user_agent
  else
    return nil, nil
  end
end

browser_name = ENV['RHD_JS_DRIVER'].gsub('docker_', '')
device, user_agent = mobile?(browser_name)
BROWSER = Browsers.new(browser_name, device, user_agent).browser
STUBBED_BROWSER = Browsers.new('phantomjs', device, user_agent).browser if ENV['STUBBED_DATA'] == 'true'

Before('@stubbed') do |scenario|
  if ENV['STUBBED_DATA'] == 'true'
    @stubbed_env = 'PR' if $host_to_test.include?('-pr')
    @stubbed_env = 'STG' if $host_to_test == ('https://developers.stage.redhat.com')
    Billy.configure do |c|
      c.cache = true
      c.whitelist = %w(developers-pr.stage.redhat.com developers.stage.redhat.com cdn.ravenjs.com redhat.com assets.adobedtm.com www.youtube.com static.jboss.org maxcdn.bootstrapcdn.com cdn.tt.omtrdc.net
                       developers.stage.redhat.com redhat.sc.omtrdc.net s.ytimg.com dpm.demdex.net dpal-itmarketing.itos.redhat.com issues.jboss.org redhat.tt.omtrdc.net youtube.com
                       ad.atdmt.com ajax.googleapis.com b.scorecardresearch.com cdn.atlassbx.com cdn.sstatic.net clc.stackoverflow.com dt.adsafeprotected.com edge.quantserve.com engine.adzerk.net
                       fw.adsafeprotected.com i.stack.imgur.com pixel.quantserve.com sc.iasds01.com sig.atdmt.com ssum-sec.casalemedia.com stackoverflow.com static.adzerk.net google-analytics.co gravatar.com
                       google-analytics.com gravatar.com ad.doubleclick.net i.ytimg.com www.facebook.com connect.facebook.net https://scripts.demandbase.com/adobeanalytics/X4PVAXm1.min.js https://sentry.io:443/api/115436/store/?sentry_version=7&sentry_client=raven-js%2F3.15.0&sentry_key=cc00364690f241ffb2fcb39254d7f23f
                       https://api.demandbase.com:443/api/v2/ip.json?key=b6b603b47ded9a3eff17c78423bbc773b9817cf6&callback=Dmdbase_CDC.callback)
      c.persist_cache = true
      c.proxy_host = $host_to_test
      feature_name = scenario.feature.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')
      scenario_name = scenario.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')
      c.cache_path = "#{$cucumber_dir}/lib/fixtures/req_cache-env-#{@stubbed_env}/#{feature_name}/#{scenario_name}/"
      FileUtils.mkdir_p(Billy.config.cache_path) unless File.exist?(Billy.config.cache_path)
    end
    @browser = STUBBED_BROWSER
  else
    @browser = BROWSER
  end
end

After('@stubbed') do
  Billy.proxy.reset_cache if ENV['STUBBED_DATA'] == 'true'
end

Before('~@stubbed') do
  @browser = BROWSER
end

After do
  BROWSER.cookies.clear
  STUBBED_BROWSER.cookies.clear if ENV['STUBBED_DATA'] == 'true'
end

at_exit do
  BROWSER.close && BROWSER.quit
  STUBBED_BROWSER.close && STUBBED_BROWSER.quit if ENV['STUBBED_DATA'] == 'true'
end
