Then(/^I should see the solutions title$/) do
  expect(@site.solutions.solutions_title).to be_truthy
end

Then(/^I should see "([^"]*)" solution types$/) do |solutions|
  expect(@site.solutions.available_solutions(solutions)).to be_truthy
end
