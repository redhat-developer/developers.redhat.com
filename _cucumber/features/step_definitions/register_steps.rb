When(/^I click to register with my GitHub account$/) do
  @page.registration.click_register_with_github
end

When(/^I try to register with an invalid email address$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], 'email.co.uk', @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
end

When(/^I try to register with an existing RHD registered email$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], 'uk.redhat.test.user+full-site-user@gmail.com', @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
  @page.registration.create_account
end

When(/^I register a new account using my GitHub account$/) do
  @site_user = @github_admin.generate_user
  @email_address = @site_user[:email]
  @github_admin.update_profile("#{@site_user[:first_name].upcase} #{@site_user[:last_name].upcase}", @email_address, @site_user[:company_name])
  puts "Added new email to Github profile: #{@email_address}"

  @page.registration.click_register_with_github
  @page.github.login(@git_username, @git_password)
  @page.github.authorize_app
end

When(/^I try to link a GitHub account to an existing account$/) do
  @site_user = @github_admin.generate_user
  @email_address = @git_email
  @github_admin.update_profile("#{@site_user[:first_name].upcase} #{@site_user[:last_name].upcase}", @email_address, @site_user[:company_name])
  @page.registration.click_register_with_github
  @page.github.login(@git_username, @git_password)
  @page.github.authorize_app
end

When(/^I register a new account using a GitHub account that contains missing profile information$/) do
  @site_user = @github_admin.generate_user
  @email_address = @site_user[:email]
  @github_admin.update_profile('', @email_address, '')
  puts "Added new email to Github profile: #{@email_address}"

  @page.registration.click_register_with_github
  @page.github.login(@git_username, @git_password)
  @page.github.authorize_app
end

When(/^I try to register using a GitHub account that contains missing profile information with an existing RHD registered email$/) do
  @site_user = @github_admin.generate_user
  @email_address = @git_email
  @github_admin.update_profile('', @email_address, '')
  puts "Added existing RHD email to Github profile: #{@email_address}"

  @page.registration.click_register_with_github
  @page.github.login(@git_username, @git_password)
  @page.github.authorize_app
end

When(/^I complete the registration form$/) do
  @page.registration.fill_in_form(@site_user[:first_name], @site_user[:last_name], @site_user[:email], @site_user[:company_name], @site_user[:country], @site_user[:password], @site_user[:password])
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

Then(/^I should see a warning that the email is already registered$/) do
  expect(@page.link_to_github.error).to eq "User account already exists for email #{@email_address}."
end

Then(/^I should be asked to fill in mandatory information with a message "([^"]*)"$/) do |message|
  @page.additional_information.feedback.should == message
end

When(/^I complete the required additional information$/) do
  @page.additional_information.fill_in(nil, @site_user[:first_name], @site_user[:last_name], @site_user[:company_name], @site_user[:country])
  @page.additional_information.click_submit
end

When(/^I select to Choose another email$/) do
  @page.link_to_github.click_on_choose_another_email
end

And(/^I complete the required additional information with a new email address$/) do
  @email_address = @site_user[:email]
  puts "Adding new email: #{@site_user[:email]}"
  @page.additional_information.fill_in(@email_address, nil, nil, nil, @site_user[:country])
  @page.additional_information.click_submit
end

Then(/^I should receive an email containing a verify email link$/) do
  @verification_email = get_email(@email_address)
  puts "Verification link was: #{@verification_email}"
  expect(@verification_email.to_s).to include('first-broker-login?')
end

And(/^I click on the Send Verification email button$/) do
  @page.link_to_github.click_send_verification_email
end

And(/^I navigate to the verify email link$/) do
  @driver.get(@verification_email)
end
