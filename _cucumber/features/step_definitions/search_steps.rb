Then(/^the search results page is displayed$/) do
  on SearchPage do |page|
    page.wait_until_loaded
  end
end

Then(/^the search box should contain "([^"]*)"$/) do |search_term|
  on SearchPage do |page|
    expect(page.search_box.attribute('value')).to eq search_term
  end
end

And(/^the default results sort should be by "([^"]*)"/) do |sort_by|
  expect(@current_page.results_sort[0]).to eq sort_by
end

And(/^the default results count should be "([^"]*)"$/) do |results_per_page|
  expect(@current_page.results_per_page[0]).to eq results_per_page
end

And(/^the result sorting options should be:$/) do |table|
  sort_options = []
  table.raw.each do |links|
    sort_options << links.first
  end
  @current_page.results_sort[1].should =~ sort_options
end

And(/^the result per page options should be:$/) do |table|
  results_per_page = []
  table.raw.each do |links|
    results_per_page << links.first
  end
  @current_page.results_per_page[1].should =~ results_per_page
end

Then(/^I should see "([^"]*)" results containing "([^"]*)"$/) do |results_size, search_string|
  expect(@current_page.search_results.size).to eq results_size.to_i
  @current_page.search_results.each do |result|
    expect(result.downcase).to include(search_string.downcase)
  end
end

Given(/^I have previously searched for "([^"]*)"$/) do |search_string|
  on SearchPage do |page|
    page.open("/search/?q=#{search_string}")
    page.wait_for_results
  end
end

Given(/^the search box is empty$/) do
  expect(@current_page.search_box.attribute('value')).to eq ''
end

When(/^I click on the search button$/) do
  @current_page.click_search_button
  @current_page.wait_for_ajax
end

When(/^I click on clear search button$/) do
  @current_page.click_search_button
end

Then(/^nothing will happen and no search will be initiated$/) do
  expect(@current_page.search_field_visible?).to be true
end

And(/^"([^"]*)" related to "([^"]*)"$/) do |tags, search_string|
  expect(@current_page.tags.downcase).to include "#{tags}:"
  expect(@current_page.tags.downcase).to include search_string.downcase
end
