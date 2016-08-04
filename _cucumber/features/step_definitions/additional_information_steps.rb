Then(/^I should be asked to fill in mandatory information with a message "([^"]*)"$/) do |message|
  on AdditionalInformationPage do |page|
    page.feedback.should == message
  end
end

When(/^I complete the required additional information$/) do
  on AdditionalInformationPage do |page|
    page.fill_in(nil, 'P@$$word01', $site_user[:first_name], $site_user[:last_name], $site_user[:company_name], $site_user[:country])
    page.accept_all_terms
    page.click_submit
  end
end

And(/^I complete the required additional information with a new email address$/) do
  $site_user[:email] = "redhat-developers-testers+session_id_#{$session_id}-#{Faker::Lorem.characters(10)}@redhat.com"
  puts "Adding new email: #{$site_user[:email]}"

  on AdditionalInformationPage do |page|
    page.fill_in($site_user[:email], 'P@$$word01', nil, nil, nil, $site_user[:country])
    page.accept_terms
    page.click_submit
  end
end

Then(/^I should see the pre\-filled details from Github in the additional details form$/) do
  on AdditionalInformationPage do |page|
    expect(page.email_field.attribute('value')).to eq $site_user[:email]
    expect(page.first_name_field.attribute('value')).to eq $site_user[:first_name]
    expect(page.last_name_field.attribute('value')).to eq $site_user[:last_name]
    expect(page.company_field.attribute('value')).to eq $site_user[:company_name]
  end
end

When(/^I create a new password$/) do
  on AdditionalInformationPage do |page|
    page.enter_password('P@$$word01', 'P@$$word01')
  end
end

And(/^select my country of residence$/) do
  on AdditionalInformationPage do |page|
    page.select_country($site_user[:country])
  end
end

And(/^I click on the Submit button$/) do
  on AdditionalInformationPage do |page|
    page.click_submit
  end
end

When(/^I accept the RHD terms and conditions$/) do
  on AdditionalInformationPage do |page|
    page.fulluser_tac_accept
    page.click_submit
  end
end

And(/^I click accept all terms and conditions$/) do
  on AdditionalInformationPage do |page|
    page.accept_all_terms
  end
end

Then(/^I should see a warning that the email is already registered$/) do
  on AdditionalInformationPage do |page|
    expect(page.email_field_error.text).to eq "User account already exists for email #{$site_user[:email]}."
  end
end

And(/^I click on the Send Verification email button$/) do
  on AdditionalInformationPage do |page|
    page.click_send_verification_email
  end
end
