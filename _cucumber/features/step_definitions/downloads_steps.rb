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
