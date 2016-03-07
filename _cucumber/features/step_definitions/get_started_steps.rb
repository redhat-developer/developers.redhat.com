Then(/^I should see the ([^"]*) get started page(?: with a confirmation message (.*))?$/) do |product_id, message|
  @page.get_started.send("wait_until_#{product_id}_get_started_page_visible")
  if message
    @page.get_started.wait_until_thank_you_section_visible
    expect(@page.get_started.thank_you_section.thank_you_text.text).to eq message
  end
end
