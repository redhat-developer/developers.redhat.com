Given(/^I am on the Registration page$/) do
  @page.site_nav.navigate_to('register')
end

When(/^I complete the registration form$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
end

When(/^I register a new account$/) do
  @page.site_nav.navigate_to('register')
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
  @page.registration.wait_for_ajax
end

Then(/^I should be registered and logged in$/) do
  expect(@page.site_nav.logged_in?).to eq "#{@site_user[:first_name].upcase} #{@site_user[:last_name].upcase}"
end

When(/^I try to enter passwords that do not match$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], 'password')
  @page.registration.create_account
end

Then(/^I should see a "([^"]*)" error with "([^"]*)"$/) do |error, field_warning|
  expect(@page.registration.field_validation(error)).to eq field_warning
end

When(/^I try to register with an invalid email address$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], 'email.co.uk', @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
end

When(/^I try to register with an existing RHD registered email$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], 'uk.redhat.test.user+full-site-user@gmail.com', @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
end

When(/^I complete the registration with an empty "([^"]*)"$/) do |field|
  case field
    when 'email'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], '', @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
    when 'password'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], '', @site_user[:password])
    when 'password confirm'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], '')
    when 'first name'
      @page.registration.fill_in_form('', @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
    when 'last name'
      @page.registration.fill_in_form(@site_user[:first_name], '', @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
    when 'company'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], '', @site_user[:country], @site_user[:password], @site_user[:password])
    when 'country'
      @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], nil, @site_user[:password], @site_user[:password])
    else
      raise("#{field} was not a recognised field")
  end
  @page.registration.create_account
end

Then(/^I should see the Registration page$/) do
  @page.registration.verify_page('Register | Red Hat Developers')
end

Then(/^I should see the extended registration page with a message "([^"]*)"$/) do |message|
  expect(@page.extended_registration.registration_hint).to include(message)
end

When(/^I complete the extended registration form and accept the terms and conditions$/) do
  @page.extended_registration.fill_in_extended_form(@site_user[:email], @site_user[:password], @site_user[:password], @site_user[:greeting], @site_user[:first_name], @site_user[:last_name], @site_user[:company_name], @site_user[:address_line_one], @site_user[:city], @site_user[:postal_code], @site_user[:country], @site_user[:phone_number])
  @page.extended_registration.checkall_tac
  @page.extended_registration.click_create_account_and_download
end
