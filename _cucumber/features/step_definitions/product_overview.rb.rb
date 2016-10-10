And(/^I am on the Product Download page for (.*)$/) do |product|
  on ProductOverviewPage do |page|
    page.open_download_for(product)
  end
end

When(/^I click to download the featured download of "([^"]*)"$/) do |product|
  @product_id = get_product_id(product)
  url = get_featured_download_for(@product_id)
  on ProductOverviewPage do |page|
    page.click_to_download(url[1])
  end
end
