Then(/^I should see a (verification|confirmation) message: "(.*)"$/) do |negate, message|
  expect(@page.current_page.verification_message).to have_text(message)
end
