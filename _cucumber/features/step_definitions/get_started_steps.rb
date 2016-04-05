Then(/^I should see the ([^"]*) get started page(?: with a confirmation message "(.*))?"$/) do |product_id, message|

  expect(@page.get_started).to have send("#{product_id}_get_started_page")

  # TODO - temporary hack until the download manager redirects to staging PR.
  if Capybara.app_host.include?('-pr')
    url = 'http://developers.stage.redhat.com/'
    visit("#{@page.current_page.current_url.gsub(url, "#{Capybara.app_host}/")}")
  end
  # END of temporary hack

  if message
    expect(@page.get_started.thank_you_section.thank_you_text.text).to eq message
  end

end
