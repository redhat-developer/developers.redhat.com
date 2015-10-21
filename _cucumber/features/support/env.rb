$: << File.dirname(__FILE__)+'/../../lib'

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

require_relative 'app'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }

SCREENSHOT_DIRECTORY = '_cucumber/screenshots'

Capybara.configure do |config|
  host_to_test = ENV['HOST_TO_TEST'] ||= 'http://docker:32768'
  config.app_host = host_to_test
  config.run_server = false
  config.default_driver = (ENV['DRIVER'] || 'poltergeist').to_sym
  config.javascript_driver = config.default_driver
  config.default_max_wait_time = 60
  config.save_and_open_page_path = SCREENSHOT_DIRECTORY
  Capybara::Screenshot.prune_strategy = :keep_last_run
  puts " . . . Running smoke tests against #{host_to_test}  . . . "
  puts ' . . . To change this use the Environment variable HOST_TO_TEST . . . '
  puts ' . . . E.g bundle exec features HOST_TO_TEST=http://the_host_you_want:8080 . . .'
  puts " . . . Running tests using #{config.default_driver} . . . "
  puts ' . . . To switch browser use the Environment variable DRIVER . . . '
  puts ' . . . E.g. bundle exec features DRIVER=firefox . . . '
  puts " . . . Screenshot directory location: #{SCREENSHOT_DIRECTORY} . . . "
end

Capybara.register_driver :poltergeist do |app|
  #The ssl options below allow us to call searchisko (operating from a different host
  Capybara::Poltergeist::Driver.new(app, {
      :phantomjs_options => ['--debug=no', '--load-images=no', '--ignore-ssl-errors=yes', '--ssl-protocol=TLSv1'], :js_errors => false})
end

Capybara.register_driver :firefox do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new
  Capybara::Selenium::Driver.new(app, :profile => profile)
end

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

# Required so that Screenshot works with the "firefox" driver
Capybara::Screenshot.register_driver(:firefox) do |driver, path|
  driver.browser.save_screenshot path
end

# Required so that Screenshot works with the "chrome" driver
Capybara::Screenshot.register_driver(:chrome) do |driver, path|
  driver.browser.save_screenshot path
end
