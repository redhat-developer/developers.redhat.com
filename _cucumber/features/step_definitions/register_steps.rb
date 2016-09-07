When(/^I click to register with my GitHub account$/) do
  on RegistrationPage do |page|
    page.click_register_with_github
  end
end

When(/^I try to register with an invalid email address$/) do
  $site_user = generate_user
  on RegistrationPage do |page|
    page.expand_register_choice_email # if the user is on a mobile device
    page.fill_in_form($site_user[:first_name], $site_user[:last_name], 'email.co.uk', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
    page.create_account
  end
end

When(/^I try to register with an existing RHD registered email$/) do
  $site_user = generate_user
  on RegistrationPage do |page|
    page.expand_register_choice_email # if the user is on a mobile device
    page.fill_in_form($site_user[:first_name], $site_user[:last_name], 'uk.redhat.test.user+full-site-user@gmail.com', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
  end
end

When(/^I register a new account using my GitHub account$/) do
  @github_admin = GitHubAdmin.new('rhdScenarioOne', 'P@$$word01')

  # generate new user and update their Github profile
  $site_user = @github_admin.generate_user_for_session($session_id)
  @github_admin.update_profile("#{$site_user[:first_name].upcase} #{$site_user[:last_name].upcase}", $site_user[:email], $site_user[:company_name])
  puts "Added new email to Github profile: #{$site_user[:email]}"

  on RegistrationPage do |page|
    page.click_register_with_github
  end

  on GitHubPage do |page|
    page.login_with('rhdScenarioOne', 'P@$$word01')
    page.authorize_app
  end

end

When(/^I try to link a GitHub account to an existing account$/) do
  @github_admin = GitHubAdmin.new('rhdScenarioTwo', 'P@$$word01')

  # generate new user and update their Github profile
  keycloak = KeyCloak.new
  $site_user = keycloak.register_new_user
  p "Registered user with email #{$site_user[:email]}"
  @github_admin.update_profile("#{$site_user[:first_name].upcase} #{$site_user[:last_name].upcase}", $site_user[:email], $site_user[:company_name])

  on RegistrationPage do |page|
    page.click_register_with_github
  end

  on GitHubPage do |page|
    page.login_with('rhdScenarioTwo', 'P@$$word01')
    page.authorize_app
  end

  on AdditionalInformationPage do |page|
    page.fill_in(nil, 'P@$$word01', nil, nil, nil, $site_user[:country])
    page.accept_all_terms
    page.click_submit
  end

end

When(/^I register a new account using a GitHub account that contains missing profile information$/) do

  # log in to Github API
  @github_admin = GitHubAdmin.new('rhdalreadyregistered01', 'P@$$word01')

  # generate new user and update their Github profile
  $site_user = @github_admin.generate_user_for_session($session_id)

  @github_admin.update_profile('', $site_user[:email], '')
  puts "Added new email to Github profile: #{$site_user[:email]}"

  on RegistrationPage do |page|
    page.click_register_with_github
  end

  on GitHubPage do |page|
    page.login_with('rhdalreadyregistered01', 'P@$$word01')
    page.authorize_app
  end

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

  on RegistrationPage do |page|
    page.click_register_with_github
  end

  on GitHubPage do |page|
    page.login_with('rhdalreadyregistered02', 'P@$$word01')
    page.authorize_app
  end

end

When(/^I complete the registration form$/) do
  $site_user = generate_user
  on RegistrationPage do |page|
    page.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
    page.accept_all_terms
    page.create_account
  end
end

And(/^I click on the Create Account button$/) do
  on RegistrationPage do |page|
    page.create_account
  end
end

When(/^I complete the registration with an empty "([^"]*)"$/) do |field|
  $site_user = generate_user
  on RegistrationPage do |page|
    case field
      when 'email field'
        page.fill_in_form($site_user[:first_name], $site_user[:last_name], '', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
      when 'password field'
        page.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], '', $site_user[:password])
      when 'password confirm field'
        page.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], '')
      when 'first name field'
        page.fill_in_form('', $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
      when 'last name field'
        page.fill_in_form($site_user[:first_name], '', $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
      when 'company field'
        page.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], '', $site_user[:country], $site_user[:password], $site_user[:password])
      when 'country field'
        page.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], nil, $site_user[:password], $site_user[:password])
      else
        raise("#{field} was not a recognised field")
    end
    page.create_account
  end
end

When(/^I register a new account$/) do
  visit RegistrationPage do |page|
    page.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
    page.create_account
  end
end

Then(/^I should be registered and logged in$/) do
  expect(@current_page.logged_in?).to eq "#{$site_user[:first_name].upcase} #{$site_user[:last_name].upcase}"
end

When(/^I try to enter passwords that do not match$/) do
  $site_user = generate_user
  on RegistrationPage do |page|
    page.fill_in_form($site_user[:first_name], $site_user[:last_name], $site_user[:email], $site_user[:company_name], $site_user[:country], $site_user[:password], 'password')
    page.create_account
  end
end

Then(/^I should see a "([^"]*)" error with "([^"]*)"$/) do |field, field_warning|
  on RegistrationPage do |page|
    expect(page.send("#{field.gsub(' ', '_')}_error")).to eq(field_warning)
  end
end

Then(/^I should see the Registration page$/) do
  on RegistrationPage
end

When(/^I try to register with an existing OpenShift registered email$/) do
  $site_user = generate_user
  on RegistrationPage do |page|
    page.fill_in_form($site_user[:first_name], $site_user[:last_name], 'velias+emailveriftest@redhat.com', $site_user[:company_name], $site_user[:country], $site_user[:password], $site_user[:password])
  end
end

Then(/^each term should link to relevant terms and conditions page:$/) do |table|
  on RegistrationPage do |page|
    page.expand_register_choice_email # if the user is on a mobile device
    table.hashes.each do |row|
      case row[:term]
        when 'Red Hat Developer Program'
          page.rhd_developer_terms.attribute_value('href').should include row[:url]
        when 'Red Hat Subscription Agreement'
          page.rhd_subscription_terms.attribute_value('href').should include row[:url]
        when 'Red Hat Portals Terms of Use'
          page.rh_portal_terms.attribute_value('href').should include row[:url]
        else
          raise("#{row[:term]} is not a recognised term")
      end
    end
  end
end


Then(/^I should see the extended registration page with a message "([^"]*)"$/) do |message|
  expect(@page.extended_registration.registration_hint).to include(message)
end

When(/^I complete the extended registration form and accept the terms and conditions$/) do
  @page.extended_registration.fill_in_extended_form($site_user[:email], $site_user[:password], $site_user[:password], $site_user[:greeting], $site_user[:first_name], $site_user[:last_name], $site_user[:company_name], $site_user[:address_line_one], $site_user[:city], $site_user[:postal_code], $site_user[:country], $site_user[:phone_number])
  @page.extended_registration.checkall_tac
  @page.extended_registration.click_create_account_and_download
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
