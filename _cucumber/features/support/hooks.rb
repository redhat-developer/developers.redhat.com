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
  $browser.goto('https://github.com/logout')
  $browser.button(text: 'Sign out').click
  sleep(1.5) # give it time to log out without relying on github elememts.
  $browser.driver.manage.delete_all_cookies
end

After('@github_logout') do
  $browser.goto('https://github.com/logout')
  $browser.button(text: 'Sign out').click
  sleep(1.5) # give it time to log out without relying on github elememts.
  $browser.driver.manage.delete_all_cookies
end

After('@logout') do
  case $host_to_test
    when 'https://developers.redhat.com', 'https://developers.redhat.com'
      $browser.goto('https://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
    else
      $browser.goto('https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
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
    Dir.mkdir("#{$cucumber_dir}/screenshots") unless Dir.exist?("#{$cucumber_dir}/screenshots")
    screenshot = "#{$cucumber_dir}/screenshots/#{ENV['RHD_TEST_PROFILE']}/FAILED_#{scenario.name.sub(' ', '_').sub(/[^0-9A-Za-z_]/, '')}.png"
    $browser.driver.save_screenshot(screenshot)
    embed screenshot, 'image/png'
  end
end
