When(/^I click to register with my GitHub account$/) do
  @page.registration.click_register_with_github
end

When(/^I try to register with an invalid email address$/) do
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], 'email.co.uk', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
  @page.registration.create_account
end

When(/^I try to register with an existing RHD registered email$/) do
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], 'uk.redhat.test.user+full-site-user@gmail.com', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
end

When(/^I register a new account using my GitHub account$/) do
  # log in to Github API
  @github_admin = GitHubAdmin.new('rhdScenarioOne', 'P@$$word01')

  # generate new user and update their Github profile
  $site_user = @github_admin.generate_user_for_session($session_id)
  @github_admin.update_profile("#{$site_user[:first_name].upcase} #{$site_user[:last_name].upcase}", $site_user[:email], $site_user[:company_name])
  puts "Added new email to Github profile: #{$site_user[:email]}"

  # click on register with Github
  @page.registration.click_register_with_github

  # log in to Github and authorize rhd website
  @page.github.login('rhdScenarioOne', 'P@$$word01')
  @page.github.authorize_app
end

When(/^I try to link a GitHub account to an existing account$/) do

  # log in to Github API
  @github_admin = GitHubAdmin.new('rhdScenarioTwo', 'P@$$word01')

  # generate new user and update their Github profile
  keycloak = KeyCloak.new
  $site_user = keycloak.register_new_user
  p "Registered user with email #{$site_user[:email]}"
  @github_admin.update_profile("#{$site_user[:first_name].upcase} #{$site_user[:last_name].upcase}", $site_user[:email], $site_user[:company_name])

  # click on register with Github
  @page.registration.click_register_with_github

  # log in to Github and authorize rhd website
  @page.github.login('rhdScenarioTwo', 'P@$$word01')
  @page.github.authorize_app

  # complete additional information and submit
  @page.additional_information.fill_in(nil, 'P@$$word01', nil, nil, nil, $site_user[:country])
  @page.registration.accept_terms('all')
  @page.additional_information.click_submit

end

When(/^I register a new account using a GitHub account that contains missing profile information$/) do

  # log in to Github API
  @github_admin = GitHubAdmin.new('rhdalreadyregistered01', 'P@$$word01')

  # generate new user and update their Github profile
  $site_user = @github_admin.generate_user_for_session($session_id)

  @github_admin.update_profile('', $site_user[:email], '')
  puts "Added new email to Github profile: #{$site_user[:email]}"

  # click on register with Github
  @page.registration.click_register_with_github

  # log in to Github and authorize rhd website
  @page.github.login('rhdalreadyregistered01', 'P@$$word01')
  @page.github.authorize_app

end

When(/^I try to register using a GitHub account that contains missing profile information with an existing RHD registered email$/) do

  # log in to Github API
  @github_admin = GitHubAdmin.new('rhdalreadyregistered02', 'P@$$word01')

  # generate new user and update their Github profile
  keycloak = KeyCloak.new
  $site_user = keycloak.register_new_user
  p "Registered user with email #{$site_user[:email]}"

  @github_admin.update_profile('', $site_user[:email], '')
  puts "Added existing RHD email to Github profile: #{$site_user[:email]}"

  # click on register with Github
  @page.registration.click_register_with_github

  # log in to Github and authorize rhd website
  @page.github.login('rhdalreadyregistered02', 'P@$$word01')
  @page.github.authorize_app

end

When(/^I complete the registration form$/) do
  $site_user = generate_user
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
  @page.registration.accept_terms('all')
  @page.registration.create_account
end

Then(/^I should see the following terms and conditions checkboxes:$/) do |table|
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  table.raw.each do |row|
    term = row.first
    @page.registration.terms_and_conditions_section.text.should include term
  end
end

And(/^I click accept (all|red hat developer|red hat|red hat portal) terms and conditions$/) do |term|
  @page.registration.accept_terms(term)
end

And(/^I click on the Create Account button$/) do
  @page.registration.create_account
  @date_of_registration = current_date
end

When(/^I complete the registration with an empty "([^"]*)"$/) do |field|
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  case field
    when 'email'
      @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], '', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
    when 'password'
      @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], '', $site_user[:password])
    when 'password confirm'
      @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], '')
    when 'first name'
      @page.registration.fill_in_form('', $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
    when 'last name'
      @page.registration.fill_in_form($site_user[:first_name], '', $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
    when 'company'
      @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], '', $site_user[:country], $site_user[:password], $site_user[:password])
    when 'country'
      @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], nil, $site_user[:password], $site_user[:password])
    else
      raise("#{field} was not a recognised field")
  end
  @page.registration.create_account
end

When(/^I register a new account$/) do
  @page.site_nav.navigate_to('register')
  @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
  @page.registration.create_account
  @page.registration.wait_for_ajax
end

Then(/^I should be registered and logged in$/) do
  expect(@page.site_nav.logged_in?).to eq "#{$site_user[:first_name].upcase} #{$site_user[:last_name].upcase}"
