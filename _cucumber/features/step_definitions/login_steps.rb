Given(/a registered visitor has logged in$/) do
  @page.login.open
  @page.login.with_existing_account(@email_address, @password)
  expect(@page.current_page).to be_logged_in
end

When(/^I try to log in with (an|a) (valid|incorrect|invalid) (password|email)$/) do |arg, negate, email_password|
  case email_password
    when 'password'
      @page.login.with_existing_account(@email_address, @password) if negate.eql?('valid')
      @page.login.with_existing_account(@email_address, 'password') if negate.eql?('incorrect')
    when 'email'
      @page.login.with_existing_account(@email_address, @password) if negate.eql?('valid')
      @page.login.with_existing_account('email@fake_email.com', @password) if negate.eql?('incorrect')
      @page.login.with_existing_account('xxx@xxx', 'password') if negate.eql?('invalid')
  end
end

When(/^I click on Login with your existing account$/) do
  @page.login.login_with_existing_account.click
end

Then(/^the login attempt should be (unsuccessful|successful)$/) do |result|
  if result.eql?('successful')
    expect(@page.current_page).to be_logged_in
  else
    expect(@page.current_page).to be_logged_out
  end
end

And(/^the following error message should be displayed: (.*)$/) do |message|
  expect(@page.login.error_message).to have_text(message)
end

And(/^I (request a password reset|reset my password)$/) do |negate|
  click_link('Forgot Password?')
  @page.forgot_password.enter_email(@email_address)
end

And(/^I should receive an email containing a password reset link$/) do
  password_reset_link = get_email(@email_address)
  expect(password_reset_link.to_s).to include('reset-credentials?')
end

When(/^I navigate to the password reset URL$/) do
  password_reset_link = get_email(@email_address)
  url = password_reset_link.to_s.gsub(Capybara.app_host, '')
  visit(url)
end

When(/^I update my password$/) do
  @page.password_reset.update_password
end

When(/^I click on the Create account link$/) do
   @page.login.click_register_link
end

Then(/^(I|they) should be redirected to the RHD Log in page$/) do |negate|
  expect(@page.login).to have_username_field
end
