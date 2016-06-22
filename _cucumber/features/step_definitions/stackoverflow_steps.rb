Then(/^I should see a list of (\d+) results$/) do |results|
  @results = results.to_i
  @page.stack_overflow.questions_loaded?(@results)
end

Then(/^each results should contain an activity summary:$/) do |table|
  table.raw.each do |row|
    type = row.first
    @page.stack_overflow.activity_summary(type).each { |el| expect(el.text).to eq type }
  end
end

Then(/^each question should contain a question summary$/) do
  expect(@page.stack_overflow.question_summary.size).to eq @results
end

Then(/^each question should link to the relevant question on Stack Overflow$/) do
  @page.stack_overflow.question_titles.each { |link| expect(link.attribute('href')).to include 'http://stackoverflow.com/questions/' }
end

When(/^a question contains an answer$/) do
  @page.stack_overflow.question_with_answer
end

When(/^a question does not contain an answer$/) do
  @page.stack_overflow.question_without_answer
end

When(/^I (should|should not) see a "([^"]*)" section$/) do |negate, arg|
  if negate == 'should'
    expect(@page.stack_overflow.latest_answer_section_visible?).to be true
  else
    expect(@page.stack_overflow.latest_answer_section_visible?).to be false
  end
end

And(/^a "([^"]*)" link that links to that question on Stack Overflow in a new window$/) do |link_title|
  first_window = @page.stack_overflow.current_window
  @page.stack_overflow.click_read_full_question_link(link_title)
  @page.stack_overflow.wait_for_windows(2)
  @page.stack_overflow.switch_window(first_window)
end


Then(/^each question should display how long ago the question was asked$/) do
  expect(@page.stack_overflow.author.size).to eq @results
end

When(/^I scroll to the bottom of the page$/) do
  @page.stack_overflow.scroll_to_bottom_of_page
end

Then(/^I should see a Filter by product drop down menu with the following:$/) do |table|
  table.raw.each do |row|
    product = row.first
    expect(@page.stack_overflow.product_filter.text).to include product
  end
end

When(/^I select "([^"]*)" from the products filter$/) do |product|
  @initial_product_titles = []
  @page.stack_overflow.question_titles.each { |title| @initial_product_titles << title.text }
  @page.stack_overflow.select_product(product)
end

Then(/^the results should be updated containing questions relating to "([^"]*)"$/) do |arg|
  updated_product_titles = []
  @page.stack_overflow.question_titles.each { |title| updated_product_titles << title.text }
  updated_product_titles.should_not =~ @initial_product_titles
end

Then(/^the default item within the Filter by product drop down menu should be "([^"]*)"$/) do |default|
  expect(@page.stack_overflow.selected_filter).to eq default
end

Given(/^I have previously filtered results by "([^"]*)"$/) do |product|
  @initial_product_titles = []
  @page.stack_overflow.question_titles.each { |title| @initial_product_titles << title.text }
  @page.stack_overflow.select_product(product)
end