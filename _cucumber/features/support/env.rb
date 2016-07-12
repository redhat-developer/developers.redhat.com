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
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/site_user')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/downloads_helper')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/products_helper')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/keycloak_admin')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/github_admin')

$session_id = Faker::Number.number(10)

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

  if ENV['RHD_TEST_PROFILE'] == 'nightly'
    # ensure that all social registrations are removed from keycloak at the end of test run, so they do not interfere with subsequent test runs
    admin = KeyCloak.new
    email = admin.get_user_by("rhd_automated_tester_#{$session_id}")
    unless email.empty?
      email.each do |user|
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
end
