Before('@stubbed') do |scenario|
  puts 'switching to phantomjs driver'
  env_vars = %w(RHD_HEADLESS_MODE STUBBED_DATA)
  env_vars.each { |var| ENV.delete(var) }
  ENV['RHD_HEADLESS_MODE'] = 'true'
  ENV['STUBBED_DATA'] = 'true'
  @browser = Browsers.setup('headless')
  $browser = @browser
  Billy.configure do |c|
    c.cache = true
    c.cache_request_headers = false
    c.whitelist = %w(cdn.ravenjs.com www.redhat.com developers.stage.redhat.com assets.adobedtm.com www.youtube.com static.jboss.org maxcdn.bootstrapcdn.com cdn.tt.omtrdc.net redhat.sc.omtrdc.net s.ytimg.com dpm.demdex.net dpal-itmarketing.itos.redhat.com issues.jboss.org redhat.tt.omtrdc.net)
    c.path_blacklist = []
    c.merge_cached_responses_whitelist = []
    c.persist_cache = true
    c.ignore_cache_port = true # defaults to true
    c.non_successful_cache_disabled = false
    feature_name = scenario.feature.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')
    scenario_name = scenario.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')
    c.cache_path = "_cucumber/lib/fixtures/req_cache/#{feature_name}/#{scenario_name}/"
    FileUtils.mkdir_p(Billy.config.cache_path) unless File.exist?(Billy.config.cache_path)
  end
end

After('@stubbed') do |_scenario|
  puts("switching back to #{ENV['RHD_JS_DRIVER']} driver")
  env_vars = %w(RHD_HEADLESS_MODE STUBBED_DATA)
  env_vars.each { |var| ENV.delete(var) }
  ENV['RHD_HEADLESS_MODE'] = 'false'
  ENV['STUBBED_DATA'] = 'false'
  @browser = Browsers.setup(ENV['RHD_JS_DRIVER'])
  $browser = @browser
end

Before('@products') do
  @products_with_learn_link = products_with_links('learn.html.slim')[0]
  @products_with_docs = products_with_links('docs-and-apis.adoc')[0]
  @products_with_get_started = products_with_links('get-started.adoc')[0]
  @technologies_with_downloads = expected_downloads[0]
  @products_with_buzz = products_with_links('buzz.html.slim')[0]
  @products_with_help = products_with_links('help.html.slim')[0]
end

After('@delete_user') do
  keycloak_admin = KeyCloakAdmin.new
  puts "Deleting user: #{@site_user.details[:email]}"
  keycloak_admin.delete_user(@site_user.details[:email])
end

After('@unlink_social_provider') do
  keycloak_admin = KeyCloakAdmin.new
  keycloak_admin.unlink_social_provider(@site_user.details[:email])
end

After('@github_teardown') do
  @github_admin.cleanup
  @browser.goto('https://github.com/logout')
  @browser.button(text: 'Sign out').click
  sleep(1.5) # give it time to log out without relying on github elememts.
  @browser.driver.manage.delete_all_cookies
end

After('@github_logout') do
  @browser.goto('https://github.com/logout')
  @browser.button(text: 'Sign out').click
  sleep(1.5) # give it time to log out without relying on github elememts.
  @browser.driver.manage.delete_all_cookies
end

After('@logout') do
  case $host_to_test
    when 'https://developers.redhat.com', 'https://developers.redhat.com'
      @browser.goto('https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
    else
      @browser.goto('https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
  end
end

Before('@clear_download') do
  DownloadHelper.clear_downloads
end

After('@clear_download') do
  DownloadHelper.clear_downloads
end

After do |scenario|
  if scenario.failed?
    Dir.mkdir('screenshots') unless Dir.exist?('_cucumber/screenshots')
    screenshot = "_cucumber/screenshots/#{ENV['RHD_TEST_PROFILE']}/FAILED_#{scenario.name.sub(' ', '_').sub(/[^0-9A-Za-z_]/, '')}.png"
    @browser.driver.save_screenshot(screenshot)
    embed screenshot, 'image/png'
  end
end
