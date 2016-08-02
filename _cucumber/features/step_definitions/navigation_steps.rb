Given(/^I am on the ([^"]*) page$/) do |page|
  case page.downcase
    when 'home'
      @page.site_nav.visit
    when 'technologies'
      @page.site_nav.visit('/products/')
    when 'downloads'
      @page.site_nav.visit('/downloads/')
    when 'registration'
      @page.site_nav.navigate_to('register')
    when 'login'
      @page.site_nav.navigate_to('login')
    when 'stack overflow'
      @page.site_nav.visit('/stack-overflow/')
    when 'product forums'
      @page.site_nav.visit('/forums/')
    when 'edit details'
      @page.site_nav.get('https://developers.stage.redhat.com/auth/realms/rhd/account/')
    else
      @page.site_nav.visit("/#{page.downcase}/")
  end
  @page.site_nav.wait_for_ajax
end

When(/^I click the Login link$/) do
  @page.site_nav.click_login
end

When(/^I click the Logout link$/) do
  @page.site_nav.click_logout
end

When(/^I click the Register link$/) do
  @page.site_nav.click_register
end

Given(/^I tap on ([^"]*) menu item$/) do |menu_item|
  if menu_item.eql?('Menu')
    @page.site_nav.toggle_menu
  else
    @page.site_nav.toggle_menu_and_tap(menu_item.downcase)
  end
end

When(/^I go back$/) do
  @page.current_page.go_back
end

Then(/^I should see a primary nav bar with the following tabs:$/) do |table|
  table.raw.each do |row|
    menu_item = row.first
    result = (@page.site_nav.menu_item_present?(menu_item.downcase))
    result.should == true
  end
end

When(/^I hover over the ([^"]*) menu item$/) do |menu_item|
  @page.site_nav.hover_over_nav_menu(menu_item.downcase)
end

Then(/^I should see the following "(Topics|Technologies|Community|Help)" (desktop|mobile) sub\-menu items:$/) do |tab, resolution, table|
  table.raw.each do |row|
    sub_items = row.first
    expect(@page.site_nav.sub_menu_items(tab.downcase, resolution)).to include(sub_items)
  end
end

And(/^the sub\-menu should include a list of available technologies$/) do
  @product_names.each do |products|
    expect(@page.site_nav.sub_menu_items('technologies', 'desktop')).to include(products)
  end
end

Then(/^I should see the following Community sub-menu items and their description:$/) do |table|
  table.hashes.each do |row|
    expect(@page.site_nav.sub_menu_items('community', 'desktop')).to include("#{row['name']}")
    expect(@page.site_nav.sub_menu_items('community', 'desktop')).to include("#{row['description']}")
  end
end

Then(/^I should see the following Help sub-menu items and their description:$/) do |table|
  table.hashes.each do |row|
    expect(@page.site_nav.sub_menu_items('help', 'desktop')).to include("#{row['name']}")
    expect(@page.site_nav.sub_menu_items('help', 'desktop')).to include("#{row['description']}")
  end
end

Then(/^each Topics sub\-menu item should contain a link to its retrospective page:$/) do |table|
  table.hashes.each do |row|
    href = @page.site_nav.get_href_for("#{row['name']}")
    expect(href).to eq "#{$host_to_test}/#{row['href']}"
  end
end

Then(/^each Technologies sub-menu heading should contain a link to its retrospective section of the technologies page:$/) do |table|
  table.raw.each do |row|
    sub_items = row.first
    href = @page.site_nav.get_href_for(sub_items)
    case sub_items.downcase
      when 'cloud'
        expect(href).to eq "#{$host_to_test}/products/#private_cloud/"
      when 'accelerated development and management'
        expect(href).to eq "#{$host_to_test}/products/#development_and_management/"
      else
        expect(href).to eq "#{$host_to_test}/products/##{sub_items.downcase.gsub(' ', '_')}/"
    end
  end
end

Then(/^each available technology should link to their retrospective product overview page$/) do
  product_ids, product_names = get_products

  product_names.each do |product_name|
    @href = @page.site_nav.get_href_for(product_name)
  end

  product_ids.each do |product_id|
    @product_id = product_id
  end

  expect(@href).to eq "#{$host_to_test}/products/#{@product_id}/overview/"

end

Then(/^each Communities sub\-menu item should contain a link to its retrospective page:$/) do |table|
  table.hashes.each do |row|
    href = @page.site_nav.get_href_for("#{row['name']}")
    if row['name'] == 'Developers Blog'
      expect(href).to eq 'http://developers.redhat.com/blog/'
    else
      expect(href).to eq "#{$host_to_test}/#{row['href']}/"
    end
  end
end

Then(/^each Help sub\-menu item should contain a link to its retrospective page:$/) do |table|
  table.hashes.each do |row|
    href = @page.site_nav.get_href_for("#{row['name']}")
    if row['name'] == 'Resources'
      expect(href).to eq "#{$host_to_test}/resources"
    else
      expect(href).to eq "#{$host_to_test}/#{row['href']}"
    end
  end
end
