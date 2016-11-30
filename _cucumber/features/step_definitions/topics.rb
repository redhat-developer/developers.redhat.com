Given(/^I am on the "([^"]*)" Topic page$/) do |topic|
  on TopicPage do |page|
    page.open_topic(topic.downcase)
  end
end

Then(/^I should see at least "([^"]*)" Resource Cards$/) do |card_count|
  on TopicPage do |page|
    wait_for(30, "Timed out waiting for resource cars to be #{card_count}, result was #{page.white_cards.size + page.tertiary_cards.size}") {
      page.white_cards.size + page.tertiary_cards.size >= card_count.to_i
    }
  end
end