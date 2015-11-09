Then(/^I should see at least "([^"]*)" promoted links$/) do |links|
  expect(@page.community).to have_promoted_links :minimum => links.to_i
end

Then(/^I should see at least "([^"]*)" community links$/) do |links|
  expect(@page.community).to have_community_links :minimum => links.to_i
end

Then(/^I should see some well known projects such as:$/) do |table|
  table.raw.each do |row|
    link = row.first
    expect(@page.community.solution_links.map { |name| name.text }).to include link
  end
end
