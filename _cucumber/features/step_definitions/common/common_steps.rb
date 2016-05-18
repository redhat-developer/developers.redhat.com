Then(/^(I|they) should see the ([^"]*) page title$/) do |negate, page_title|
  expect(@page.current_page.title.capitalize).to include(page_title)
end

Then(/^I should see a (verification|confirmation) message: "(.*)"$/) do |negate, message|
  expect(@page.current_page.verification_message).to have_text(message)
end

Then(/^the search field (should|should not) be displayed within the site header$/) do |negate|
  if negate.include?('not')
    expect(@page.current_page).to have_no_nav_search_field
  else
    expect(@page.current_page).to have_nav_search_field
  end
end

Then(/^the max characters for the search box should be "([^"]*)" characters\.$/) do |max_length|
  expect(@page.current_page.nav_search_field['maxlength']).to eq max_length
end

Then(/^I should placeholder text within the search field "([^"]*)"$/) do |hint|
  expect(@page.current_page.nav_search_field['placeholder']).to eq hint
end

