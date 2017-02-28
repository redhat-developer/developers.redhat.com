Then(/^the footer should contain a "([^"]*)" link$/) do |footer_link|
  expect(@current_page.send(footer_link.downcase.gsub(' ', '_')).text).to eq footer_link
end
