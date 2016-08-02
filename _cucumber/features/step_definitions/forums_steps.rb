Then(/^I should see the following products sections:$/) do |table|
  table.raw.each do |sections|
    section = sections.first
    expect(@page.forums.forums_product_sections).to include section
  end
end

Then(/^I should see the following forum products:$/) do |table|
 products, @product_ids = @page.forums.forums_available_products
  table.raw.each do |sections|
    product = sections.first
    expect(products).to include product
  end
end

Then(/^I should see a description of the available products$/) do
  @product_ids.each do |product|
    if get_product(product, 'forum_desc')
      expect(@page.forums.forums_product_section_for(product)).to include(get_product(product, 'forum_desc'))
    else
      expect(@page.forums.forums_product_section_for(product)).to include(get_product(product, 'description'))
    end
  end
end

Then(/^each product title should link to the relevant product forum page$/) do
  @product_ids.each do |product|
    if product == 'dotnet'
      expect(@page.forums.forums_product_link_for(product)).to include "developer.jboss.org/en/topics/#{product}"
    else
      expect(@page.forums.forums_product_link_for(product)).to include "developer.jboss.org/en/products/#{product}"
    end
  end
end
