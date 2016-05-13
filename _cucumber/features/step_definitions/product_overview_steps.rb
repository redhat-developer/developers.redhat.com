Given(/^I am on the Product Overview page for each (.*)$/) do |product_id|
  @page.product_overview.open(product_id)
  @selected_product = product_id
end

Then(/^I should see a side-nav with the following options:$/) do |table|
  table.raw.each do |links|
    link = links.first
    case link
      when 'Overview'
        expect(@page.product_overview.side_nav_item_displayed?('Overview')).to be true
      when 'Get Started'
        expect(@page.product_overview.side_nav_item_displayed?('Get Started')).to be true
      when 'Docs And APIs'
        if @products_with_docs.include? @selected_product
          expect(@page.product_overview.side_nav_item_displayed?('Docs And APIs')).to be true
        else
          expect(@page.product_overview.side_nav_item_displayed?('Docs And APIs')).to be false
        end
      when 'Learn'
        if @products_with_learn_link.include? @selected_product
          expect(@page.product_overview.side_nav_item_displayed?('Learn')).to be true
        else
          expect(@page.product_overview.side_nav_item_displayed?('Learn')).to be false
        end
      when 'Download'
        if @technologies_with_downloads.include? @selected_product
          expect(@page.product_overview.side_nav_item_displayed?('Download')).to be true
        else
          expect(@page.product_overview.side_nav_item_displayed?('Download')).to be false
        end
      when 'Buzz'
        if @products_with_buzz.include? @selected_product
          expect(@page.product_overview.side_nav_item_displayed?('Buzz')).to be true
        else
          expect(@page.product_overview.side_nav_item_displayed?('Buzz')).to be false
        end
    end
  end
end
