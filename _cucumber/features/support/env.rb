require 'selenium-webdriver'
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
require_relative 'site'
require_relative 'browser'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
Dir["#{File.dirname(__FILE__)}/../../lib/helpers/*.rb"].each { |helper| load helper }

$session_id = Faker::Number.number(5)

if ENV['HOST_TO_TEST'].to_s.empty?
  $host_to_test = 'http://0.0.0.0:4242'
else
  $host_to_test = ENV['HOST_TO_TEST'].chomp('/')
end

if ENV['RHD_JS_DRIVER'].to_s.empty?
  $rhd_driver = 'chrome'
else
  $rhd_driver = ENV['RHD_JS_DRIVER']
end

browser = Browser.new($rhd_driver)

Before do
  @driver = browser.driver
  @page = Site.new(@driver)
end

at_exit do

  browser.driver.quit

  ReportBuilder.configure do |config|
    config.json_path = '_cucumber/reports/'
    config.report_path = '_cucumber/reports/rhd_test_report'
    config.report_types = [:html]
    config.report_tabs = [:overview, :features, :errors]
    config.report_title = "RHD Test Results - #{$rhd_driver}"
    config.compress_images = false
  end

  ReportBuilder.build_report

  # ensure that all social registrations are removed from keycloak at the end of test run, so they do not interfere with subsequent test runs
  admin = KeyCloak.new
  email_one = admin.get_user_by("rhd-autotest+sid_#{$session_id}")
  unless email_one.empty?
    email_one.each do |user|
      admin.delete_user(user['email'])
    end
  end

  # ensure that github accounts are clear at the end of test run, so they do not interfere with subsequent test runs
  github_accounts = %w(rhdScenarioOne rhdScenarioTwo)
  github_accounts.each do |account|
    github_admin = GitHubAdmin.new(account, 'P@$$word01')
    github_admin.cleanup
  end
end
