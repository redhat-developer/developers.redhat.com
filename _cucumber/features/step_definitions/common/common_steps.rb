Given(/^an (authorised|unauthorised) customer is on the site$/) do |customer|

end

Then(/^(I|they) should see the ([^"]*) page title$/) do |negate, page_title|
  expect(@page.current_page.title).to have_text(page_title.upcase)
end

Then(/^I should see a primary nav bar with the following tabs:$/) do |table|
  table.raw.each do |row|
    tab = row.first
    case tab
      when 'Solutions'
        expect(@page.primary_nav.primary_nav_solutions_link['href']).to include '/solutions/'
      when 'Products'
        expect(@page.primary_nav.primary_nav_products_link['href']).to include '/products/'
      when 'Downloads'
        expect(@page.primary_nav.primary_nav_downloads_link['href']).to include '/downloads/'
      when 'Resources'
        expect(@page.primary_nav.primary_nav_resources_link['href']).to include '/resources/'
      when 'Community'
        expect(@page.primary_nav.primary_nav_community_link['href']).to include '/projects/'
      when 'Events'
        expect(@page.primary_nav.primary_nav_events_link['href']).to include '/events/'
      when 'Blogs'
        expect(@page.primary_nav.primary_nav_blogs_link['href']).to match 'http://developerblog.redhat.com'
      else
        raise "#{tab} is not a recognised menu item, see common_steps.rb"
    end
  end
end
