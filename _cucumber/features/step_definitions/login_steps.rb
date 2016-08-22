Given(/^I log in with (an|a) (valid|incorrect) password$/) do |arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with($site_user[:email], $site_user[:password])
    else
      page.login_with($site_user[:email], 'incorrect')
    end
  end
end

Given(/^I log in with (an|a) (valid|incorrect) username$/) do |arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with($site_user[:username], $site_user[:password])
    else
      page.login_with('fail', 'password')
    end
  end
end

Given(/^I log in with (an|a) (valid|invalid) email address$/) do |arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with($site_user[:email], $site_user[:password])
    else
      page.login_with('testUser.com', 'P@$$word01')
    end
  end
end

When(/^I log in with an active OpenShift\.com account$/) do
  it_admin = ItAdmin.new
  $site_user = it_admin.create_simple_user
  puts "Created simple user #{$site_user[:email]}"

  on LoginPage do |page|
    page.login_with($site_user[:email], $site_user[:password])
  end
end

When(/^I log in with a (active|deactivated) Customer portal account$/) do |negate|
  it_admin = ItAdmin.new
  if negate == 'active'
    $site_user = it_admin.create_full_user
  else
    $site_user = it_admin.create_full_user
    it_admin.disable_user($site_user[:email])
  end
  on LoginPage do |page|
    page.login_with($site_user[:email], $site_user[:password])
  end
end

When(/^I log in with an account that is already linked to my Github account$/) do

  # register new user via keycloak api
  keycloak = KeyCloak.new
  $site_user = keycloak.register_new_user

  # link a social provider to newly registered customer using keycloak api
  $site_user = $site_user.merge(github_account_holder)
  keycloak.link_social_provider($site_user[:email], $site_user[:identity_provider], $site_user[:user_id], $site_user[:user_name])

  on LoginPage do |page|
    page.click_login_with_github
  end
  on GitHubPage do |page|
    page.login_with($site_user[:user_name], $site_user[:git_password])
  end
end

Then(/^I should be logged in$/) do
  expect(@current_page.logged_in?).to eq $site_user[:full_name]
end

Then(/^I should still be be logged in on the Home page$/) do
  expect(@current_page.logged_in?).to eq $site_user[:full_name]
  on HomePage do |page|
    expect(page.title).to eq 'Red Hat Developers'
  end
end

Then(/^I should be logged out$/) do
  expect(@current_page.logged_out?).to be true
end

And(/^the following error message should be displayed: (.*)$/) do |message|
  on LoginPage do |page|
    expect(page.error_message).to eq message
  end
end

And(/^I click the forgot password link$/) do
  on LoginPage do |page|
    page.click_password_reset
    page.wait_for_ajax
  end
end

Then(/^I should be redirected to the RHD Log in page$/) do
  on LoginPage do |page|
    expect(page.title).to eq 'Login | Red Hat Developers'
  end
end

When(/^I click on the Create account link$/) do
  on LoginPage do |page|
    page.click_register_link
  end
end
