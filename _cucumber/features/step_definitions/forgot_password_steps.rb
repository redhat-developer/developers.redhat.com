When(/^submit my email address$/) do
  on ForgotPasswordPage do |page|
    page.enter_email($site_user[:email])
  end
end

And(/^I should receive an email containing a password reset link$/) do
  password_reset_link = get_email($site_user[:email])
  expect(password_reset_link.to_s).to include('reset-credentials?')
end

When(/^I navigate to the password reset URL$/) do
  password_reset_link = get_email($site_user[:email])
  @driver.get(password_reset_link)
end

Then(/^I should see a confirmation message: "([^"]*)"$/) do |message|
  expect(@current_page.kc_feedback).to eq message
end

When(/^I update my password$/) do
  on UpdatePasswordPage do |page|
    page.submit_new_password
  end
end
