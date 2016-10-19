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
require 'colorize'
require 'colorized_string'
require_relative 'browsers'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/pages/abstract*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/*.rb"].each { |helper| load helper }

$os = :linux if RUBY_PLATFORM.include? 'linux'
$os = :mac if RUBY_PLATFORM.include? 'darwin'

World PageHelper
World DriverHelper

$session_id = Faker::Number.number(5)

def site_host_to_test
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
        unless $host_to_test =~ [/\Ahttps:\/\//]
          $host_to_test = $host_to_test.gsub('http://', 'https://')
        end
        $keycloak_base_url = 'https://developers.stage.redhat.com'
        $download_manager_base_url = 'https://developers.stage.redhat.com/download-manager/rest/available'
    end
  end
end

def browser_name
  (ENV['RHD_JS_DRIVER'] ||= 'chrome')
end

Before do |scenario|
  site_host_to_test
  driver = Browsers.new(browser_name)
  @browser = driver.browser
end

After do |scenario|
  @browser.quit
end

at_exit do

  if ENV['RHD_TEST_PROFILE'] == 'nightly'
    # # ensure that all social registrations are removed from keycloak at the end of test run, so they do not interfere with subsequent test runs
    admin = KeyCloak.new
    email_one = admin.get_user_by("redhat-developers-testers+sid_#{$session_id}")
    unless email_one.empty?
      email_one.each do |user|
        admin.delete_user(user['email'])
      end
    end
  end

end
