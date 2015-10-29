Then(/^I should see "([^"]*)" solution types$/) do |solutions|
  expect(@page.solutions).to have_solutions count: solutions
end
