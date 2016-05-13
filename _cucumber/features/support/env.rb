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
require_relative 'site'
require_relative 'browser'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/site_user')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/downloads_helper')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/products_helper')

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

ReportBuilder.configure do |config|
  config.json_path = '_cucumber/reports/'
  config.report_path = '_cucumber/reports/rhd_test_report'
  config.report_types = [:json, :html]
  config.report_tabs = [:overview, :features, :scenarios, :errors]
  config.report_title = "RHD Test Results - #{$rhd_driver}"
  config.compress_images = false
end

at_exit {
  browser.driver.quit
  ReportBuilder.build_report
}
