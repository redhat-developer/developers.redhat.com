Then(/^the 'Download Latest' links for available products$/) do
  expect(@page.downloads).to have_download_latest_links :count => get_products.count
end

Then(/^a list of products available for download$/) do
  @page.downloads.available_downloads.should =~ get_products
end

When(/^(I|they) attempt to download ([^"]*)$/) do |negate, product|
  @page.downloads.send("#{product.downcase.tr(' ', '_')}_download_link").click
end

Then(/^(I|they) should be redirected to the Red Hat Customer Portal login Page$/) do |negate|
  expect(page).to have_text 'Log in to your Red Hat account'
end

Then(/^the following "([^"]*)" links should be displayed:$/) do |title, table|
  expect(page).to have_text title.upcase
  table.raw.each do |row|
    link = row.first
    expect(@page.downloads.other_resources_links).to include link.upcase
  end
end
