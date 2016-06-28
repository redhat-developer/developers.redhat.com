Before do
  @driver.manage.delete_all_cookies
end

Before('@mobile') do
  resize_window_to_mobile
end

After('@mobile') do
  resize_window_default
end

Before('@products, @downloads') do
  @product_ids = get_products[0]
  @product_names = get_products[1]
  @products_with_learn_link = get_products_with_links('learn.html.slim')[0]
  @products_with_docs = get_products_with_links('docs-and-apis.adoc')[0]
  @products_with_get_started = get_products_with_links('get-started.adoc')[0]
  @technologies_with_downloads = get_available_downloads[0]
  @available_downloads = get_available_downloads
  @products_with_buzz = get_products_with_links('buzz.html.slim')[0]
  @products_with_help = get_products_with_links('help.html.slim')[0]
end

After('@logout') do
  site_nav = SiteNav.new(@driver)
  case $host_to_test
    when 'http://developers.redhat.com', 'https://developers.redhat.com'
      site_nav.get('http://developers.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
    else
      site_nav.get('https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/logout?')
  end
  site_nav.visit
  site_nav.wait_for_ajax
end

# create test user for basic log in feature
Before('@basic_login') do
  unless $created_test_user
    # register user only once, unless otherwise stated
    keycloak = KeyCloak.new
    $site_user = keycloak.register_new_user
    $basic_login = $site_user[:email]
    p "Registered user with email #{$site_user[:email]}"
    $created_test_user = true
  end
end

at_exit {
  if defined?($basic_login)
    keycloak_admin = KeyCloak.new
    keycloak_admin.delete_user($basic_login)
    p "Deleted user with email #{$basic_login}"
  end
}

After('@delete_user') do
  keycloak_admin = KeyCloak.new
  keycloak_admin.delete_user($site_user[:email])
end

After('@unlink_social_provider') do
  keycloak_admin = KeyCloak.new
  keycloak_admin.unlink_social_provider($site_user[:email])
end

After('@github_teardown') do
  @github_admin.cleanup
  nav = Base.new(@driver)
  nav.get('https://github.com/logout')
  nav.wait_for { nav.displayed?(xpath: "//input[@value='Sign out']") }
  nav.click_on(xpath: "//input[@value='Sign out']")
  nav.wait_for { nav.displayed?(css: '.logged-out') }
  @driver.manage.delete_all_cookies
end

After('@github_logout') do
  nav = Base.new(@driver)
  nav.get('https://github.com/logout')
  nav.wait_for { nav.displayed?(xpath: "//input[@value='Sign out']") }
  nav.click_on(xpath: "//input[@value='Sign out']")
  nav.wait_for { nav.displayed?(css: '.logged-out') }
  @driver.manage.delete_all_cookies
end

After do |scenario|
  if scenario.failed?
    screenshot = "_cucumber/screenshots/FAILED_#{scenario.name.gsub(' ', '_').gsub(/[^0-9A-Za-z_]/, '')}.png"
    @driver.save_screenshot(screenshot)
    embed screenshot, 'image/png'
  end
end

def resize_window_to_mobile
  resize_window_by(360, 640)
end

def resize_window_default
  resize_window_by(1400, 1000)
end

def resize_window_by(width, height)
  @driver.manage.window.resize_to(width, height)
end
