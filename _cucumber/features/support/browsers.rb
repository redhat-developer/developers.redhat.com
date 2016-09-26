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
      when 'bs_ie_11'
        browser = browserstack(browser_name)
      when 'bs_firefox'
        browser = browserstack(browser_name)
      when 'bs_iphone_6'
        browser = browserstack(browser_name)
      when 'bs_galaxy_s5'
        browser = browserstack(browser_name)
      when 'docker_chrome'
        browser = docker_chrome
      when 'docker_firefox'
        browser = docker_firefox
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

  def chrome(device_name = nil)
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')
    FileUtils.mkdir_p $download_directory
    raise('Download directory was not created!') unless Dir.exist?($download_directory)

    chrome_prefs = {
        :download => {
            :prompt_for_download => false,
            :directory_upgrade => true,
            :default_directory => $download_directory
        },
        :safebrowsing => {
            :enabled => true
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
      ENV['DEVICE'] = dut
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
        },
        :safebrowsing => {
            :enabled => true
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
      ENV['DEVICE'] = dut
      mobile_emulation = {"deviceName" => dut}
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = {'prefs' => chrome_prefs, 'mobileEmulation' => mobile_emulation}
    end

    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 30 # Browser launch can take a while
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
    client.timeout = 30 # Browser launch can take a while
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
    client.timeout = 30 # Browser launch can take a while
    begin
      attempts = 0
      Watir::Browser.new(:remote, :url => url, :desired_capabilities => config, http_client: client)
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
