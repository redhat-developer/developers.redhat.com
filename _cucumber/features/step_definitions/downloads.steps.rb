Given(/^(I am|they are on) on the Download Overview page for ([^"]*)$/) do |negate, product_id|
  @page.download_overview.open(product_id)
end

Then(/^I should see the ([^"]*) download overview page$/) do |product_id|
  p page.current_url
  @page.download_overview.send("wait_until_#{product_id}_download_page_visible")
  expect(page.current_url).to include "#{Capybara.app_host}/products/#{product_id}/download/"
end

When(/^I click to download the latest version of "([^"]*)"$/) do |product|
  find('a', text: product, :match => :prefer_exact).click
end

Then(/^the ([^"]*) download (should|should not) initiate$/) do |product_id, negate|
  if negate.eql?('should')
    expect(downloading?(product_id)).to be true
  else
    expect(downloads.empty?).to be true
  end
end

Then(/^I should see "([^"]*)" download latest links$/) do |downloads|
  expect(@page.downloads).to have_download_latest_link :count => downloads.to_i
end

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


Then(/^I submit my company name and country$/) do
  @page.update_details.with(@customer[:company_name], @customer[:country])
end