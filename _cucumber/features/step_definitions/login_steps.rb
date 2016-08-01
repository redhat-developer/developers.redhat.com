Given(/^I log in with (an|a) (valid|incorrect) password$/) do |arg, negate|
  if negate.eql?('valid')
    @page.login.with_existing_account($site_user[:email], $site_user[:password])
  else
    @page.login.with_existing_account($site_user[:email], 'incorrect')
  end
end

Given(/^I log in with (an|a) (valid|incorrect) username$/) do |arg, negate|
  if negate.eql?('valid')
    @page.login.with_existing_account($site_user[:username], $site_user[:password])
  else
    @page.login.with_existing_account('fail', 'password')
  end
end

Given(/^I log in with (an|a) (valid|invalid) email address$/) do |arg, negate|
  if negate.eql?('valid')
    @page.login.with_existing_account($site_user[:email], $site_user[:password])
  else
    @page.login.with_existing_account('testUser.com', 'P@$$word01')
  end
end

When(/^I log in with an active OpenShift\.com account$/) do
  it_admin = ItAdmin.new
  $site_user = it_admin.create_simple_user
  puts "Created simple user #{$site_user[:email]}"
  @page.login.with_existing_account($site_user[:email], $site_user[:password])
end

When(/^I log in with a (active|deactivated) Customer portal account$/) do |negate|
  it_admin = ItAdmin.new
  if negate == 'active'
    $site_user = it_admin.create_full_user
  else
    $site_user = it_admin.create_full_user
    it_admin.disable_user($site_user[:email])
  end
  @page.login.with_existing_account($site_user[:email], $site_user[:password])
end

When(/^I log in with an account that is already linked to my Github account$/) do

  # register new user via keycloak api
  keycloak = KeyCloak.new
  $site_user = keycloak.register_new_user

  # link a social provider to newly registered customer using keycloak api
  $site_user = $site_user.merge(github_account_holder)
  keycloak.link_social_provider($site_user[:email], $site_user[:identity_provider], $site_user[:user_id], $site_user[:user_name])

  # proceed to login via github
  @page.login.click_login_with_github
  @page.github.login($site_user[:user_name], $site_user[:git_password])

end

Then(/^I should be logged in$/) do
  expect(@page.site_nav.logged_in?).to eq $site_user[:full_name]
end

Then(/^I should still be be logged in on the Home page$/) do
  expect(@page.site_nav.logged_in?).to eq $site_user[:full_name]
  @page.home.verify_page('Red Hat Developers')
end

Then(/^I should be logged out$/) do
  expect(@page.site_nav.logged_out?).to be true
end

And(/^the following error message should be displayed: (.*)$/) do |message|
  expect(@page.login.error_message).to eq message
end

And(/^I click the forgot password link$/) do
  @page.login.click_password_reset
end

Then(/^I should be redirected to the RHD Log in page$/) do
  @page.login.verify_page('Login | Red Hat Developers')
end

When(/^I click on the Create account link$/) do
  @page.login.click_register_link
end

When(/^I accept the RHD terms and conditions$/) do
  @page.additional_information.fulluser_tac_accept
  @page.additional_information.click_submit
end