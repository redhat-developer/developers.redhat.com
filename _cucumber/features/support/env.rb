require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'rspec'
require 'capybara/poltergeist'
require 'selenium-webdriver'
require 'require_all'
require 'fileutils'
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
    raise "please provide a variable for HOST_TO_TEST"
  else
    if ENV['HOST_TO_TEST'][-1, 1] == '/'
      host_to_test = ENV['HOST_TO_TEST'].chomp('/')
    else
      host_to_test = ENV['HOST_TO_TEST']
    end
  end

  config.app_host = host_to_test
  config.run_server = false
  config.default_driver = (ENV['DRIVER'] ||= 'poltergeist').to_sym
  config.default_max_wait_time = 5
  config.save_and_open_page_path = SCREENSHOT_DIRECTORY
  Capybara::Screenshot.prune_strategy = :keep_last_run
  puts " . . . Running features against #{host_to_test}  . . . "
  puts ' . . . To change this use the Environment variable HOST_TO_TEST . . . '
  puts ' . . . E.g bundle exec features HOST_TO_TEST=http://the_host_you_want:8080 . . .'
  puts " . . . Running features using #{config.default_driver} . . . "
  puts ' . . . To switch browser use the Environment variable DRIVER . . . '
  puts ' . . . E.g. bundle exec features DRIVER=firefox . . . '
  puts " . . . Screenshot directory location: #{SCREENSHOT_DIRECTORY} . . . "
end

Capybara.register_driver :poltergeist do |app|
  #The ssl options below allow us to call searchisko (operating from a different host
  Capybara::Poltergeist::Driver.new(app, {:phantomjs_options => ['--debug=no', '--load-images=no', '--ignore-ssl-errors=yes', '--ssl-protocol=TLSv1'], :js_errors => false})
end

Capybara.register_driver :firefox do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new
  Capybara::Selenium::Driver.new(app, :profile => profile)
end

Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :switches => %w[--disable-popup-blocking --ignore-ssl-errors=yes])
end

Capybara.register_driver :browserstack do |app|
  job_name = "RHD cucumber-tests running in BrowserStack - #{Time.now.strftime '%Y-%m-%d %H:%M'}"

  stack_to_use = ENV['BS_BROWSER'] || 'firefox'
  json = JSON.load(open('_cucumber/browserstack/browsers.json'))
  config = json[stack_to_use]
  config['browserstack.debug'] = 'true'
  config['project'] = job_name
  config['acceptSslCerts'] = 'true'
  config['browserstack.local'] = 'true'
  url = "http://#{ENV['BS_USERNAME']}:#{ENV['BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
  Capybara::Selenium::Driver.new(app, :browser => :remote, :url => url, :desired_capabilities => config)
end

browsers = [:firefox, :chrome, :browserstack]
browsers.each do |browser|
  Capybara::Screenshot.register_driver(browser) do |driver, path|
    driver.browser.save_screenshot path
  end
end
