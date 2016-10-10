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
        browser = local_chrome
      when 'iphone'
        browser = local_iphone
      when 'docker_chrome'
        browser = docker_chrome
      when 'docker_firefox'
        browser = docker_firefox
      when 'browserstack_firefox'
        browser = browserstack_firefox
      when 'browserstack_chrome'
        browser = browserstack_chrome
      when 'browserstack_iphone'
        browser = browserstack_iphone
      when 'browserstack_ipad'
        browser = browserstack_ipad
      when 'browserstack_android_phone'
        browser = browserstack_android_phone
      when 'browserstack_android_tab'
        browser = browserstack_android_tab
      when 'browserstack_ie_11'
        browser = browserstack_ie_11
      else
        browser = local_chrome
    end
    browser
  end

  def local_chrome
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
    chromedriver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os.to_s}", "chromedriver")
    Selenium::WebDriver::Chrome.driver_path = chromedriver_path
    Watir::Browser.new(:chrome, :prefs => chrome_prefs)
  end

  def local_iphone
    chromedriver_path = File.join(File.absolute_path('../..', File.dirname(__FILE__)), "driver/#{$os.to_s}", "chromedriver")
    Selenium::WebDriver::Chrome.driver_path = chromedriver_path
    driver = Webdriver::UserAgent.driver(:browser => :chrome, :prefs => $chrome_prefs, :agent => :iphone, :orientation => :portrait)
    Watir::Browser.new(driver)
  end

  def docker_chrome
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
    caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
    caps['chromeOptions'] = {'prefs' => chrome_prefs}
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

  def browserstack_chrome
    FileUtils.mkdir_p $download_directory
    raise('Download directory was not created!') unless Dir.exist?($download_directory)

    chrome_prefs = {
        :download => {
            :prompt_for_download => false,
            :directory_upgrade => true,
            :default_directory => $download_directory
        }
    }
    job_name = "RHD Acceptance Tests - Chrome on Windows 8.1: #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    chrome_switches = %w[--ignore-certificate-errors --disable-popup-blocking]
    caps_opts = {'chrome.switches' => chrome_switches}
    caps = Selenium::WebDriver::Remote::Capabilities.chrome(caps_opts)
    caps['chromeOptions'] = {'prefs' => chrome_prefs}
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

  def browserstack_firefox
    $download_directory = File.join("#{Dir.pwd}/_cucumber", 'tmp_downloads')
    FileUtils.mkdir_p $download_directory
    raise('Download directory was not created!') unless Dir.exist?($download_directory)

    job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.dir'] = @download_dir
    profile['browser.download.folderList'] = 2
    profile['browser.helperApps.neverAsk.saveToDisk'] = 'application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
    profile['pdfjs.disabled'] = true

    caps = Selenium::WebDriver::Remote::Capabilities.firefox(:firefox_profile => profile)
    caps['browser'] = 'Firefox'
    caps['browser_version'] = '47.0'
    caps['os'] = 'OS X'
    caps['os_version'] = 'El Capitan'
    caps['project'] = job_name
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

  def browserstack_iphone
    job_name = "RHD Acceptance Tests iPhone 6s - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    caps = WebDriver::Remote::Capabilities.new
    caps['project'] = job_name
    caps[:browserName] = 'iPhone'
    caps[:platform] = 'MAC'
    caps['device'] = 'iPhone 6S Plus'
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

  def browserstack_ipad
    job_name = "RHD Acceptance Tests iPhone 6s - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    caps = WebDriver::Remote::Capabilities.new
    caps['project'] = job_name
    caps[:browserName] = 'iPad'
    caps[:platform] = 'MAC'
    caps['device'] = 'iPad Air 2'
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

  def browserstack_android_phone
    job_name = "RHD Acceptance Tests iPhone 6s - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    caps = WebDriver::Remote::Capabilities.new
    caps['project'] = job_name
    caps['browserName'] = 'android'
    caps['platform'] = 'ANDROID'
    caps['device'] = 'Samsung Galaxy S5'
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

  def browserstack_android_tab
    job_name = "RHD Acceptance Tests iPhone 6s - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    caps = WebDriver::Remote::Capabilities.new
    caps['project'] = job_name
    caps['browserName'] = 'android'
    caps['platform'] = 'ANDROID'
    caps['device'] = 'Samsung Galaxy Tab 4 10.1'
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

  def browserstack_ie_11
    job_name = "RHD Acceptance Tests Windows 10 - Browser IE 11 - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    caps = Selenium::WebDriver::Remote::Capabilities.new
    caps['browser'] = 'IE'
    caps['browser_version'] = '11.0'
    caps['os'] = 'Windows'
    caps['os_version'] = '10'
    caps['resolution'] = '1024x768'
    caps['project'] = job_name
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Watir::Browser.new(:remote, :url => url, :desired_capabilities => caps)
  end

end
