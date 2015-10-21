Then(/^I should see the following main products sections:$/) do |table|
  table.raw.each do |sections|
    section = sections.first
    raise "Expected section '#{section}' was not displayed" unless @site.products.product_titles(section).eql? section
  end
end

Then(/^I should see "([^"]*)" products$/) do |products|
  expect(@site.products.available_products(products)).to be_truthy
end

Then(/^I should see "([^"]*)" products with a learn link$/) do |learn_links|
  expect(@site.products.learn_links(learn_links)).to be_truthy
end
