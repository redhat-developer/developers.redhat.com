Then(/^I should see the ([^"]*) get started page(?: with a confirmation message "(.*))?"$/) do |product_id, message|
  @page.get_started.loaded?(product_id)

  if message
    expect(@page.get_started.thank_you_text).to eq message
  end

end
