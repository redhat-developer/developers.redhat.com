# This module contains all the code for required to setup the desired browser under test
module Browsers
  module_function

  def setup(browser_name)
    device, user_agent = mobile?(browser_name)
    if browser_name.include?('bs_')
      browser = browserstack(browser_name)
    else
      if ENV['RHD_HEADLESS_MODE'] == 'true'
        browser = phantomjs(user_agent)
      else
        browser = chrome(device, ENV['RHD_REMOTE_BROWSER'])
      end
    end
    browser
  end

  def mobile?(browser_name)
    json = File.read('_cucumber/driver/device_config/chromium_devices.json')
    config = JSON.parse(json)
    if config.include?(browser_name)
      device = config[browser_name]['device']['name']
      user_agent = config[browser_name]['ua']
      return device, user_agent
    else
      return nil, nil
    end
  end

  def phantomjs(user_agent)
    driver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os}/phantomjs", 'phantomjs')
    switches = %w(--ignore-ssl-errors=true)
    stubbed = ENV['STUBBED_DATA'] || 'false'
    if user_agent.nil?
      if stubbed == 'true'
        browser = Billy::Browsers::Watir.new :phantomjs, args: switches, driver_path: driver_path
      else
        browser = Watir::Browser.new :phantomjs, args: switches, driver_path: driver_path
      end
      browser.window.resize_to(1280, 1024)
      browser
    else
      ENV['DEVICE'] = user_agent
      capabilities = Selenium::WebDriver::Remote::Capabilities.phantomjs('phantomjs.page.settings.userAgent' => user_agent)
      driver = Selenium::WebDriver.for :phantomjs, args: switches, desired_capabilities: capabilities
      if stubbed == 'true'
        browser = Billy::Browsers::Watir.new driver, driver_path: driver_path
      else
        browser = Watir::Browser.new driver, driver_path: driver_path
      end
      browser
    end
  end

  def chrome(device, remote = nil)
    driver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os}/chrome", 'chromedriver')
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')
    FileUtils.mkdir_p $download_directory if remote.nil?

    chrome_prefs = {
        download: {
            prompt_for_download: false,
            directory_upgrade: true,
            default_directory: $download_directory
        },
        safebrowsing: {
            enabled: true
        }
    }

    chrome_switches = %w(--ignore-certificate-errors --disable-popup-blocking)
    caps_opts = { 'chrome.switches' => chrome_switches }

    if device.nil?
      caps = Selenium::WebDriver::Remote::Capabilities.chrome
      caps['chromeOptions'] = { 'prefs' => chrome_prefs }
    else
      ENV['DEVICE'] = device
      mobile_emulation = { 'deviceName' => device }
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = { 'prefs' => chrome_prefs, 'mobileEmulation' => mobile_emulation }
    end
    if remote.nil?
      Watir::Browser.new(:chrome, desired_capabilities: caps, driver_path: driver_path)
    else
      client = Selenium::WebDriver::Remote::Http::Default.new
      client.open_timeout = 100 # Browser launch can take a while
      begin
        attempts = 0
        Watir::Browser.new(:remote, url: ENV['SELENIUM_HOST'], desired_capabilities: caps, http_client: client)
      rescue Net::ReadTimeout => e
        if attempts == 0
          attempts += 1
          retry
        else
          raise(e)
        end
      end
    end
  end

  def browserstack(stack_to_use)
    json = JSON.load(open('_cucumber/driver/browserstack/browsers.json'))
    config = json[stack_to_use]
    job_name = "RHD Acceptance Tests - #{stack_to_use}: #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    config['browserstack.debug'] = 'true'
    config['project'] = job_name
    config['acceptSslCerts'] = 'true'
    config['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.open_timeout = 100 # Browser launch can take a while
    Watir::Browser.new(:remote, url: url, desired_capabilities: config, http_client: client)
  end
end
