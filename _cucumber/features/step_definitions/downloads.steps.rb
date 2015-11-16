Then(/^a list of products available for download$/) do
  expect(@page.downloads).to have_product_downloads :count => @product_names.size
  @page.downloads.available_downloads.should =~ @product_names
end

Then(/^the 'Download Latest' links for available products$/) do
  expect(@page.downloads).to have_download_latest_links :count => @product_names.size
end

When(/^(I|they) click 'Download Latest' for ([^"]*)$/) do |negate, product_id|
  @page.downloads.send("#{product_id.downcase.tr(' ', '_')}_download_link").click
end

Then(/^the following 'Other developer resources' links should be displayed:$/) do |table|
  expect(page).to have_text title.upcase
  table.raw.each do |row|
    link = row.first
    expect(@page.downloads.other_resources_links).to include link.upcase
  end
end

Then(/^each ([^"]*) can be downloaded$/) do |product_id|
 # @page.downloads.send("#{product_id.downcase.tr(' ', '_')}_download_link")['href']

  browser = Capybara.current_session.driver.browser.manage
  cookie =  browser.cookie_named 'rh_elqCustomerGUID'

  links = @page.downloads.download_latest_links['href'][0]

  RestClient.head links, cookie: { cookie[:name] => cookie[:value] }





end
