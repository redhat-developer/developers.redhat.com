Then(/^I should see "([^"]*)" download latest links$/) do |downloads|
  expect(@page.downloads).to have_download_latest_link :count => downloads.to_i
end
