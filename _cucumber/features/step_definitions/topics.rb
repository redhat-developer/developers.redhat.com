Given(/^I am on the "([^"]*)" Topic page$/) do |topic|
  on TopicPage do |page|
    page.open_topic(topic.downcase)
  end
end

Then(/^I should see at least "([^"]*)" Resource Cards$/) do |card_count|
  on TopicPage do |page|
    expect(page.white_cards.size + page.tertiary_cards.size).to be >= card_count.to_i 
  end
end