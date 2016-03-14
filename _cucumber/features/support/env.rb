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
require 'pry'
require_relative 'app'
Dir["#{File.dirname(__FILE__)}/../../lib/pages/*.rb"].each { |page| load page }
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/site_user')
require File.expand_path(File.dirname(__FILE__)+'/../../../_cucumber/lib/helpers/downloads_helper')

Capybara.configure do |config|

  if ENV['HOST_TO_TEST'].to_s.empty?
    # default to localhost
    host_to_test = 'http://0.0.0.0:4242'
  else
    if ENV['HOST_TO_TEST'][-1, 1] == '/'
      host_to_test = ENV['HOST_TO_TEST'].chomp('/')
    else
      host_to_test = ENV['HOST_TO_TEST']
    end
  end

  config.default_driver = (ENV['RHD_DEFAULT_DRIVER'] || 'mechanize').to_sym
  config.javascript_driver = (ENV['RHD_JS_DRIVER'] || 'selenium').to_sym
  config.app_host = host_to_test
  config.run_server = false
  config.app = 'RHD'
  config.default_max_wait_time = 6
  config.save_and_open_page_path = '_cucumber/screenshots'
  Capybara::Screenshot.prune_strategy = :keep_last_run

  puts " . . . Running features against #{host_to_test}  . . . "
  puts ' . . . To change this use the Environment variable HOST_TO_TEST . . . '
  puts ' . . . E.g bundle exec features HOST_TO_TEST=http://the_host_you_want:8080 . . .'
end

Capybara.register_driver :mechanize do |app|
  $VERBOSE = nil
  OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
  I_KNOW_THAT_OPENSSL_VERIFY_PEER_EQUALS_VERIFY_NONE_IS_WRONG = nil
  driver = Capybara::Mechanize::Driver.new(app)
  driver.configure do |agent|
    agent.user_agent_alias = 'Windows Mozilla'
  end
  driver
end

Capybara.register_driver :selenium do |app|
  @download_dir = File.join(Dir.pwd, '_cucumber/tmp')
  FileUtils.mkdir_p(@download_dir)
  profile = Selenium::WebDriver::Firefox::Profile.new
  profile['browser.download.dir'] = @download_dir
  profile['browser.download.folderList'] = 2
  profile['browser.helperApps.neverAsk.saveToDisk'] = 'application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
  profile['pdfjs.disabled'] = true
  Capybara::Selenium::Driver.new(app, browser: :firefox, profile: profile)
end

Capybara.register_driver :selenium_remote do |app|
  job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
  @download_dir = File.join(Dir.pwd, '_cucumber/tmp')
  FileUtils.mkdir_p(@download_dir)

  profile = Selenium::WebDriver::Firefox::Profile.new
  profile['browser.download.dir'] = @download_dir
  profile['browser.download.folderList'] = 2
  profile['browser.helperApps.neverAsk.saveToDisk'] = 'application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
  profile['pdfjs.disabled'] = true

  caps = Selenium::WebDriver::Remote::Capabilities.firefox(:firefox_profile => profile)
  caps['browser'] = 'Firefox'
  caps['browser_version'] = '44.0'
  caps['os'] = 'Windows'
  caps['os_version'] = '10'
  caps['project'] = job_name
  caps['browserstack.debug'] = 'true'
  caps['acceptSslCerts'] = 'true'
  caps['browserstack.local'] = 'true'
  url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
  Capybara::Selenium::Driver.new(app, :browser => :remote, :url => url, :desired_capabilities => caps)
end

Capybara.register_driver :browserstack do |app|
  job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
  stack_to_use = ENV['RHD_BS_BROWSER'] || 'firefox'
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

After do
  if defined?(@download_dir) && Dir.exist?(@download_dir)
    FileUtils.rm_rf(@download_dir)
  end
end

at_exit do
  if defined?(@download_dir) && Dir.exist?(@download_dir)
    FileUtils.rm_rf(@download_dir)
  end
end
