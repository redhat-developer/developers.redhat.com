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
    config[browser_name]['device']['name']
  else
    nil
  end
end

browser_name = ENV['RHD_JS_DRIVER'].gsub('docker_', '')
device = mobile?(browser_name)
BROWSER = Browsers.new(browser_name, device).browser

Before do
  @browser = BROWSER
end

After do
  BROWSER.cookies.clear
end

at_exit do
  BROWSER.close && BROWSER.quit
end
