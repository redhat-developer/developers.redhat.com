Given(/^I am on the solutions page$/) do
  visit('/solutions')
end

Then(/^I should see the solutions title$/) do
  find('.blowout').text.include?("SOLUTIONS")
end

Then(/^I should see "([^"]*)" solution types$/) do |solutions|
  page.assert_selector('.solutions > li', :count => solutions.to_i)
end
