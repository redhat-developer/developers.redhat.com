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
    raise "please provide a variable for HOST_TO_TEST"
  else
    host_to_test = ENV['HOST_TO_TEST']
  end

  config.app_host = host_to_test
  config.run_server = false
  config.default_driver = (ENV['DRIVER'] ||= 'local_chrome').to_sym
  config.default_max_wait_time = 6
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

Capybara.register_driver :local_firefox do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new
  profile['browser.download.dir'] = DownloadHelper::PATH.to_s
  profile['browser.download.folderList'] = 2
  profile['browser.helperApps.neverAsk.saveToDisk'] = 'images/jpeg, application/pdf, application/octet-stream'
  profile['pdfjs.disabled'] = true
  Capybara::Selenium::Driver.new(app, :browser => :firefox, :profile => profile)
end

Capybara::Screenshot.register_driver(:local_firefox) do |driver, path|
  driver.browser.save_screenshot path
end

Capybara.register_driver :local_chrome do |app|
  prefs = {
      'download' => {
          'default_directory' => DownloadHelper::PATH.to_s,
          'prompt_for_download' => false,
          'directory_upgrade' => true,
          'extensions_to_open' => '',
      },
      'profile' => {
          'default_content_settings' => {'multiple-automatic-downloads' => 1}, #for chrome version olde ~42
          'default_content_setting_values' => {'automatic_downloads' => 1}, #for chrome newer 46
          'password_manager_enabled' => false,
          'gaia_info_picture_url' => true,
      }
  }
  caps = Selenium::WebDriver::Remote::Capabilities.chrome
  caps['chromeOptions'] = {'prefs' => prefs}
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :desired_capabilities => caps)
end

Capybara::Screenshot.register_driver(:local_chrome) do |driver, path|
  driver.browser.save_screenshot path
end
