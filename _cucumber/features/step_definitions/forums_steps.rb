Given(/^I am on the Product forums page$/) do
  @page.site_nav.visit('/forums/')
end

Then(/^I should see the following products sections:$/) do |table|
  table.raw.each do |sections|
    section = sections.first
    expect(@page.forums.forums_product_sections).to include section
  end
end

Then(/^I should see a list of the available products$/) do
  expect(@page.forums.forums_available_products)
end

Then(/^I should see a description of the available products$/) do
  # @page.forums.forums_available_products.each do |product|
    # expect(@page.forums.forums_product_section_for(product)).to include(get_product(product, 'description'))
  # end
end

Then(/^each product title should link to the relevant product forum page$/) do
  @product_ids.each do |product|
    expect(@page.forums.forums_product_link_for(product)).to include "developer.jboss.org/en/products/#{product}"
  end
end
