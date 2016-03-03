When(/^I search for "([^"]*)"$/) do |search_string|
  @search_string = search_string
  @page.current_page.search_for(@search_string)
end

Then(/^the search results page is displayed$/) do
  expect(@page.search).to have_search_page
end

Then(/^I should see "([^"]*)" results containing "([^"]*)"$/) do |results, search_string|
  @page.search.wait_until_search_results_visible 30, :count => results.to_i
  @page.search.search_results.each do |result|
    expect(result.text).to include search_string
  end
end

Then(/^the results will be ordered by most recent first$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the results will be ordered by title$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^tags related to "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see a message "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^below a I should see a message "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^there will be no results displayed$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should not see pagination with page numbers$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see pagination with "([^"]*)" pages$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the following links should be enabled:$/) do |table|
  # table is a Cucumber::Core::Ast::DataTable
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the following links should be disabled:$/) do |table|
  # table is a Cucumber::Core::Ast::DataTable
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see pagination with "([^"]*)" pages with ellipsis$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^the ellipsis should not be clickable$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see pagination with "([^"]*)" pages without ellipsis$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I have previously searched for "([^"]*)"$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I click on the "([^"]*)" link$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see page "([^"]*)" of the results$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I am on page "([^"]*)" of the results$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^the search box is empty$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

When(/^I click on the search button$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^nothing will happen and no search will be initiated$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

# @page.current_page.current_url.should include("/search/?q=#{@search_string}")

