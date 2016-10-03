Then(/^the page should load within "([^"]*)" seconds$/) do |expected_load|
  response = @browser.performance.summary[:response_time]/1000
  first_byte = @browser.performance.summary[:time_to_first_byte]
  last_byte = @browser.performance.summary[:time_to_last_byte]

  puts ("#{@browser.url}: Response time: #{response} soconds")
  puts ("#{@browser.url}: Time to first byte: #{first_byte}ms.")
  puts ("#{@browser.url}: Time to last byte: #{last_byte}ms.")

  expect(response).to be < expected_load.to_i

end
