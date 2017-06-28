require 'json'

#
# End to end test helper module which the RunTestOptions class will include
#
module E2ETestOptionsHelper

  #
  # supported browsers for local and docker selenium browsers
  #
  def supported_browsers
    %w[chrome firefox headless_chrome]
  end

  #
  # Checks that the user has supplied us with a valid supported browser
  #
  def bind_browser_environment_variables(run_in_docker, browser, test_configuration)
    json = File.read("#{@test_dir}/e2e/config/chromium_devices.json")
    config = JSON.parse(json)
    if config.include?(browser)
      # return mobile device name, for example iPhone 6
      test_configuration[:docker_node] = 'chrome' if run_in_docker
      bind_environment_variable('RHD_JS_DRIVER', config[browser]['device']['name'])
    else
      test_configuration[:docker_node] = browser if run_in_docker
      bind_environment_variable('RHD_JS_DRIVER', browser)
    end
  end

  #
  # Checks that the user has supplied us with a valid supported browser
  #
  def check_supported_browser(browser)
    return if supported_browsers.include?(browser)
    if browser.include?('bs_')
      browserstack_browsers = "#{@test_dir}/e2e/config/remote_browsers.json"
      json = File.read(browserstack_browsers)
      config = JSON.parse(json)
      Kernel.abort("Invalid remote browser specified! Browser '#{browser}' \n See available browserstack options here: '#{browserstack_browsers}' \n Set desired stack using --browser=bs_ie_11") unless config.include?(browser)
    else
      # Check that the device being used for emulation is supported by chrome
      driver_config_file = "#{@test_dir}/e2e/config/chromium_devices.json"
      json = File.read(driver_config_file)
      config = JSON.parse(json)
      Kernel.abort("Invalid device specified! Device '#{browser}' was not found. \nSee available test devices here: '#{driver_config_file}'") unless config.include?(browser)
    end
  end

  #
  # Creates a default e2e test configuration
  #
  def create_default_test_configuration
    default_configuration = {}
    default_configuration[:browser] = 'chrome'
    default_configuration[:browser_count] = 2
    default_configuration[:docker] = false
    default_configuration[:browserstack] = false
    default_configuration
  end

end