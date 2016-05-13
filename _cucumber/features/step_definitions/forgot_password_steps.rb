When(/^submit my email address$/) do
  @page.forgot_password.enter_email(@site_user[:email])
end

And(/^I should receive an email containing a password reset link$/) do
  password_reset_link = get_email(@site_user[:email])
  expect(password_reset_link.to_s).to include('reset-credentials?')
end

When(/^I navigate to the password reset URL$/) do
  password_reset_link = get_email(@site_user[:email])
  @driver.get(password_reset_link)
end

Then(/^I should see a confirmation message: "([^"]*)"$/) do |message|
  expect(@page.current_page.confirmation).to eq message
end

When(/^I update my password$/) do
  @page.update_password.submit_new_password
end
