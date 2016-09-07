Then(/^I should see a list of (\d+) results$/) do |results|
  @results = results.to_i
  on StackOverflowPage do |page|
    page.questions_loaded?(@results)
  end
end

Then(/^each results should contain an activity summary:$/) do |table|
  on StackOverflowPage do |page|
    table.raw.each do |row|
      type = row.first
      page.send(type.downcase).each { |el| expect(el.text).to eq type }
    end
  end
end

Then(/^each question should contain a question summary$/) do
  on StackOverflowPage do |page|
    expect(page.question_summary.size).to eq @results
  end
end

Then(/^each question should link to the relevant question on Stack Overflow$/) do
  on StackOverflowPage do |page|
    page.question_links.each { |link| expect(link.href).to include 'http://stackoverflow.com/questions/' }
  end
end

When(/^a question contains an answer$/) do
  @current_page.get_question_with_answer
end

When(/^a question does not contain an answer$/) do
  @current_page.get_question_without_answer
end

When(/^I (should|should not) see a "([^"]*)" section$/) do |negate, arg|
  if negate == 'should'
    expect(@current_page.latest_answer_section_visible?).to be true
  else
    expect(@current_page.latest_answer_section_visible?).to be false
  end
end

And(/^a "([^"]*)" link that links to that question on Stack Overflow in a new window$/) do |link_title|
  first_window = @current_page.current_window
  @current_page.click_read_full_question_link(link_title)
  @current_page.wait_for_windows(2)
  @current_page.switch_window(first_window)
end

Then(/^each question should display how long ago the question was asked$/) do
  expect(@current_page.author.size).to eq @results
end

Then(/^I should see a Filter by product drop down menu with the following:$/) do |table|
  on StackOverflowPage do |page|
    table.raw.each do |row|
      product = row.first
      expect(page.product_filter.text).to include product
    end
  end
end

When(/^I select "([^"]*)" from the products filter$/) do |product|
  on StackOverflowPage do |page|
    @initial_qtn_content  = []
    page.question_summary.each { |title| @initial_qtn_content << title.text }
    page.select_product(product)
  end
end

Then(/^the results should be updated containing questions relating to "([^"]*)"$/) do |arg|
  on StackOverflowPage do |page|
    updated_qtn_content = []
    page.question_summary.each { |title| updated_qtn_content << title.text }
    updated_qtn_content.should_not =~ @initial_qtn_content
  end
end

Then(/^the default item within the Filter by product drop down menu should be "([^"]*)"$/) do |default|
  on StackOverflowPage do |page|
    expect(page.selected_filter).to eq default
  end
end

Given(/^I have previously filtered results by "([^"]*)"$/) do |product|
  on StackOverflowPage do |page|
    @initial_qtn_content = []
    page.question_summary.each { |title| @initial_qtn_content << title.text }
    page.select_product(product)
  end
end
