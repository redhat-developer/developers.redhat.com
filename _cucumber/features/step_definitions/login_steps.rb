Given(/^I log in with (an|a) (valid|incorrect) password$/) do |arg, negate|
  if negate.eql?('valid')
    @page.login.with_existing_account(@site_user[:email], @site_user[:password])
  else
    @page.login.with_existing_account(@site_user[:email], 'incorrect')
  end
end

Given(/^I log in with (an|a) (valid|incorrect) username$/) do |arg, negate|
  if negate.eql?('valid')
    @page.login.with_existing_account(@site_user[:username], @site_user[:password])
  else
    @page.login.with_existing_account('fail', @site_user[:password])
  end
end

Given(/^I log in with (an|a) (valid|invalid) email address$/) do |arg, negate|
  if negate.eql?('valid')
    @page.login.with_existing_account(@site_user[:email], @site_user[:password])
  else
    @page.login.with_existing_account('testUser.com', @site_user[:password])
  end
end

Then(/^I should be logged in$/) do
  expect(@page.site_nav.logged_in?).to eq @site_user[:name]
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
