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
  @technologies_with_downloads = get_available_downloads[0]
  @available_downloads = get_available_downloads
  @products_with_buzz = get_products_with_links('buzz.html.slim')[0]
end

Before('@accepted_terms') do
  @site_user = accepted_terms_user
end

Before('@password_reset') do
  @site_user = password_reset_user
end

Before('@site_user') do
  @site_user = generate_user
end

Before('@rhd_social_test_user01') do
  @git_username = 'rhdalreadyregistered01'
  @git_password = 'P@$$word01'
  @git_email = 'redhat-developers-testers+rhdalreadyregistered01@redhat.com'
  @github_admin = GitHubAdmin.new(@git_username, @git_password)
end

Before('@rhd_social_test_user02') do
  @git_username = 'rhdalreadyregistered02'
  @git_password = 'P@$$word01'
  @git_email = 'redhat-developers-testers+rhdalreadyregistered02@redhat.com'
  @github_admin = GitHubAdmin.new(@git_username, @git_password)
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

After('@keycloak_teardown') do
  keycloak_admin = KeyCloak.new
  puts "Deleting email: #{@email_address} from Keycloak admin"
  keycloak_admin.delete_user(@email_address)
  puts "Deleted user with email #{@email_address} from Keycloak Admin"
end

After('@keycloak_social_teardown') do
  keycloak_admin = KeyCloak.new
  keycloak_admin.remove_social_provider(@email_address)
  puts 'Removed social provider'
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

