Then(/^the search field (should|should not) be displayed within the site header$/) do |negate|
  if negate.include?('not')
    expect(@page.site_nav.search_field_visible?).to be false
  else
    expect(@page.site_nav.search_field_visible?).to be true
  end
end

Then(/^the max characters for the search box should be "([^"]*)" characters\.$/) do |max_length|
  expect(@page.current_page.search_box_attribute('maxlength')).to eq max_length
end

Then(/^I should placeholder text within the search field "([^"]*)"$/) do |hint|
  expect(@page.current_page.search_box_attribute('placeholder')).to eq hint
end

