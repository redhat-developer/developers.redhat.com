Then(/^I should see text "Showing "(\d+)\-(\d+)" of results$/) do |arg1, arg2|
  @page.pagination.results_text.should =~ /Showing #{arg1}-#{arg2} of/
end