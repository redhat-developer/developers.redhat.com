class Browser

  attr_reader :driver

  def initialize(browser_name)
    @driver = setup(browser_name)
    maximize_window
    delete_cookies
  end

  def maximize_window
    @driver.manage.window.maximize
  end

  def delete_cookies
    @driver.manage.delete_all_cookies
  end

  private

  def setup(browser_name)

      case browser_name
        when 'firefox'
          driver = local_firefox
        when 'docker_firefox'
          driver =  docker_firefox
        when 'browserstack_firefox'
          driver = browserstack_firefox
        when 'chrome'
          driver = local_chrome
        when 'docker_chrome'
          driver = docker_chrome
        when 'browserstack_chrome'
          driver = browserstack_chrome
        when 'browserstack'
          driver = browserstack(ENV['RHD_BS_BROWSER'])
        else
          driver = local_chrome
      end
      driver
  end

  def local_firefox
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.folderList'] = 1
    profile['browser.helperApps.neverAsk.saveToDisk'] = 'application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
    profile['pdfjs.disabled'] = true
    Selenium::WebDriver.for(:firefox, :profile => profile)
  end

  def docker_firefox
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.folderList'] = 1
    profile['browser.helperApps.neverAsk.saveToDisk'] = 'application/zip, application/java-archive, application/octet-stream, application/jar, images/jpeg, application/pdf'
    profile['pdfjs.disabled'] = true
    caps = Selenium::WebDriver::Remote::Capabilities.firefox(:firefox_profile => profile)
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 90
    Selenium::WebDriver.for(:remote, :url => ENV['SELENIUM_HOST'], :desired_capabilities => caps, :http_client => client)
  end

  # needed to set the custom download capabilities in oder to test downloads
  def browserstack_firefox
    job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    profile = Selenium::WebDriver::Firefox::Profile.new
    profile['browser.download.folderList'] = 1
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
    Selenium::WebDriver.for(:remote, :url => url, :desired_capabilities => caps)
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
    caps = Selenium::WebDriver::Remote::Capabilities.chrome
    caps['chromeOptions'] = {'prefs' => $chrome_prefs}
    Selenium::WebDriver.for(:chrome, :switches => %w[--disable-popup-blocking --ignore-ssl-errors=yes], :desired_capabilities => caps)
  end

  def docker_chrome
    caps = Selenium::WebDriver::Remote::Capabilities.chrome
    caps['chromeOptions'] = {'prefs' => $chrome_prefs}
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.timeout = 300 # Browser launch can take a while
    begin
      attempts = 0
      Selenium::WebDriver.for(:remote, :url => ENV['SELENIUM_HOST'], :desired_capabilities => caps, http_client: client)
    rescue Net::ReadTimeout => e
      if attempts == 0
        attempts += 1
        retry
      else
        raise(e)
      end
    end
  end

  # needed to set the custom download capabilities in oder to test downloads
  def browserstack_chrome
    job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"

    caps = Selenium::WebDriver::Remote::Capabilities.chrome
    caps['chromeOptions'] = {'prefs' => $chrome_prefs}
    caps['chromeOptions']['args'] = %w[--disable-popup-blocking --ignore-ssl-errors --disable-download-protection]
    caps['browser'] = 'Chrome'
    caps['browser_version'] = '49.0'
    caps['os'] = 'OS X'
    caps['os_version'] = 'El Capitan'
    caps['project'] = job_name
    caps['browserstack.debug'] = 'true'
    caps['acceptSslCerts'] = 'true'
    caps['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Selenium::WebDriver.for(:remote, :url => url, :desired_capabilities => caps)
  end

  # for nightly cross browser testing jobs (ignoring downloads)
  def browserstack(browser)
    job_name = "RHD Acceptance Tests - #{Time.now.strftime '%Y-%m-%d %H:%M'}"
    stack_to_use = browser
    json = JSON.load(open('_cucumber/browserstack/browsers.json'))
    config = json[stack_to_use]
    config['browserstack.debug'] = 'true'
    config['project'] = job_name
    config['acceptSslCerts'] = 'true'
    config['browserstack.local'] = 'true'
    url = "http://#{ENV['RHD_BS_USERNAME']}:#{ENV['RHD_BS_AUTHKEY']}@hub.browserstack.com/wd/hub"
    Selenium::WebDriver.for(:remote, :url => url, :desired_capabilities => config)
  end

end