And(/^I am on the Product Download page for (.*)$/) do |product|
  on ProductOverviewPage do |page|
    page.open_download_for(product)
  end
end

Then(/^the (.*) download button should link to the latest available download$/) do |product_id|
  url = get_featured_download_for(product_id)
  on ProductOverviewPage do |page|
    if product_id == 'rhel'
      page.download_rhel.href.should == url[1]
    else
      page.download_btn.href.should == url[1]
    end
  end
end
