Then(/^I should see text "Showing "(\d+)\-(\d+)" of "(.*)" results"$/) do |arg1, arg2, arg3|
  @page.pagination.results_text.should =~ /Showing #{arg1}-#{arg2} of \d{5} results/
end