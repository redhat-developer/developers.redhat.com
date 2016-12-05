When(/^submit my email address$/) do
  on ForgotPasswordPage.enter_email(@site_user.details[:email])
end

And(/^I should receive an email containing a password reset link$/) do
  password_reset_link = get_email(@site_user.details[:email])
  expect(password_reset_link.to_s).to include('reset-credentials?')
end

When(/^I navigate to the password reset URL$/) do
  password_reset_link = get_email(@site_user.details[:email])
  @browser.goto(password_reset_link)
end

Then(/^I should see a confirmation message: "([^"]*)"$/) do |message|
  expect(@current_page.kc_feedback).to eq message
end

When(/^I update my password$/) do
  on UpdatePasswordPage.submit_new_password
end
