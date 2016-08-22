Given(/^I am on the Product Overview page for each (.*)$/) do |product_id|
  on ProductOverviewPage do |page|
    page.open_overview_for(product_id)
    @selected_product = product_id
  end
end

Then(/^I should see a side-nav with the following options:$/) do |table|
  on ProductOverviewPage do |page|
    table.raw.each do |links|
      link = links.first
      case link
        when 'Overview'
          expect(page.side_nav_item_displayed?('Overview')).to be true
        when 'Get Started'
          if @products_with_get_started.include? @selected_product
            expect(page.side_nav_item_displayed?('Get Started')).to be true
          else
            expect(page.side_nav_item_displayed?('Get Started')).to be false
          end
        when 'Docs And APIs'
          if @products_with_docs.include? @selected_product
            expect(page.side_nav_item_displayed?('Docs And APIs')).to be true
          else
            expect(page.side_nav_item_displayed?('Docs And APIs')).to be false
          end
        when 'Learn'
          if @products_with_learn_link.include? @selected_product
            expect(page.side_nav_item_displayed?('Learn')).to be true
          else
            expect(page.side_nav_item_displayed?('Learn')).to be false
          end
        when 'Download'
          if @technologies_with_downloads.include? @selected_product
            expect(page.side_nav_item_displayed?('Download')).to be true
          else
            expect(page.side_nav_item_displayed?('Download')).to be false
          end
        when 'Buzz'
          if @products_with_buzz.include? @selected_product
            expect(page.side_nav_item_displayed?('Buzz')).to be true
          else
            expect(page.side_nav_item_displayed?('Buzz')).to be false
          end
        when 'Help'
          if @products_with_help.include? @selected_product
            expect(page.side_nav_item_displayed?('Help')).to be true
          else
            expect(page.side_nav_item_displayed?('Help')).to be false
          end
      end
    end
  end
end
