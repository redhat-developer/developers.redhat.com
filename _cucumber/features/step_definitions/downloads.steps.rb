Then(/^I should see the download page title$/) do
  expect(@site.downloads.downloads_title).to be_truthy
end

Then(/^I should see "([^"]*)" download links$/) do |downloads|
  expect(@site.downloads.download_links(downloads)).to be_truthy
end
