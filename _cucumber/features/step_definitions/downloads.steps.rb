Then(/^I should see "([^"]*)" download latest links$/) do |downloads|
  @page.downloads.wait_for_download_latest_link 30, :count => downloads.to_i
end
