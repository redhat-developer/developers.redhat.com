require 'json'

#
# End to end test helper module which the RunTestOptions class will include
#
module E2ETestOptionsHelper

  #
  # supported browsers for local and docker selenium browsers
  #
  def supported_browsers
    %w[chrome firefox]
  end

  #
  # Checks that the user has supplied us with a valid supported browser
  #
  def bind_browser_environment_variables(run_in_docker, browser, test_configuration)
    chromium_devices = File.read('_tests/e2e/config/browsers/chromium_devices.json')
    available_mobile_devices = JSON.parse(chromium_devices)
    if browser == 'chrome'
      if run_in_docker
        test_configuration[:docker_node] = 'chrome'
        bind_environment_variable('RHD_DOCKER_DRIVER', 'chrome')
      end
      bind_environment_variable('RHD_JS_DRIVER', 'chrome')
    elsif browser == 'firefox'
      if run_in_docker
        test_configuration[:docker_node] = 'firefox'
        bind_environment_variable('RHD_DOCKER_DRIVER', 'firefox')
      end
      bind_environment_variable('RHD_JS_DRIVER', 'firefox')
    elsif available_mobile_devices.include?(browser)
      # return mobile device name, for example iPhone 8
      if run_in_docker
        test_configuration[:docker_node] = 'chrome'
        bind_environment_variable('RHD_DOCKER_DRIVER', 'chrome')
      end
      bind_environment_variable('RHD_JS_DRIVER', browser)
    else
      if run_in_docker
        bind_environment_variable('RHD_DOCKER_DRIVER', 'chrome')
      end
      bind_environment_variable('RHD_JS_DRIVER', browser)
    end
  end

  #
  # Checks that the user has supplied us with a valid supported browser
  #
  def check_supported_browser(browser)
    return if supported_browsers.include?(browser)
    if browser.include?('bs_')
      browserstack_browsers = '_tests/e2e/config/browsers/remote_browsers.json'
      json = File.read(browserstack_browsers)
      config = JSON.parse(json)
      Kernel.abort("Invalid remote browser specified! Browser '#{browser}' \n See available browserstack options here: '#{browserstack_browsers}' \n Set desired stack using --browser=bs_ie_11") unless config.include?(browser)
    else
      # Check that the device being used for emulation is supported by chrome
      driver_config_file = '_tests/e2e/config/browsers/chromium_devices.json'
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
    default_configuration[:docker] = false
    default_configuration[:browserstack] = false
    default_configuration[:keycloak] = false
    default_configuration[:profile] = 'desktop'
    default_configuration
  end

end
