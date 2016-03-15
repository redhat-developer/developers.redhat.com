Then(/^I should see the following main products sections:$/) do |table|
  table.raw.each do |sections|
    section = sections.first
    expect(@page.technologies.product_titles).to include section
  end
end

Then(/^I should see a list of available products$/) do
  @page.technologies.available_products.should =~ @product_names
end

Then(/^I should see a description of available products$/) do
  @product_ids.each do |product_id|
    expect(@page.technologies.send("#{product_id}_section")).to have_text(get_product(product_id, 'description'))
  end
end

Then(/^each product title should link to the relevant product overview page$/) do
  @product_ids.each do |product_id|
    expect(@page.technologies.send("product_#{product_id}_link")['href']).to include "/products/#{product_id}/"
  end
end

Then(/^I should see a 'Get started' button for each available product$/) do
  @product_ids.each do |product_id|
    expect(@page.technologies.send("get_started_with_#{product_id}_button")['href']).to include "/products/#{product_id}/get-started/"
  end
end

When(/^products have a Learn link available$/) do
end

Then(/^I should see a 'Learn' link for each product$/) do
  @products_with_learn_link.each do |product_id|
    expect(@page.technologies.send("learn_#{product_id}_link")['href']).to include "/products/#{product_id}/learn/"
  end
end

When(/^the products have Docs and API's available$/) do
end

Then(/^I should see a 'Docs and APIs' link for each product$/) do
  @products_with_docs.each do |product_id|
    expect(@page.technologies.send("#{product_id}_docs_and_apis")['href']).to include "/products/#{product_id}/docs-and-apis/"
  end
end

When(/^the products have Downloads available$/) do
end

Then(/^I should see a 'Downloads' link for each product$/) do
  products_with_downloads = @technologies_with_downloads - ['mobileplatform']
  products_with_downloads.each do |product_id|
    expect(@page.technologies.send("download_#{product_id}")['href']).to include "/products/#{product_id}/download/"
  end
end

When(/^I click on the product link for "(.*)"$/) do |product_id|
  @page.technologies.send("product_#{product_id}_link").click
  @selected_product_id = product_id
end

Then(/^I should be directed the product overview page$/) do
  expect(page.current_url).to include "/products/#{@selected_product_id}/overview/"
end
