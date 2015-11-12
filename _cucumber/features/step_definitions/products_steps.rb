Then(/^I should see the following main products sections:$/) do |table|
  table.raw.each do |sections|
    section = sections.first
    expect(@page.products.product_titles).to include section
  end
end

Then(/^I should see "([^"]*)" products$/) do |products|
  expect(@page.products).to have_products_sections count: products
end

Then(/^I should see "([^"]*)" products with a learn link$/) do |learn_links|
  expect(@page.products).to have_learn_links count: learn_links
end
