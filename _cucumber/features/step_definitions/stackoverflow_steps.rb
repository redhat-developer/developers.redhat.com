Given(/^I am on the Stack Overflow page$/) do
  @page.site_nav.visit('/community/stack-overflow')
  @page.site_nav.wait_for_ajax
end

Then(/^I should see a list of (\d+) results$/) do |arg|
  expect(@page.stack_overflow.questions).to eq arg.to_i
end

Then(/^each results should contain an activity summary:$/) do |table|
  table.raw.each do |row|
    element = row.first
    case element
      when 'Votes'
        expect(@page.stack_overflow.votes).to eq 10
      when 'Answers'
        expect(@page.stack_overflow.answers).to eq 10
      when 'Views'
        expect(@page.stack_overflow.views).to eq 10
      else
        raise("#{element} not regognised")
    end
  end
end

Then(/^each question should contain a question summary$/) do
  expect(@page.stack_overflow.summary).to eq 10
end

Then(/^it should link to the question on Stack Overflow$/) do
  title, href = @page.stack_overflow.title
  expect(title).to eq 10
  expect(href).to include 'http://stackoverflow.com/questions'
end
