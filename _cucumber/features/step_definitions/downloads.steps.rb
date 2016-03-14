Given(/^(I am|they are on) on the Product Download page for ([^"]*)$/) do |negate, product_id|
  @page.download_overview.open(product_id)
end

Then(/^I should see the ([^"]*) download overview page$/) do |product_id|
  # Temporary hack until selenium issue: Permission denied to access property "__raven__" (Selenium::WebDriver::Error::UnknownError) is removed.
  begin
    expect(page.current_url).to include "/products/#{product_id}/download/"
    @page.download_overview.send("wait_until_#{product_id}_download_page_visible")
  rescue
    expect(page.current_url).to include "/products/#{product_id}/download/"
    @page.download_overview.send("wait_until_#{product_id}_download_page_visible")
  end
end

When(/^I click to download the featured download of "([^"]*)"$/) do |product|
  version, url = get_featured_download_for(get_product_id(product))
  @page.download_overview.click_featured_download_for(product, version, url)
end

Then(/^the download (should|should not) initiate$/) do |negate|
  if negate.eql?('should')
    expect(downloading?).to eq true
  else
    expect(download_dir).to eq 0
  end
end

Then(/^I should see "([^"]*)" download latest links$/) do |downloads|
  @page.downloads.wait_for_download_latest_links 30, :count => downloads.to_i
end

Then(/^a list of products available for download$/) do
  expect(@page.downloads).to have_product_downloads :count => @product_names.size
  @page.downloads.available_downloads.should =~ @product_names
end

Then(/^the 'Download Latest' links for available products$/) do
  expect(@page.downloads).to have_download_latest_links :count => @product_names.size
end

Then(/^the following 'Other developer resources' links should be displayed:$/) do |table|
  table.raw.each do |row|
    link = row.first
    expect(@page.downloads.other_resources_links).to include link.capitalize
  end
end

Then(/^I submit my company name and country$/) do
  @page.update_details.with(@site_user[:company_name], @site_user[:country])
end


Given(/^an authorized customer has previously downloaded eap$/) do
  step 'Given I register a new account'
  step 'And I am on the Product Download page for eap'
  step 'When I click to download the featured download of "Enterprise Application Server"'
  step 'And I accept the terms and conditions'
  step 'Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Server"'
end
