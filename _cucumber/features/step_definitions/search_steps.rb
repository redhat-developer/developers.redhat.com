When(/^I search for "([^"]*)"$/) do |search_string|
  @search_string = search_string
  @page.current_page.search_for(@search_string)
end

Then(/^the search results page is displayed$/) do
  expect(@page.search).to have_search_page
end

Then(/^I should see "([^"]*)" results containing "([^"]*)"$/) do |results, search_string|
  @page.search.wait_until_search_results_container_visible 30, :count => results.to_i
  @page.search.search_results.each do |result|
    expect(result.text.downcase).to include search_string.downcase
  end
end

Then(/^the results will be ordered by most recent first$/) do
  lastTimeStamp = 0
  @page.search.timestamps.each_with_index do |timestamp, i|
    timestamps = @page.search.timestamps

    if i > 0
      mostRecent = timestamps[i-1]['data-updated'].to_i
      older = timestamp['data-updated'].to_i
      expect(mostRecent).to be > older
    end
  end
end

Then(/^the results will be ordered by title$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

# skip -  not all items are tagged with "containers"
Then(/^tags related to "([^"]*)"$/) do |tag|
  @page.search.wait_until_search_results_container_visible
  @page.search.tags.each do |tags|
    expect(tags.text.downcase).to include tag.downcase
  end
end

Then(/^I should see a message "([^"]*)"$/) do |message|
  expect(@page.search.results_title.text).to eq(message)
end

Then(/^below a I should see a message "([^"]*)"$/) do |message|
  expect(@page.search.results_sub_title.text).to eq(message)
end

Then(/^there will be no results displayed$/) do
  expect(@page.search.has_no_search_results_container?)
end

Then(/^I should not see pagination with page numbers$/) do
  expect(@page.search.has_no_pagination?)
end

Then(/^I should see pagination with "([^"]*)" pages$/) do |numPages|
  expect(@page.search.pagination_numbers.length).to eq(2)
end

Then(/^the following links should be enabled:$/) do |table|
  @page.search.wait_until_search_results_container_visible
  table.raw.each do |row|
    selector = "#pagination-#{row.first.downcase}.available"
    expect(@page.search.pagination).should have_css(selector)
  end
end

Then(/^the following links should be disabled:$/) do |table|
  # table is a Cucumber::Core::Ast::DataTable
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I should see pagination with "([^"]*)" pages with ellipsis$/) do |pageNum|
    selector = "[data-page=\"#{pageNum}\"]"
    expect(@page.search.pagination).should have_css(selector)
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

When(/^I click on the "([^"]*)" link$/) do |link|
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