end

When(/^I try to enter passwords that do not match$/) do
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], 'password')
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
  @page.extended_registration.fill_in_extended_form($site_user[:email], $site_user[:password], $site_user[:password], $site_user[:greeting], $site_user[:first_name], $site_user[:last_name], $site_user[:company_name], $site_user[:address_line_one], $site_user[:city], $site_user[:postal_code], $site_user[:country], $site_user[:phone_number])
  @page.extended_registration.checkall_tac
  @page.extended_registration.click_create_account_and_download
end

Then(/^I should see a warning that the email is already registered$/) do
  expect(@page.link_to_github.error).to eq "User account already exists for email #{$site_user[:email]}."
end

When(/^I select to Choose another email$/) do
  @page.link_to_github.click_on_choose_another_email
end

Then(/^I should receive an email containing a verify email link$/) do
  @verification_email = get_email($site_user[:email])
  puts "Verification link was: #{@verification_email}"
  expect(@verification_email.to_s).to include('first-broker-login?')
end

And(/^I click on the Send Verification email button$/) do
  @page.link_to_github.click_send_verification_email
end

And(/^I navigate to the verify email link$/) do
  @page.site_nav.close_and_reopen_browser
  @page.site_nav.get(@verification_email)
  @page.site_nav.wait_for_ajax
end

Then(/^each term should link to relevant terms and conditions page:$/) do |table|
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  table.hashes.each do |row|
    case row[:term]
      when 'Red Hat Developer Program'
        @page.registration.find(link_text: 'Red Hat Developer Program Terms & Conditions').attribute('href').should include row[:url]
      when 'Red Hat Subscription Agreement'
        @page.registration.find(link_text: 'Red Hat Subscription Agreement').attribute('href').should include row[:url]
      when 'Red Hat Portals Terms of Use'
        @page.registration.find(link_text: 'Red Hat Portals Terms of Use').attribute('href').should include row[:url]
      else
        raise("#{row[:term]} is not a recognised term")
    end
  end
end

When(/^I try to register with an existing OpenShift registered email$/) do
  @page.registration.expand_register_choice_email # if the user is on a mobile device
  @page.registration.fill_in_form($site_user[:first_name], $site_user[:last_name], 'velias+emailveriftest@redhat.com', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
end


And(/^the following newly registered details should be added to my profile:$/) do |table|
  table.raw.each do |row|
    element = row.first
    keycloak_admin = KeyCloak.new
    case element
      when 'Username'
        expect(@page.edit_account.username.attribute('value')).to eq $site_user[:email].gsub('@redhat.com', '').gsub('+', '-').gsub('_', '')
      when 'Email'
        expect(@page.edit_account.email.attribute('value')).to eq $site_user[:email]
      when 'First Name'
        expect(@page.edit_account.first_name.attribute('value').downcase).to eq $site_user[:first_name].downcase
      when 'Last name'
        expect(@page.edit_account.last_name.attribute('value').downcase).to eq $site_user[:last_name].downcase
      when 'Company'
        expect(@page.edit_account.company.attribute('value').downcase).to eq $site_user[:company_name].downcase
      when 'Country'
        expect(@page.edit_account.country).to eq $site_user[:country]
      when 'Red Hat Developer Program subscription date'
        reg_date = keycloak_admin.get_registration_date($site_user[:email])
        expect(@page.edit_account.agreement_date.attribute('value')).to eq reg_date
      when 'Privacy & Subscriptions status'
        status = keycloak_admin.get_subscription_status($site_user[:email])
        expect(@page.edit_account.receive_newsletter?).to be status
      else
        raise("#{element} was not a recognised field")
    end
  end
end

And(/^the following additional information should be added to my profile:$/) do |table|
  table.raw.each do |row|
    element = row.first
    keycloak_admin = KeyCloak.new
    case element
      when 'Username'
        expect(@page.edit_account.username.attribute('value')).to eq $site_user[:email]
      when 'Email'
        expect(@page.edit_account.email.attribute('value')).to eq $site_user[:email]
      when 'First Name'
        expect(@page.edit_account.first_name.attribute('value')).to eq $site_user[:first_name]
      when 'Last name'
        expect(@page.edit_account.last_name.attribute('value')).to eq $site_user[:last_name]
      when 'Company'
        expect(@page.edit_account.company.attribute('value')).to eq $site_user[:company_name]
      when 'Country'
        expect(@page.edit_account.country).to eq $site_user[:country]
      when 'Red Hat Developer Program subscription date'
        reg_date = keycloak_admin.get_registration_date($site_user[:email])
        expect(@page.edit_account.agreement_date.attribute('value')).to eq reg_date
      when 'Privacy & Subscriptions status'
        status = keycloak_admin.get_subscription_status($site_user[:email])
        expect(@page.edit_account.receive_newsletter?).to be status
      else
        raise("#{element} was not a recognised field")
    end
  end
end
