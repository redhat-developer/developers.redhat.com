Then(/^the page should load within "([^"]*)" seconds$/) do |expected_load|
  response = $browser.performance.summary[:response_time] / 1000
  fail("#{expected_load} page did not load within 6 seconds") unless response <= expected_load.to_i
end

Then(/^the page should contain "([^"]*)"$/) do |rhd|
  @browser.html.include rhd
end
