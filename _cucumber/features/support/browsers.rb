class Browsers

  attr_reader :browser

  def initialize(browser_name)
    @browser = setup(browser_name)
    maximize_window
    delete_cookies
  end

  def maximize_window
    @browser.driver.manage.window.maximize
  end

  def delete_cookies
    @browser.driver.manage.delete_all_cookies
  end

  private

  def setup(browser_name)

    case browser_name
      when 'chrome'
        browser = local_chrome
      when 'docker_chrome'
        browser = docker_chrome
      when 'browserstack_firefox'
        browser = browserstack_firefox
      when 'browserstack_chrome'
        browser = browserstack_chrome
      when 'browserstack'
        browser = browserstack
      else
        browser = local_chrome
    end
    browser
  end

  $chrome_prefs = {
      'download' => {
          'prompt_for_download' => false,
      },
      'profile' => {
          'default_content_settings' => {'multiple-automatic-downloads' => 1},
          'default_content_setting_values' => {'automatic_downloads' => 1},
          'password_manager_enabled' => false,
          'gaia_info_picture_url' => true,
      },
      'safebrowsing' => {
          'enabled' => true,
      },
  }

  def local_chrome
    chromedriver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os.to_s}", "chromedriver")
    Selenium::WebDriver::Chrome.driver_path = chromedriver_path
    Watir::Browser.new(:chrome, :prefs => $chrome_prefs)
  end

  def docker_chrome
    # Specify the driver path
    chromedriver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os.to_s}", "chromedriver")
    Selenium::WebDriver::Chrome.driver_path = chromedriver_path
    caps = Selenium::WebDriver::Remote::Capabilities.chrome
    caps['chromeOptions'] = {'prefs' => $chrome_prefs}
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

  # # needed to set the custom download capabilities in oder to test downloads
  def browserstack_chrome
    job_name = "RHD Acceptance Tests - Chrome on Windows 8.1: #{Time.now.strftime '%Y-%m-%d %H:%M'}"

    caps = Selenium::WebDriver::Remote::Capabilities.new
    caps['chromeOptions'] = {'prefs' => $chrome_prefs}
    caps['chromeOptions']['args'] = %w[--disable-popup-blocking --ignore-ssl-errors --disable-download-protection]
    caps['browser'] = 'Chrome'
    caps['os'] = 'Windows'
    caps['os_version'] = '8.1'
    caps['project'] = job_name
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

  # needed to set the custom download capabilities in oder to test downloads
  def browserstack_firefox
    job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    profile = Selenium::WebDriver::Remote::Capabilities.new
    profile['browser.download.folderList'] = 1
    profile['browser.helperApps.neverAsk.saveToDisk'] = 'application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
    profile['pdfjs.disabled'] = true

    caps = Selenium::WebDriver::Remote::Capabilities.firefox(:firefox_profile => profile)
    caps['browser'] = 'Firefox'
    caps['browser_version'] = '47.0'
    caps['os'] = 'Windows'
    caps['os_version'] = '10'
    caps['project'] = job_name
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

  # for nightly cross browser testing jobs (ignoring downloads)
  def browserstack
    job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    stack_to_use = ENV['RHD_BS_STACK'] || 'chrome'
    json = JSON.load(open('_cucumber/browserstack/browsers.json'))
    config = json[stack_to_use]
    config['browserstack.debug'] = 'true'
    config['project'] = job_name
    config['acceptSslCerts'] = 'true'
    config['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => config)
  end

end
