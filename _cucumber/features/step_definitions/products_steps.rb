Then(/^I should see the following main products sections:$/) do |table|
  table.raw.each do |sections|
    section = sections.first
    expect(@page.products.product_titles).to include section
  end
end

Then(/^I should see "([^"]*)" products$/) do |products|
  expect(@page.products).to have_products_sections count: products
end

Then(/^I should see a list of available products$/) do
  @page.products.available_products.should =~ get_products
  expect(@page.products).to have_products_sections count: get_products.count
end

Then(/^I should see a 'Get started' button for each available product$/) do
  expect(@page.products).to have_getting_started_links count: get_products.count
end

When(/^a product has a learn link$/) do
  #p products


  #@learn_link_product_type, @learn_link_product_id = learn_links?
end

Then(/^I should see a learn link for that product$/) do
  expect(@page.products).to have_learn_links count: learn_links
end

