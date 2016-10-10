When(/^I click to download "([^"]*)"$/) do |product|
  @product_id = get_product_id(product)
  url = get_featured_download_for(@product_id)
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
  dm = get_dm_available_downloads
  ad = @available_downloads[0]
  diff = ad - dm
  downloads = @available_downloads[0] -= diff
  on DownloadsPage do |page|
    downloads.each { |product_id|
      url = get_featured_download_for(product_id)
      raise("Download for #{product_id} was not available!") unless page.download_buttons_linked_to_dm(url[1]) == true
    }
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
    page.available_downloads.should =~ @available_downloads[1]
  end
end

And(/^a 'DOWNLOAD' button for each available product Download$/) do
  on DownloadsPage do |page|
    expect(page.download_btns).to eq @available_downloads[0].size
  end
end

Given(/^I am on the promotion page for the "([^"]*)"$/) do |arg|
  on PromotionsPage do |page|
    page.go_to_promotion(arg)
  end
end

When(/^I click on the Download Now button$/) do
  on PromotionsPage do |page|
    page.click_download_btn
  end
end

Then(/^the "(.*)" download should initiate$/) do |download|
  wait_for(20, "Failed to download #{download}") { File.exists?("#{$download_directory}/#{download}") }
end

Then(/^the file should be downloadable$/) do
  on PromotionsPage do |page|
    content_length, content_type = page.get_download
    expect(content_type).to eql('text/html; charset=UTF-8')
    expect(content_length.to_i).to be > 0
  end
end
