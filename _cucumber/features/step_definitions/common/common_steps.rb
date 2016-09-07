Then(/^the search field (should|should not) be displayed within the site header$/) do |negate|
  if negate.include?('not')
    expect(@current_page.search_field_visible?).to be false
  else
    @current_page.site_nav_search_box.wait_until_present
  end
end

Then(/^the max characters for the search box should be "([^"]*)" characters\.$/) do |max_length|
  expect(@current_page.site_nav_search_box.attribute_value('maxlength')).to eq(max_length)
end

Then(/^I should placeholder text within the search field "([^"]*)"$/) do |hint|
  expect(@current_page.site_nav_search_box.attribute_value('placeholder')).to eq(hint)
end

Then(/^I should see text "Showing "(\d+)\-(\d+)" of results$/) do |arg1, arg2|
  @current_page.results_text.should =~ /Showing #{arg1}-#{arg2} of/
end

When(/^I search for "([^"]*)"$/) do |search_string|
  @search_string = search_string
  @current_page.search_for(@search_string)
end

Then(/^I (should|should not) see a message "([^"]*)"$/) do |negate, message|
  if negate.include?('not')
    @current_page.results_title_text.should_not include(message)
  else
    @current_page.results_title_text.should eql?(message)
  end
end

Then(/^there will be no results displayed$/) do
  expect(@current_page.results_loaded?).to be false
end

Then(/^below a I should see a message "([^"]*)"$/) do |message|
  expect(@current_page.results_sub_title.text).to eq message
end

Then(/^I should not see pagination with page numbers$/) do
  expect(@current_page.has_pagination?).to be false
end

Then(/^the following links should be (available|unavailable):$/) do |link_state, table|
  table.raw.each do |links|
    link = links.first
    link = 'prev' if link == 'Previous'
    expect(@current_page.pagination_links(link.downcase, link_state)).to be true
  end
end

Then(/^I should see pagination with "([^"]*)" pages(?: (with|without) ellipsis)?$/) do |number, ellipsis|

  expect(@current_page.has_pagination_with(number)).to be true

  if ellipsis == 'with'
    expect(@current_page.has_ellipsis?).to be true
  else
    expect(@current_page.has_ellipsis?).to be false
  end

end

When(/^I click on the pagination "([^"]*)" link/) do |link|
  @current_page.click_pagination(link.downcase)
end

Then(/^I should see page "([^"]*)" of the results$/) do |page_number|
  expect(@current_page.current_link_text).to eq("#{page_number}")
end

Given(/^I am on page "([^"]*)" of the results$/) do |page_number|
  @current_page.go_to_pagination_no(page_number)
  @current_page.current_link_text.should == page_number
end

When(/^I enter "([^"]*)" into the Site nav search box$/) do |search_string|
  @current_page.enter_search_term(search_string)
end

And(/^the result per page options should be:$/) do |table|
  results_per_page = []
  table.raw.each do |links|
    results_per_page << links.first
  end
  @current_page.results_per_page[1].should =~ results_per_page
end
