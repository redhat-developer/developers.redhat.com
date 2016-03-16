Given(/^(I am|they are on) on the Product Overview page for each (.*)$/) do |negate, product_id|
  @page.product_overview.open(product_id)
  @selected_product = product_id
end

Then(/^I should see a side-nav with the following options:$/) do |table|
  table.raw.each do |links|
    link = links.first
    case link
      when 'Overview'
        expect(@page.product_overview).to have_side_nav_overview_link
      when 'Get Started'
        expect(@page.product_overview).to have_side_nav_get_started_link
      when 'Docs And APIs'
        if @products_with_docs.include? @selected_product
          expect(@page.product_overview).to have_side_nav_docs_and_apis_link
        else
          expect(@page.product_overview).not_to have_side_nav_docs_and_apis_link
        end
      when 'Learn'
        if @products_with_learn_link.include? @selected_product
          expect(@page.product_overview).to have_side_nav_learn_link
        else
          expect(@page.product_overview).not_to have_side_nav_learn_link
        end
      when 'Download'
        if @technologies_with_downloads.include? @selected_product
          expect(@page.product_overview).to have_side_nav_download_link
        else
          expect(@page.product_overview).not_to have_side_nav_download_link
        end
      when 'Buzz'
        if @products_with_buzz.include? @selected_product
          expect(@page.product_overview).to have_side_nav_buzz_link
        else
          expect(@page.product_overview).not_to have_side_nav_buzz_link
        end
    end
  end
end
