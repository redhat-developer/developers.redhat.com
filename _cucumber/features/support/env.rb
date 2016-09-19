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
require 'report_builder'
require 'octokit'
require 'date'
require 'active_support/core_ext'
require 'webdriver-user-agent'
require_relative 'browsers'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/pages/abstract*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/*.rb"].each { |helper| load helper }

$os = :linux if RUBY_PLATFORM.include? 'linux'
$os = :mac if RUBY_PLATFORM.include? 'darwin'

World PageHelper
World DriverHelper

if ENV['HOST_TO_TEST'].to_s.empty?
  $host_to_test                  = 'http://developers.stage.redhat.com'
  $keycloak_base_url = 'https://developers.stage.redhat.com'
  $download_manager_base_url     = 'https://developers.stage.redhat.com/download-manager/rest/available'
else
  case ENV['HOST_TO_TEST']
    when 'dev'
      $host_to_test              = 'http://docker:4242'
      $keycloak_base_url         = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'staging'
      $host_to_test              = 'http://developers.stage.redhat.com'
      $keycloak_base_url         = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'production'
      $host_to_test              = 'http://developers.redhat.com'
      $keycloak_base_url         = 'https://developers.redhat.com'
      $download_manager_base_url = 'https://developers.redhat.com/download-manager/rest/available'
    when 'drupal_dev'
      $host_to_test              = 'http://docker:9000'
      $keycloak_base_url         = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'drupal_staging'
      $host_to_test              = 'http://developer-drupal.web.stage.ext.phx2.redhat.com'
      $keycloak_base_url         = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    when 'drupal_production'
      $host_to_test              = 'http://developer-drupal.web.prod.ext.phx2.redhat.com'
    else
      $host_to_test              =  ENV['HOST_TO_TEST'].chomp('/')
      $keycloak_base_url         = 'https://developers.stage.redhat.com'
      $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
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

Before do
  b.delete_cookies
end

at_exit do
  b.browser.quit

  FileUtils.rm_rf $download_directory

  ReportBuilder.configure do |config|
    config.json_path = '_cucumber/reports/'
    config.report_path = '_cucumber/reports/rhd_test_report'
    config.report_types = [:html]
    config.report_tabs = [:overview, :features, :errors]
    config.report_title = "RHD Test Results - #{$rhd_driver}"
    config.compress_images = false
  end

  ReportBuilder.build_report

  # # ensure that all social registrations are removed from keycloak at the end of test run, so they do not interfere with subsequent test runs
  admin = KeyCloak.new
  email_one = admin.get_user_by("redhat-developers-testers+sid_#{$session_id}")
  unless email_one.empty?
    email_one.each do |user|
      admin.delete_user(user['email'])
    end
  end

end
