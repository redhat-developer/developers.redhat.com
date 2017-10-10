Then(/^the footer should contain a "([^"]*)" link$/) do |footer_link|
  expect(@current_page.send(footer_link.downcase.gsub(' ', '_')).text).to eq footer_link
end

When(/^I click on the ([^"]*) footer item$/) do |footer_item|
  @current_page.click_on_nav_menu(footer_item)
end
