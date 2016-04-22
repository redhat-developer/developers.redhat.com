Given(/^I register a new account$/) do
  @page.registration.open
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
  expect(@page.confirmation).to have_text 'Thanks for Registering!'
  expect(@page.current_page).to be_logged_in
end

When(/^I complete the registration form$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
end

When(/^I complete the registration form and accept the terms and conditions$/) do
  @page.registration.fill_in_extended_form(@site_user[:email], @site_user[:password], @site_user[:password], @site_user[:greeting], @site_user[:first_name], @site_user[:last_name], @site_user[:company_name], @site_user[:address_line_one], @site_user[:city], @site_user[:postal_code], @site_user[:country], @site_user[:phone_number])
  @page.registration.checkall_tac.click
  @page.registration.create_account_and_download.click
end

Then(/^I should see the following confirmation message: (.*)/) do |message|
  expect(@page.registration.confirmation).to have_text(message)
end

When(/^I try to enter passwords that do not match$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], 'password')
  @page.registration.finish_button.click
end


Then(/^I should see a warning that "([^"]*)"$/) do |field_warning|
  expect(@page.registration.password_confirm_field_error).to have_text field_warning
end


Then(/^I should see the extended registration page with a message "([^"]*)"$/) do |message|
  expect(@page.registration).to have_text message
end