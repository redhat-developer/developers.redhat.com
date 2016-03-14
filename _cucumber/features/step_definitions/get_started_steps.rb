Then(/^I should see the ([^"]*) get started page(?: with a confirmation message "(.*))?"$/) do |product_id, message|

  # TODO - temporary hack until the download manager redirects to staging PR.
  if Capybara.app_host.include?('-pr')
    url = 'http://developers.stage.redhat.com/'
    visit("#{@page.current_page.current_url.gsub(url, "#{Capybara.app_host}/")}")
  end
  # END of temporary hack

  @page.get_started.send("wait_for_#{product_id}_get_started_page")
  if message
    @page.get_started.wait_until_thank_you_section_visible
    expect(@page.get_started.thank_you_section.thank_you_text.text).to eq message
  end
end
