Given(/^I am on the community page$/) do
  visit('/projects')
end

Then(/^I should see the community page title$/) do
  find('.blowout').text.include?("COMMUNITY")
end

Then(/^I should see at least "([^"]*)" promoted links$/) do |links|
  expect(page).to have_selector('.defaultprojectimage', visible: true)
  page.assert_selector('.defaultprojectimage', :minimum => links.to_i)
end

Then(/^I should see at least "([^"]*)" community links$/) do |links|
  click_on 'Clear All Filters'
  expect(page).to have_selector('.upstream', visible: true)
  page.assert_selector('.upstream', :minimum => links.to_i)
end

Then(/^I should see some well known projects such as "([^"]*)", "([^"]*)" and "([^"]*)"$/) do |arg1, arg2, arg3|
   expect(page).to have_content 'AeroGear'
   solutions = all(".solution-name-link")
   expect(solutions.any?{ | message | message.text == arg1 }).to be(true)
   expect(solutions.any?{ | message | message.text == arg2 }).to be(true)
   expect(solutions.any?{ | message | message.text == arg3 }).to be(true)
end
