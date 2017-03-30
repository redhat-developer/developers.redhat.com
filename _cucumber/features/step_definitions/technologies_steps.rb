Then(/^I should see product sections with headings$/) do
  categories = ProductsHelper.categories
  if @browser.url.include?('forums')
    forum_categories = categories[0] - [:mobile, :cloud, :infrastructure]
    forum_categories.each { |category| expect(@current_page.product_title(category.to_s)).to eq(category.to_s.tr('_', ' ').upcase!) }
  else
    categories[0].each { |category| expect(@current_page.product_title(category.to_s)).to eq(category.to_s.tr('_', ' ').upcase!) }
  end
end

Then(/^I should see a list of available products$/) do
  product_names = ProductsHelper.products[1]
  @current_page.available_products.should =~ product_names
end

Then(/^I should see a description of available products$/) do
  product_ids = ProductsHelper.products[0]
  product_ids.each do |product|
    on TechnologiesPage do |page|
      desc = page.product_description_for(product)
      desc.tr('’', "'").should == product(product, 'description')
    end
  end
end

Then(/^each product title should link to the relevant product overview page$/) do
  product_ids = ProductsHelper.products[0]
  product_ids.each do |product|
    on TechnologiesPage do |page|
      expect(page.product_link_for(product)).to include "/products/#{product}"
    end
  end
end

When(/^products have a Get Started link available$/) do
  @products_with_get_started = products_with_links('get-started.adoc')[0]
end

Then(/^I should see a 'Get started' button for each product$/) do
  product_ids = ProductsHelper.products[0]
  product_ids.each do |product|
    on TechnologiesPage do |page|
      if product == 'openjdk'
        expect(page.get_started_button_for(product)).to include "products/#{product}/overview"
      elsif product == 'openshift'
        
      elsif @products_with_get_started.include?(product)
        expect(page.get_started_button_for(product)).to include "/products/#{product}/hello-world"
      elsif !@products_with_get_started.include?(product) && !@technologies_with_downloads.include?(product)
        expect(page.get_started_button_for(product)).to include "/products/#{product}/overview"
      else
        expect(page.get_started_button_for(product)).to include "/products/#{product}/download"
      end
    end
  end
end

When(/^products have a Learn link available$/) do
  @products_with_learn_link = products_with_links('learn.html.slim')[0]
end

Then(/^I should see a 'Learn' link for each product$/) do
  @products_with_learn_link.each do |product|
    on TechnologiesPage do |page|
      expect(page.learn_link_for(product)).to include "/products/#{product}/learn"
    end
  end
end

When(/^the products have Docs and API's available$/) do
  @products_with_docs = products_with_links('docs-and-apis.adoc')[0]
end

Then(/^I should see a 'Docs and APIs' link for each product$/) do
  @products_with_docs.each do |product|
    on TechnologiesPage do |page|
      expect(page.docs_and_apis_for(product)).to include "/products/#{product}/docs-and-apis"
    end
  end
end

When(/^the products have Downloads available$/) do
  @technologies_with_downloads = expected_downloads[0]
end

Then(/^I should see a 'Downloads' link for each product$/) do
  products_with_downloads = @technologies_with_downloads - %w(mobileplatform openjdk dotnet)
  products_with_downloads.each do |product|
    on TechnologiesPage do |page|
      expect(page.download_button_for(product)).to include "/products/#{product}/download"
    end
  end
end
