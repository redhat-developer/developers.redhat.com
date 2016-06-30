Then(/^I should be asked to fill in mandatory information with a message "([^"]*)"$/) do |message|
  @page.additional_information.feedback.should == message
end

When(/^I complete the required additional information$/) do
  @page.additional_information.fill_in(nil, 'P@$$word01', @site_user[:first_name], @site_user[:last_name], @site_user[:company_name], @site_user[:country])
  @page.registration.accept_terms('all')
  @page.additional_information.click_submit
  @date_of_registration = current_date
end

And(/^I complete the required additional information with a new email address$/) do
  @site_user[:email] = "redhat-tester-#{Faker::Lorem.characters(10)}@redhat.com"
  puts "Adding new email: #{@site_user[:email]}"
  @page.additional_information.fill_in(@site_user[:email], 'P@$$word01', nil, nil, nil, @site_user[:country])
  @page.registration.accept_terms('all')
  @page.additional_information.click_submit
  @date_of_registration = current_date
end

Then(/^I should see the pre\-filled details from Github in the additional details form$/) do
  expect(@page.additional_information.find(AdditionalInformation::EMAIL).attribute('value')).to eq @site_user[:email]
  expect(@page.additional_information.find(AdditionalInformation::FIRST_NAME).attribute('value')).to eq @site_user[:first_name]
  expect(@page.additional_information.find(AdditionalInformation::LAST_NAME).attribute('value')).to eq @site_user[:last_name]
  expect(@page.additional_information.find(AdditionalInformation::COMPANY).attribute('value')).to eq @site_user[:company_name]
end

When(/^I create a new password$/) do
  @page.additional_information.enter_password('P@$$word01', 'P@$$word01')
end

And(/^select my country of residence$/) do
  @page.additional_information.select_country(@site_user[:country])
end

And(/^I click on the Submit button$/) do
  @page.additional_information.click_submit
  @date_of_registration = current_date
end
