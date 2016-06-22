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
  @product_ids.each do |product|
    expect(@page.technologies.product_description_for(product)).to include(get_product(product, 'description'))
  end
end

Then(/^each product title should link to the relevant product overview page$/) do
  @product_ids.each do |product|
    expect(@page.technologies.product_link_for(product)).to include "#{$host_to_test}/products/#{product}/"
  end
end

Then(/^I should see a 'Get started' button for each available product$/) do
  @product_ids.each do |product|
    expect(@page.technologies.get_started_button_for(product)).to include "#{$host_to_test}/products/#{product}/get-started/"
  end
end

When(/^products have a Learn link available$/) do
end

Then(/^I should see a 'Learn' link for each product$/) do
  @products_with_learn_link.each do |product|
    expect(@page.technologies.learn_link_for(product)).to include "#{$host_to_test}/products/#{product}/learn/"
  end
end

When(/^the products have Docs and API's available$/) do
end

Then(/^I should see a 'Docs and APIs' link for each product$/) do
  @products_with_docs.each do |product|
    expect(@page.technologies.docs_and_apis_for(product)).to include "#{$host_to_test}/products/#{product}/docs-and-apis/"
  end
end

When(/^the products have Downloads available$/) do
end

Then(/^I should see a 'Downloads' link for each product$/) do
  products_with_downloads = @technologies_with_downloads - ['mobileplatform']
  products_with_downloads.each do |product|
    expect(@page.technologies.download_button_for(product)).to include "#{$host_to_test}/products/#{product}/download/"
  end
end
