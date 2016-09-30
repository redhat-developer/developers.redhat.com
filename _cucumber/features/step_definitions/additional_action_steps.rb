Then(/^I should be asked to fill in mandatory information with a message "([^"]*)"$/) do |message|
  on AdditionalActionPage do |page|
    expect(page.feedback).to eq(message)
  end
end

When(/^I complete the missing information$/) do
  on AdditionalActionPage do |page|
    page.fill_in(nil, 'P@$$word01', $site_user[:first_name], $site_user[:last_name], $site_user[:company_name], $site_user[:country])
  end
end

When(/^I complete the required additional information$/) do
  on AdditionalActionPage do |page|
    page.fill_in($site_user[:email], 'P@$$word01', $site_user[:first_name], $site_user[:last_name], $site_user[:company_name], $site_user[:country])
    page.accept_all_terms
    page.click_submit
  end
end

When(/^I add an email address that is already RHD registered$/) do
  on AdditionalActionPage do |page|
    page.enter_email($site_user[:email])
  end
end

And(/^I complete the required additional information with a new email address$/) do
  $site_user[:email] = "rhd+session_id_#{$session_id}-#{Faker::Lorem.characters(10)}@redhat.com"
  puts "Adding new email: #{$site_user[:email]}"

  on AdditionalActionPage do |page|
    page.fill_in($site_user[:email], 'P@$$word01', $site_user[:first_name], $site_user[:last_name], $site_user[:company_name], $site_user[:country])
    page.accept_all_terms
    page.click_submit
  end
end

Then(/^I should see the pre\-filled details from Github in the additional details form$/) do
  on AdditionalActionPage do |page|
    expect(page.email_field.attribute_value('value')).to eq $site_user[:email]
    expect(page.first_name_field.attribute_value('value')).to eq $site_user[:first_name]
    expect(page.last_name_field.attribute_value('value')).to eq $site_user[:last_name]
    expect(page.company_field.attribute_value('value')).to eq $site_user[:company_name]
  end
end

When(/^I create a new password$/) do
  on AdditionalActionPage do |page|
    page.enter_password('P@$$word01', 'P@$$word01')
  end
end

And(/^select my country of residence$/) do
  on AdditionalActionPage do |page|
    page.select_country($site_user[:country])
  end
end

And(/^I click on the Submit button$/) do
  on AdditionalActionPage do |page|
    page.click_submit
  end
end

When(/^I accept the RHD terms and conditions$/) do
  on AdditionalActionPage do |page|
    page.fulluser_tac_accept
    page.click_submit
  end
end

And(/^I click accept all terms and conditions$/) do
  on AdditionalActionPage do |page|
    page.accept_all_terms
  end
end

Then(/^I should see a warning that the email is already registered$/) do
  on AdditionalActionPage do |page|
    #move focus to password field to make the warning show up quicker
    page.enter_password('','')
    expect(page.email_field_error_text).to eq 'User account for this email already exists. Link your social account with the existing account.'
  end
end

And(/^I click on the Link my social account with the existing account link$/) do
  on AdditionalActionPage do |page|
    page.click_link_profile_to_social
  end
end
