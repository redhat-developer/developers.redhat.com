Given(/^(I am|they are) on the ([^"]*) page$/) do |negate, page|
  @redirect_url = @page.send(page.downcase.tr(' ', '_')).open
end

And(/^(I|they) click the (Login|Logout|Register) link$/) do |negate, link|
  @page.current_page.send("#{link.downcase}_link").click
  @page.current_page.wait_for_ajax
end

Then(/^(I|they) should be logged (in|out)$/) do |negate, status|
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
      when 'Technologies'
        expect(@page.current_page.primary_nav_technologies_link['href']).to eq "#{Capybara.app_host}/products"
      when 'Resources'
        expect(@page.current_page.primary_nav_resources_link['href']).to eq "#{Capybara.app_host}/resources/"
      else
        expect(@page.current_page).to send("have_primary_nav_#{tab.downcase}_link")
    end
  end
end

When(/^I hover over the ([^"]*) menu item$/) do |menu_item|
  @page.current_page.hover_over_nav_menu(menu_item)
end

Then(/^I should see the following Topics sub\-menu items:$/) do |table|
  table.raw.each do |row|
    sub_menu_items = row.first
    expect(page).to have_text(sub_menu_items)
  end
end

Then(/^I should see the following sub\-menu items:$/) do |table|
  table.raw.each do |row|
    sub_menu_items = row.first
    expect(page).to have_text(sub_menu_items)
  end
end

And(/^the sub\-menu should include a list of available technologies$/) do
  expect(page).to have_text @product_names
end

Then(/^I should see the following sub-menu items and their description:$/) do |table|
  data = table.transpose.raw.inject({}) do |hash, column|
    column.reject!(&:empty?)
    hash[column.shift] = column
    hash
  end
  data['name'].each do |name|
    data['description'].each do |desc|
      expect(page).to have_text(name)
      expect(page).to have_text(desc)
    end
  end
end
