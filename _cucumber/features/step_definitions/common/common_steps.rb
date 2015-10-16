Then(/^I should see a primary nav bar with the following links:$/) do |table|
  table.raw.each do |row|
    link = row.first
    expect(@site.primary_nav.links(link)).to be_truthy
  end
end
