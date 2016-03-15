Given(/^I register a new account$/) do
  @page.registration.open
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
  @page.current_page.wait_for_ajax
  expect(@page.current_page).to be_logged_in
end

When(/^I complete the registration form$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
end

Then(/^I should see the following confirmation message: (.*)/) do |message|
  expect(@page.registration.confirmation).to have_text(message)
end

When(/^I try to enter passwords that do not match$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], 'password')
  @page.registration.create_account
end


Then(/^I should see a warning that "([^"]*)"$/) do |field_warning|
  @page.registration.wait_for_password_confirm_field_error
  expect(@page.registration.password_confirm_field_error).to have_text field_warning
end
