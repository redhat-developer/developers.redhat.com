And(/^I am on the Downloads page$/) do
  @page.site_nav.visit('/downloads/')
end

Given(/^I am on the Product Download page for ([^"]*)$/) do |product|
  @page.download_overview.open(product)
end

When(/^I click to download "([^"]*)"$/) do |product|
  url = get_featured_download_for(get_product_id(product))
  @page.downloads.click_to_download(url[1])
end

Then(/^I should see the ([^"]*) download overview page$/) do |product|
  @page.download_overview.loaded?(product)
end

Then(/^a 'DOWNLOAD' button for each Most Popular Download$/) do
  expect(@page.downloads.most_popular_downloads_btns).to eq 4
end

And(/^a "([^"]*)" Downloads section with the following Downloads:$/) do |title, table|
  table.raw.each do |row|
    table_items = row.first
    expect(@page.downloads.most_popular_downloads).to include(title)
    expect(@page.downloads.most_popular_downloads).to include(table_items)
  end
end

When(/^I click to download the featured download of "([^"]*)"$/) do |product|
  version, url = get_featured_download_for(get_product_id(product))
  @page.download_overview.click_featured_download_for(product, version, url)
end

Then(/^I should see a list of products available for download$/) do
  @page.downloads.available_downloads.should =~ @available_downloads[1]
end

And(/^a 'DOWNLOAD' button for each available product Download$/) do
  expect(@page.downloads.download_btns).to eq @available_downloads[0].size
end
