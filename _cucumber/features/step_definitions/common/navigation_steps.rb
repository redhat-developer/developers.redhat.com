Given(/^I am on the ([^"]*) page$/) do |page|
  @page.send(page.downcase.tr(' ', '_')).open
end

And(/^I click the (Login|Logout|Register) link$/) do |link|
  @page.current_page.send("#{link.downcase}_link").click
end

Then(/^I should be logged (in|out)$/) do |status|
  if status.eql? 'out'
    expect(@page.current_page).to be_logged_out
  else
    expect(@page.current_page).to be_logged_in
  end
end

Then(/^I should see a primary nav bar with the following tabs:$/) do |table|
  table.raw.each do |row|
    tab = row.first
    case tab
      when 'Login'
        expect(@page.current_page).to have_login_link
      when 'Register'
        expect(@page.current_page).to have_register_link
      when 'Resources'
        expect(@page.current_page.primary_nav_resources_link['href']).to include "#{Capybara.app_host.gsub('https://', '')}/resources/"
      when 'Downloads'
        expect(@page.current_page.primary_nav_downloads_link['href']).to include "#{Capybara.app_host.gsub('https://', '')}/downloads/"
      else
        expect(@page.current_page).to send("have_primary_nav_#{tab.downcase}_link")
    end
  end
end

When(/^I hover over the ([^"]*) menu item$/) do |menu_item|
  @page.current_page.hover_over_nav_menu(menu_item)
end

When(/^I tap on ([^"]*) menu item$/) do |menu_item|
  if menu_item.eql?('Menu')
    @page.current_page.toggle_menu
  else
    @page.current_page.toggle_menu_and_tap(menu_item)
  end
end

Then(/^I should see the following (Topics|Technologies|Community) sub\-menu items:$/) do |tab, table|
  @sub_menu_items = []
  table.raw.each do |row|
    table_items = row.first
    @sub_menu_items << table_items
  end
  @page.current_page.send("wait_for_sub_nav_#{tab.downcase}")
  expect(@page.current_page.send("sub_nav_#{tab.downcase}").map { |name| name.text }).to eq @sub_menu_items
end

And(/^the sub\-menu should include a list of available technologies$/) do
  product_links = []
  @page.current_page.sub_technologies_links.each do |link|
    product_links << link.text
  end
  @sub_menu_items.each do |heading|
    product_links.delete(heading)
  end
  product_links.should =~ @product_names
end

Then(/^I should see the following Community sub-menu items and their description:$/) do |table|
  links = []
  table.hashes.each do |row|
    @page.current_page.sub_nav_community.each do |link|
      links << link.text
    end
    expect(links).to include("#{row['name']} #{row['description']}")
  end
end

When(/^I go back$/) do
  page.evaluate_script('window.history.back()')
end
