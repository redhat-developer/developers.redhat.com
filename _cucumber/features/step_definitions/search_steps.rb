When(/^I search for "([^"]*)"$/) do |search_string|
  @search_string = search_string
  @page.current_page.search_for(@search_string)
end

Then(/^the search results page is displayed$/) do
  @page.search.verify_page('Search Results')
end

Then(/^the search box should contain "([^"]*)"$/) do |search_term|
  expect(@page.search.search_box_value).to eq search_term
end

And(/^the default results sort should be by "([^"]*)"/) do |sort_by|
  expect(@page.search.results_sort[0]).to eq sort_by
end

And(/^the default results count should be "([^"]*)"$/) do |results_per_page|
  expect(@page.search.results_per_page[0]).to eq results_per_page
end

And(/^the result sorting options should be:$/) do |table|
  sort_options = []
  table.raw.each do |links|
    sort_options << links.first
  end
  @page.search.results_sort[1].should =~ sort_options
end

And(/^the result per page options should be:$/) do |table|
  results_per_page = []
  table.raw.each do |links|
    results_per_page << links.first
  end
  @page.current_page.results_per_page[1].should =~ results_per_page
end

Then(/^I should see "([^"]*)" results containing "([^"]*)"$/) do |results_size, search_string|
  expect(@page.search.search_results.size).to eq results_size.to_i
  @page.search.search_results.each do |result|
    expect(result.downcase).to include(search_string.downcase)
  end
end

Then(/^I (should|should not) see a message "([^"]*)"$/) do |negate, message|
  if negate.include?('not')
    @page.current_page.results_title.should_not include(message)
  else
    @page.current_page.results_title.should eql?(message)
  end
end

Then(/^there will be no results displayed$/) do
  expect(@page.search.results_container_visible?).to be false
end

Then(/^below a I should see a message "([^"]*)"$/) do |message|
  expect(@page.search.results_sub_title).to eq message
end


Then(/^I should not see pagination with page numbers$/) do
  expect(@page.pagination.has_pagination?).to be false
end

Then(/^the following links should be (enabled|disabled):$/) do |link_state, table|
  table.raw.each do |links|
    link = links.first
    expect(@page.pagination.pagination_links(link.downcase, link_state)).to be true
  end
end

Then(/^I should see pagination with "([^"]*)" pages(?: (with|without) ellipsis)?$/) do |number, ellipsis|

  expect(@page.pagination.has_pagination_with(number)).to be true

  if ellipsis == 'with'
    expect(@page.pagination.has_ellipsis?).to be true
  else
    expect(@page.pagination.has_ellipsis?).to be false
  end

end

When(/^I click on the pagination "([^"]*)" link/) do |link|
  @page.pagination.click_pagination(link.downcase)
end

Then(/^I should see page "([^"]*)" of the results$/) do |page_number|
  expect(@page.pagination.current_link).to eq("#{page_number}")
end

Given(/^I have previously searched for "([^"]*)"$/) do |search_string|
  @page.site_nav.visit("/search/?q=#{search_string}")
end

Given(/^I am on page "([^"]*)" of the results$/) do |page_number|
  @page.pagination.click_pagination(page_number)
  @page.pagination.current_link.should == page_number
end

Given(/^the search box is empty$/) do
  expect(@page.site_nav.search_box_attribute('value')).to eq ''
end

When(/^I click on the search button$/) do
  @page.site_nav.click_search_button
end

When(/^I click on clear search button$/) do
  @page.site_nav.click_search_button
end

Then(/^nothing will happen and no search will be initiated$/) do
  expect(@page.site_nav.search_field_visible?).to be true
end


And(/^"([^"]*)" related to "([^"]*)"$/) do |tags, search_string|
  expect(@page.search.tags.downcase).to include "#{tags}:"
  expect(@page.search.tags.downcase).to include search_string.downcase
end

When(/^I enter "([^"]*)" into the search box$/) do |search_string|
  @page.search.enter_search_term(search_string)
end

When(/^I enter "([^"]*)" into the Site nav search box$/) do |search_string|
  @page.site_nav.enter_search_term(search_string)
end

And(/^I click on the X to clear search term$/) do
  @page.search.click_clear_search
end

