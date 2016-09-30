require 'watir'
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
require 'webdrivers'
require_relative 'browsers'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/pages/abstract/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/*.rb"].each { |helper| load helper }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/rest/*/*.rb"].each { |helper| load helper }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/rest/*.rb"].each { |helper| load helper }

$os = :linux if RUBY_PLATFORM.include? 'linux'
$os = :mac if RUBY_PLATFORM.include? 'darwin'

World PageHelper
World DriverHelper

if ENV['HOST_TO_TEST'].to_s.empty?
  $host_to_test = 'https://developers.stage.redhat.com'
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
    when 'drupal_productions'
      $host_to_test = 'https://developer-drupal.web.prod.ext.phx2.redhat.com'
    else
      $host_to_test = ENV['HOST_TO_TEST'].chomp('/')
      if $host_to_test.include?('stage')
        $keycloak_base_url = 'https://developers.stage.redhat.com'
        $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
      else
        $keycloak_base_url = 'https://developers.redhat.com'
        $download_manager_base_url = 'https://developers.redhat.com/download-manager/rest/available'
      end
  end
end

if ENV['RHD_JS_DRIVER'].to_s.empty?
  $rhd_driver = 'chrome'
else
  $rhd_driver = ENV['RHD_JS_DRIVER']
end

$session_id = Faker::Number.number(5)

b = Browsers.new($rhd_driver)

Before do
  @browser = b.browser
end

at_exit do
  b.browser.quit
end
