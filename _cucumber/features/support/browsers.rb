# This class contains all the code for required to setup the desired browser under test
class Browsers

  attr_reader :browser

  def initialize(browser_name, device)
    @browser = setup(browser_name, device)
  end

  def setup(browser_name, device)
    if browser_name.include?('bs_')
      fail('To use browserstack you must set the RHD_BS_USERNAME & RHD_BS_AUTHKEY env variables in your path') if ENV['RHD_BS_USERNAME'].nil? || ENV['RHD_BS_AUTHKEY'].nil?
      browser = browserstack(browser_name)
    else
      case browser_name
        when 'chrome'
          browser = chrome(device, ENV['RHD_REMOTE_DRIVER'])
        when 'firefox'
          browser = firefox
        else
          browser = chrome(device, ENV['RHD_REMOTE_DRIVER'])
      end
    end
    browser
  end

  def chrome(device, remote = nil)
    $download_directory = File.join("#{$cucumber_dir}/", 'tmp_downloads')
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

    if device.nil?
      caps = Selenium::WebDriver::Remote::Capabilities.chrome
      caps['chromeOptions'] = { 'prefs' => chrome_prefs }
    else
      ENV['DEVICE'] = device
      mobile_emulation = { 'deviceName' => device }
      caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
      caps['chromeOptions'] = { 'prefs' => chrome_prefs, 'mobileEmulation' => mobile_emulation }
    end
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 300
    if remote.nil?
      Watir::Browser.new(:chrome, desired_capabilities: caps, http_client: client)
    else
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

  def firefox
    $download_directory = File.join("#{$cucumber_dir}/", 'tmp_downloads')
    FileUtils.mkdir_p $download_directory
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.dir'] = $download_directory
    profile['browser.download.folderList'] = 2
    profile['browser.helperApps.neverAsk.saveToDisk'] = 'text/html, charset=UTF-8, application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
    profile['pdfjs.disabled'] = true
    profile['acceptSslCerts'] = true
    caps = Selenium::WebDriver::Remote::Capabilities.firefox(firefox_profile: profile)
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.open_timeout = 100 # Browser launch can take a while
    Watir::Browser.new(:remote, url: ENV['SELENIUM_HOST'], desired_capabilities: caps, http_client: client)
  end

  def browserstack(stack_to_use)
    json = JSON.load(open("#{$cucumber_dir}/driver/browserstack/browsers.json"))
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
