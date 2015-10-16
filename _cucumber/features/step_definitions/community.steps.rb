Then(/^I should see the community page title$/) do
  expect(@site.community.community_title).to be_truthy
end

Then(/^I should see at least "([^"]*)" promoted links$/) do |links|
  expect(@site.community.promoted_image_links(links)).to be_truthy
end

Then(/^I should see at least "([^"]*)" community links$/) do |links|
  @site.community.clear_filters
  expect(@site.community.community_links(links)).to be_truthy
end

Then(/^I should see some well known projects such as:$/) do |table|
  table.raw.each do |row|
    link = row.first
     @site.community.solution_name_links.should include link
  end
end
