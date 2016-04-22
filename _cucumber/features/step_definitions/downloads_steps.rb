Given(/^I am on the Product Download page for ([^"]*)$/) do |product_id|
  @page.download_overview.open(product_id)
end

Then(/^I should see the ([^"]*) download overview page$/) do |product_id|
  expect(@page.download_overview).to send("have_#{product_id}_download_page")
end

When(/^I click to download the featured download of "([^"]*)"$/) do |product|
  version, url = get_featured_download_for(get_product_id(product))
  @page.download_overview.click_featured_download_for(product, version, url)
end

When(/^I click to download "([^"]*)"$/) do |product_id|
  url = get_featured_download_for(get_product_id(product_id))
  @page.downloads.click_to_download(url[1])
end

Then(/^a list of products available for download$/) do
  expect(@page.downloads).to have_product_downloads :count => @available_downloads[0].size
  @page.downloads.available_downloads.should =~ @available_downloads[1]
end

Then(/^a 'DOWNLOAD' button for each available product Download$/) do
  expect(@page.downloads).to have_download_latest_btn :count => @available_downloads[0].size
end

Then(/^a 'DOWNLOAD' button for each Most Popular Download$/) do
  expect(@page.downloads).to have_most_popular_download_btn :count => 4
end

Then(/^the following 'Other developer resources' links should be displayed:$/) do |table|
  table.raw.each do |row|
    link = row.first
    expect(@page.downloads.other_resources_links).to include link.capitalize
  end
end

And(/^a "([^"]*)" Downloads section with the following Downloads:$/) do |title, table|
  table.raw.each do |row|
    table_items = row.first
    expect(@page.downloads.most_popular_downloads_section).to have_text(title)
    expect(@page.downloads.most_popular_downloads_section).to have_text(table_items)
  end
end
