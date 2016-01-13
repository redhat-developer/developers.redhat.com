require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'rspec'
require 'capybara/poltergeist'
require 'selenium-webdriver'
require 'require_all'
require 'fileutils'
require 'rubocop'
require 'capybara-screenshot/cucumber'
require 'site_prism'
require 'gmail'
require 'faker'

require_relative 'app'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/customer')
SCREENSHOT_DIRECTORY = '_cucumber/screenshots'

Capybara.configure do |config|

  if ENV['HOST_TO_TEST'].to_s.empty?
    raise 'please provide a variable for HOST_TO_TEST'
  else
    host_to_test = ENV['HOST_TO_TEST']
  end

  config.app_host = host_to_test
  config.run_server = false
  config.default_driver = (ENV['RHD_SELENIUM_DRIVER'] ||= 'local_chrome').to_sym
  config.default_max_wait_time = 6
  config.save_and_open_page_path = SCREENSHOT_DIRECTORY

  Capybara::Screenshot.prune_strategy = :keep_last_run
  puts " . . . Running features against #{host_to_test}  . . . "
  puts ' . . . To change this use the Environment variable HOST_TO_TEST . . . '
  puts ' . . . E.g bundle exec features HOST_TO_TEST=http://the_host_you_want:8080 . . .'
  puts " . . . Running features using #{config.default_driver} . . . "
  puts " . . . Screenshot directory location: #{SCREENSHOT_DIRECTORY} . . . "

end

Capybara.register_driver :firefox do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.firefox
  Capybara::Selenium::Driver.new(app, :url => ENV['SELENIUM_HOST'], :browser => :remote, :desired_capabilities => capabilities)
end

Capybara.register_driver :chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome('chromeOptions' => {'args' => ['test-type','whitelisted-ips=comma-separated-ips']})
  Capybara::Selenium::Driver.new(app, :url => ENV['SELENIUM_HOST'], :browser => :remote, :desired_capabilities => capabilities)
end

Capybara.register_driver :local_firefox do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new
  Capybara::Selenium::Driver.new(app, :profile => profile)
end

Capybara.register_driver :local_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :switches => %w[--disable-popup-blocking --ignore-ssl-errors=yes])
end

drivers = [:firefox, :local_firefox, :chrome, :local_chrome]
drivers.each do |d|
  Capybara::Screenshot.register_driver(d) do |driver, path|
    driver.browser.save_screenshot path
  end
end
