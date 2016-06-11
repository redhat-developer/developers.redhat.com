Given(/^I am on the Stack Overflow page$/) do
  @page.site_nav.visit('/community/stack-overflow')
  @page.site_nav.wait_for_ajax
end

Then(/^I should see a list of (\d+) results$/) do |results|
  @results = results.to_i
  @page.stack_overflow.questions_loaded?(@results)
end

Then(/^each results should contain an activity summary:$/) do |table|
  table.raw.each do |row|
    element = row.first
    case element
      when 'Votes'
        expect(@page.stack_overflow.votes.size).to eq @results
      when 'Answers'
        expect(@page.stack_overflow.answers.size).to eq @results
      when 'Views'
        expect(@page.stack_overflow.views.size).to eq @results
      else
        raise("#{element} not recognised!")
    end
  end
end

Then(/^each question should contain a question summary$/) do
  expect(@page.stack_overflow.question_summary.size).to eq @results
end

Then(/^it should link to the question on Stack Overflow$/) do
  title, link = @page.stack_overflow.question_title
  expect(title.size).to eq @results
  link.each do |href|
    expect(href).to include 'http://stackoverflow.com/questions/'
  end
end
