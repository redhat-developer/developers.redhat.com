Then(/^(I|they) should see the ([^"]*) page title$/) do |negate, page_title|
  expect(@page.current_page.title).to include(page_title.upcase)
end

Then(/^I should see a primary nav bar with the following tabs:$/) do |table|
  table.raw.each do |row|
    tab = row.first
        expect(@page.current_page).to send("have_primary_nav_#{tab.downcase}_link")
    end
end

Then(/^I should see a (verification|confirmation) message: "(.*)"$/) do |negate, message|
  expect(@page.current_page.verification_message).to have_text(message)
end
