Then(/^I should see the ([^"]*) get started page(?: with a confirmation message "(.*))?"$/) do |product_id, message|
  @page.get_started.loaded?(product_id)
  # TODO - temporary horrible hack until the download manager redirects to staging PR.
  if message && Capybara.app_host.include?('-pr')
    url = 'http://developers.stage.redhat.com/'
    begin
      visit("#{@page.current_page.current_url.gsub(url, "#{Capybara.app_host}/")}")
       @page.get_started.loaded?(product_id)
       expect(@page.get_started.thank_you_section.thank_you_text.text).to eq message
    rescue
      visit("#{@page.current_page.current_url.gsub(url, "#{Capybara.app_host}/")}")
      @page.get_started.loaded?(product_id)
      expect(@page.get_started.thank_you_section.thank_you_text.text).to eq message
    end
  end
end
