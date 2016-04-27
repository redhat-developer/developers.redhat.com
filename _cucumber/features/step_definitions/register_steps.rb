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

When(/^I complete the (extended registration|registration) form and accept the terms and conditions$/) do |negate|
  if negate.include?('extended')
    @page.registration.fill_in_extended_form(@site_user[:email], @site_user[:password], @site_user[:password], @site_user[:greeting], @site_user[:first_name], @site_user[:last_name], @site_user[:company_name], @site_user[:address_line_one], @site_user[:city], @site_user[:postal_code], @site_user[:country], @site_user[:phone_number])
    @page.registration.checkall_tac.click
    @page.registration.create_account_and_download.click
  else
    @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
    @page.registration.accept_terms.click
    @page.registration.create_account
  end
end

Then(/^I should see the following confirmation message: (.*)/) do |message|
  expect(@page.registration.confirmation).to have_text(message)
end

When(/^I try to enter passwords that do not match$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], 'password')
  @page.registration.finish_button.click
end


Then(/^I should see a "([^"]*)" error  with "([^"]*)"$/) do |field, field_warning|
  expect(@page.registration.send("#{field.downcase.tr(' ', '_')}_error")).to have_text field_warning
end


Then(/^I should see the extended registration page with a message "([^"]*)"$/) do |message|
  expect(@page.registration).to have_text message
end

When(/^I try to register with an invalid email address$/) do
  @page.registration.email_field.set 'email.co.uk'
  @page.registration.finish_button.click
end

When(/^I complete the registration with an empty "([^"]*)"$/) do |field|
  case field
    when 'email'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], nil, @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
    when 'password'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], nil, @site_user[:password])
    when 'password confirm'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], nil)
    when 'first name'
      @page.registration.fill_in_form(nil, @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
    when 'last name'
      @page.registration.fill_in_form(@site_user[:first_name], nil, @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
    when 'company'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], nil, @site_user[:country], @site_user[:password], @site_user[:password])
    when 'country'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], nil, @site_user[:password], @site_user[:password])
    else
      raise("#{field} was not a recognised field")
  end
  @page.registration.finish_button.click
end

When(/^I try to register with an existing RHD registered email$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], 'uk.redhat.test.user+full-site-user@gmail.com', @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.finish_button.click
end

Then(/^I should see the Registration page$/) do
  expect(page).to have_text 'Register for an account by filling out this form.'
end