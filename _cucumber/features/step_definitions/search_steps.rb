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
  expect(@page.search).to have_no_search_results_container
end

Then(/^I should not see pagination with page numbers$/) do
  expect(@page.search).to have_no_pagination
end

Then(/^I should see pagination with "([^"]*)" pages$/) do |page_num|
  expect(@page.search.pagination_numbers.length).to eq(2)
end

Then(/^the following links should be (enabled|disabled):$/) do |option, table|
  @page.search.wait_until_search_results_container_visible
  table.raw.each do |links|
    link = links.first
    if link.eql?('Previous')
      expect(@page.search).to send("have_prev_link_#{option.downcase}")
    else
      expect(@page.search).to send("have_#{link.downcase}_link_#{option.downcase}")
    end
  end
end

Then(/^I should see pagination with "([^"]*)" pages with ellipsis$/) do |pageNum|
  @page.search.wait_until_search_results_container_visible
  expect(@page.search).to have_pagination_5
end

Then(/^the ellipsis should not be clickable$/) do
  expect(true) # how do I test for this??
end

Then(/^I should see pagination with "([^"]*)" pages without ellipsis$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Given(/^I have previously searched for "([^"]*)"$/) do |search_string|
  @page.search.go_to_search_page(search_string)
  @page.search.wait_until_search_results_container_visible
end

When(/^I click on the "([^"]*)" link$/) do |link|
  @page.search.send("#{link}").click
end

Then(/^I should see page "([^"]*)" of the results$/) do |pageNum|
  expect(@page.search.current_link['data-page']).to eq("#{pageNum}")
end

Given(/^I am on page "([^"]*)" of the results$/) do |page_number|
  @page.search.click_pagination(page_number)
  @page.search.wait_until_search_results_container_visible
  expect(@page.search.current_link['data-page']).to eq("#{page_number}")
end

Given(/^the search box is empty$/) do
  expect(@page.search.search_form.value).to eq('')
end

When(/^I click on the search button$/) do
  @page.search.search_button.click
end

Then(/^nothing will happen and no search will be initiated$/) do
  expect(true)
  # TODO: HOW do I test that nothing happened?
end
