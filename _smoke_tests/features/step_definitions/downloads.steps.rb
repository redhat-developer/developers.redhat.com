Given(/^I am on the downloads page$/) do
  visit('/downloads')
end

Then(/^I should see the download page title$/) do
  find('.blowout').text.include?("DOWNLOADS")
end

Then(/^I should see "([^"]*)" download links$/) do |downloads|
  page.assert_selector('.fa-download', :count => downloads.to_i)
end
