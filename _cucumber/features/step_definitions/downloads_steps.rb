When(/^I click to download "([^"]*)"$/) do |product|
  data = all_available_downloads
  url = featured_download_for(data[product])
  on DownloadsPage do |page|
    page.click_to_download(url[1])
  end
end

Then(/^a 'DOWNLOAD' button for each Most Popular Download$/) do
  on DownloadsPage do |page|
    expect(page.most_popular_downloads_btns).to eq 4
  end
end

And(/^each download button that uses Download Manager should link to the latest available download for that product$/) do
  dm = product_downloads_from_dm[0]
  ad = expected_downloads[0]
  diff = ad - dm
  downloads = product_downloads_from_dm[0] -= diff
  on DownloadsPage do |page|
    downloads.each do |product_id|
      url = featured_download_for(product_id)
      fail("Download for #{product_id} was not available!") unless page.download_buttons_linked_to_dm(url[1]) == true
    end
  end
end

And(/^a "([^"]*)" Downloads section with the following Downloads:$/) do |title, table|
  on DownloadsPage do |page|
    table.raw.each do |row|
      table_items = row.first
      expect(page.most_popular_downloads).to include(title)
      expect(page.most_popular_downloads).to include(table_items)
    end
  end
end

Then(/^I should see a list of products available for download$/) do
  on DownloadsPage do |page|
    page.available_downloads.should =~ expected_downloads[1]
  end
end

And(/^a 'DOWNLOAD' button for each available product Download$/) do
  on DownloadsPage do |page|
    expect(page.download_btns).to eq expected_downloads[0].size
  end
end

Given(/^I am on the promotion page for the "([^"]*)"$/) do |arg|
  on PromotionsPage do |page|
    page.go_to_promotion(arg)
  end
end

When(/^I click on the Download Now button for "([^"]*)"$/) do |product_name|
  data = all_available_downloads
  url = featured_download_for(data["Media: #{product_name}"])
  @download = url[1].gsub('https://developers.stage.redhat.com/download-manager/file/', '')
  on PromotionsPage do |page|
    page.click_download_btn
  end
end

When(/^I click on the promotional image for "([^"]*)"$/) do |product_name|
  data = all_available_downloads
  url = featured_download_for(data["Media: #{product_name}"])
  @download = url[1].gsub('https://developers.stage.redhat.com/download-manager/file/', '')
  on PromotionsPage.click_promo_image
end

Then(/^the pdf download should initiate$/) do
  on PromotionsPage do |page|
    page.click_download_retry_link if ENV['DEVICE']
    file = File.basename(DownloadHelper.download)
    file == @download
  end
end

Then(/^the download should initiate$/) do
  DownloadHelper.wait_for_downloaded
end
