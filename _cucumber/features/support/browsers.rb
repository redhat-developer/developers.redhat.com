class Browsers
  include Selenium

  attr_reader :browser

  def initialize(browser_name)
    @browser = setup(browser_name)
  end

  def delete_cookies
    @browser.driver.manage.delete_all_cookies
  end

  private

  def setup(browser_name)
    case browser_name
      when 'chrome'
        browser = chrome
      when 'docker_chrome'
        browser = docker_chrome
      when 'docker_firefox'
        browser = docker_firefox
      when 'ios_simulator'
        browser = ios_simulator
      else
        json = File.read('_cucumber/driver/device_config/chromium_devices.json')
        config = JSON.parse(json)
        if config.include?(browser_name)
          if ENV['RHD_DOCKER_DRIVER'].to_s.empty?
            browser = chrome(browser_name)
          else
            browser = docker_chrome(browser_name)
          end
        else
          browser = chrome
        end
    end
    browser
  end

  def ios_simulator
    caps = {platformName: 'ios', deviceName: 'iPhone 6', browserName: 'Safari', platformVersion: '9.2'}
    driver = Selenium::WebDriver.for(:remote, desired_capabilities: caps, url: server_url)
    Watir::Browser.new(driver)
  end

  def chrome(device_name = nil)
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')
    FileUtils.mkdir_p $download_directory
    raise('Download directory was not created!') unless Dir.exist?($download_directory)

    chrome_prefs = {
        :download => {
            :prompt_for_download => false,
            :directory_upgrade => true,
            :default_directory => $download_directory
        }
    }

    chrome_switches = %w[--ignore-certificate-errors --disable-popup-blocking]
    caps_opts = {'chrome.switches' => chrome_switches}

    chromedriver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os.to_s}", "chromedriver")
    Selenium::WebDriver::Chrome.driver_path = chromedriver_path

    if device_name == nil
      caps = Selenium::WebDriver::Remote::Capabilities.chrome
      caps['chromeOptions'] = {'prefs' => chrome_prefs}
    else
      json = File.read('_cucumber/driver/device_config/chromium_devices.json')
      config = JSON.parse(json)
      raise "Invalid device specified! Was '#{device_name}'" unless config.include?(device_name)
      dut = config[device_name]['device']['name']
      puts ">>>> Executing tests on browser emulated version of #{dut} <<<<"
      mobile_emulation = {"deviceName" => dut}
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = {'prefs' => chrome_prefs, 'mobileEmulation' => mobile_emulation}
    end
    Watir::Browser.new(:chrome, :desired_capabilities => caps)
  end

  def docker_chrome(device_name = nil)
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')
    raise('Download directory was not created!') unless Dir.exist?($download_directory)

    chrome_prefs = {
        :download => {
            :prompt_for_download => false,
            :directory_upgrade => true,
            :default_directory => $download_directory
        }
    }

    chrome_switches = %w[--ignore-certificate-errors --disable-popup-blocking --incognito]
    caps_opts = {'chrome.switches' => chrome_switches}

    if device_name == nil
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = {'prefs' => chrome_prefs}
    else
      json = File.read('_cucumber/driver/device_config/chromium_devices.json')
      config = JSON.parse(json)
      raise "Invalid device specified! Was '#{device_name}'" unless config.include?(device_name)
      dut = config[device_name]['device']['name']
      puts ">>>> Executing tests on browser emulated version of #{dut} <<<<"
      mobile_emulation = {"deviceName" => dut}
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = {'prefs' => chrome_prefs, 'mobileEmulation' => mobile_emulation}
    end

    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 300 # Browser launch can take a while

    begin
      attempts = 0
      Watir::Browser.new(:remote, :url => ENV['SELENIUM_HOST'], :desired_capabilities => caps, http_client: client)
    rescue Net::ReadTimeout => e
      if attempts == 0
        attempts += 1
        retry
      else
        raise(e)
      end
    end
  end

  def docker_firefox
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')
    raise('Download directory was not created!') unless Dir.exist?($download_directory)

    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.dir'] = $download_directory
    profile['browser.download.folderList'] = 2
    profile['browser.helperApps.neverAsk.saveToDisk'] = 'text/html, charset=UTF-8, application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
    profile['pdfjs.disabled'] = true
    profile['acceptSslCerts'] = true
    caps = Selenium::WebDriver::Remote::Capabilities.firefox(:firefox_profile => profile)
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 300 # Browser launch can take a while
    begin
      attempts = 0
      Watir::Browser.new(:remote, :url => ENV['SELENIUM_HOST'], :desired_capabilities => caps, http_client: client)
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
