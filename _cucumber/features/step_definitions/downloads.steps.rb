Then(/^a list of products available for download$/) do
  expect(@page.downloads).to have_product_downloads :count => @product_names.size
  @page.downloads.available_downloads.should =~ @product_names
end

Then(/^the 'Download Latest' links for available products$/) do
  expect(@page.downloads).to have_download_latest_links :count => @product_names.size
end

When(/^(I|they) click 'Download Latest' for ([^"]*)$/) do |negate, product|
  @page.downloads.send("#{product.downcase.tr(' ', '_')}_download_link").click
end

Then(/^the following "([^"]*)" links should be displayed:$/) do |title, table|
  expect(page).to have_text title.upcase
  table.raw.each do |row|
    link = row.first
    expect(@page.downloads.other_resources_links).to include link.upcase
  end
end
