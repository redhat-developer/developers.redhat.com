Then(/^I should see a primary nav bar with the following links:$/) do |table|
  table.raw.each do |row|
    link = row.first
    raise "Expected menu item #{link} but was not found" unless @site.primary_nav.links(link).eql?(true)
  end
end
