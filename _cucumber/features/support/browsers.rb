# This class contains all the code for required to setup the desired browser under test
class Browsers

  attr_reader :browser

  def initialize(browser_name)
    @browser = setup(browser_name)
  end

  private

  def setup(browser_name)
    case browser_name
      when browser_name.include?('bs_')
        browserstack(browser_name)
      when 'chrome'
        browser = chrome
      when 'docker_chrome'
        browser = docker_chrome
      when 'docker_firefox'
        browser = docker_firefox
      else
        browser = default(browser_name)
    end
    browser
  end

  def default(browser_name)
    json = File.read('_cucumber/driver/device_config/chromium_devices.json')
    config = JSON.parse(json)
    if config.include?(browser_name)
      dut = config[browser_name]['device']['name']
      if ENV['RHD_DOCKER_DRIVER'].to_s.empty?
        browser = chrome(dut)
      else
        browser = docker_chrome(dut)
      end
    else
      fail("#{browser_name} is not a valid browser or device!")
    end
    browser
  end

  def chrome(device_name = nil)
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')
    FileUtils.mkdir_p $download_directory

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

    chromedriver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os}", 'chromedriver')
    Selenium::WebDriver::Chrome.driver_path = chromedriver_path

    if device_name.nil?
      caps = Selenium::WebDriver::Remote::Capabilities.chrome
      caps['chromeOptions'] = { 'prefs' => chrome_prefs }
    else
      ENV['DEVICE'] = device_name
      mobile_emulation = { 'deviceName' => device_name }
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = { 'prefs' => chrome_prefs, 'mobileEmulation' => mobile_emulation }
    end
    Watir::Browser.new(:chrome, desired_capabilities: caps)
  end

  def docker_chrome(device_name = nil)
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')

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

    chrome_switches = %w(--ignore-certificate-errors --disable-popup-blocking --incognito)
    caps_opts = { 'chrome.switches' => chrome_switches }

    if device_name.nil?
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = { 'prefs' => chrome_prefs }
    else
      ENV['DEVICE'] = device_name
      mobile_emulation = { 'deviceName' => device_name }
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = { 'prefs' => chrome_prefs, 'mobileEmulation' => mobile_emulation }
    end

    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 300 # Browser launch can take a while

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

  def docker_firefox
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')

    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.dir'] = $download_directory
    profile['browser.download.folderList'] = 2
    profile['browser.helperApps.neverAsk.saveToDisk'] = 'text/html, charset=UTF-8, application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
    profile['pdfjs.disabled'] = true
    profile['acceptSslCerts'] = true
    caps = Selenium::WebDriver::Remote::Capabilities.firefox(firefox_profile: profile)
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 100 # Browser launch can take a while
    Watir::Browser.new(:remote, url: ENV['SELENIUM_HOST'], desired_capabilities: caps, http_client: client)
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
    client.timeout = 100 # Browser launch can take a while
    Watir::Browser.new(:remote, url: url, desired_capabilities: config, http_client: client)
  end

end
