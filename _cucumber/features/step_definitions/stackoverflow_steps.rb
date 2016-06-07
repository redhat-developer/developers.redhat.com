Given(/^I am on the Stack Overflow page$/) do  
  @page.site_nav.visit('/community/stack-overflow')
  @page.site_nav.wait_for_ajax
end

Then(/^I should see a list of (\d+) results$/) do |arg|
  expect(@page.stack_overflow.questions).to eq arg
end

Then(/^each results should contain an activity summary:$/) do |table|
  # table is a Cucumber::Core::Ast::DataTable
  pending # Write code here that turns the phrase above into concrete actions
end
