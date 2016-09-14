Then(/^I should see the ([^"]*) get started page(?: with a confirmation message "(.*))?"$/) do |product_id, message|
  on GetStartedPage do |page|
    page.loaded?(product_id)
      expect(page.thank_you_text).to include(message) if message
  end
end
