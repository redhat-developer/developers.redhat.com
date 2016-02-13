require 'capybara'
require 'capybara/cucumber'
require 'capybara/mechanize/cucumber'
require 'capybara-screenshot/cucumber'
require 'site_prism'
require 'rspec'
require 'selenium-webdriver'
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
require_relative 'app'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/customer')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/downloads_helper')
SCREENSHOT_DIRECTORY = '_cucumber/screenshots'

Capybara.configure do |config|

  if ENV['HOST_TO_TEST'].to_s.empty?
    # default to staging
    host_to_test = 'https://developers.stage.redhat.com'
  else
    if ENV['HOST_TO_TEST'][-1, 1] == '/'
      host_to_test = ENV['HOST_TO_TEST'].chomp('/')
    else
      host_to_test = ENV['HOST_TO_TEST']
    end
  end

  if ENV['RHD_DRIVER'].to_s.empty?
    config.default_driver = :mechanize
    config.javascript_driver = :selenium
  elsif ENV['CI'] == 'true'
    config.default_driver = :mechanize
    config.javascript_driver = ENV['RHD_DRIVER'].to_sym
  else
    config.default_driver = ENV['RHD_DRIVER'].to_sym
    config.javascript_driver = ENV['RHD_DRIVER'].to_sym
  end

  config.app_host = host_to_test
  config.run_server = false
  config.app = 'RHD'
  config.default_max_wait_time = 6
  config.save_and_open_page_path = SCREENSHOT_DIRECTORY

  Capybara::Screenshot.prune_strategy = :keep_last_run

  puts " . . . Running features against #{host_to_test}  . . . "
  puts ' . . . To change this use the Environment variable HOST_TO_TEST . . . '
  puts ' . . . E.g bundle exec features HOST_TO_TEST=http://the_host_you_want:8080 . . .'
  puts " . . . Running features using #{config.default_driver} . . . "
  puts ' . . . To switch browser use the Environment variable RHD_DRIVER . . . '
  puts ' . . . E.g. bundle exec features RHD_DRIVER=selenium . . . '
  puts " . . . Screenshot directory location: #{SCREENSHOT_DIRECTORY} . . . "
end

CHROME_PREFS = {
    'download' => {
        'default_directory' => DownloadHelper::PATH.to_s,
        'prompt_for_download' => false,
        'directory_upgrade' => true,
        'extensions_to_open' => '',
    },
    'profile' => {
        'default_content_settings' => {'multiple-automatic-downloads' => 1},
        'default_content_setting_values' => {'automatic_downloads' => 1},
        'password_manager_enabled' => false,
        'gaia_info_picture_url' => true,
    },
    'safebrowsing' => {
        'enabled' => true,
    }

}

Capybara.register_driver :selenium do |app|
  caps = Selenium::WebDriver::Remote::Capabilities.chrome
  caps['chromeOptions'] = {'prefs' => CHROME_PREFS}
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :switches => %w[--disable-popup-blocking --ignore-ssl-errors=yes], :desired_capabilities => caps)
end

Capybara.register_driver :selenium_remote do |app|
  job_name = "RHD Acceptance Tests Using Chrome Download profile - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
  config = Selenium::WebDriver::Remote::Capabilities.chrome
  config['chromeOptions'] = {'prefs' => CHROME_PREFS}
  config['browser'] = 'Chrome'
  config['browser_version'] = '48.0'
  config['os'] = 'Windows'
  config['os_version'] = '10'
  config['browserstack.debug'] = 'true'
  config['project'] = job_name
  config['acceptSslCerts'] = 'true'
  config['browserstack.local'] = 'true'
  url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
  Capybara::Selenium::Driver.new(app, :browser => :remote, :url => url, :desired_capabilities => config)
end

Capybara.register_driver :mechanize do |app|
  OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
  I_KNOW_THAT_OPENSSL_VERIFY_PEER_EQUALS_VERIFY_NONE_IS_WRONG = nil
  driver = Capybara::Mechanize::Driver.new(app)
  driver.configure do |agent|
    # Configure other Mechanize options here.
    agent.log = Logger.new "mech.log"
    agent.user_agent_alias = 'Windows Chrome'
  end
  driver
end

Capybara.register_driver :browserstack do |app|
  job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
  stack_to_use = ENV['RHD_BS_BROWSER'] || 'chrome'
  json = JSON.load(open('_cucumber/browserstack/browsers.json'))
  config = json[stack_to_use]
  config['browserstack.debug'] = 'true'
  config['project'] = job_name
  config['acceptSslCerts'] = 'true'
  config['browserstack.local'] = 'true'
  url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
  Capybara::Selenium::Driver.new(app, :browser => :remote, :url => url, :desired_capabilities => config)
end


browsers = [:selenium, :selenium_remote, :browserstack]
browsers.each do |browser|
  Capybara::Screenshot.register_driver(browser) do |driver, path|
    driver.browser.save_screenshot path
  end
end
