Then(/^none of the product filters should be checked$/) do
  el = @page.resources.any_checked?
  el.should_not include true
end

Then(/^I should see "([^"]*)" results ordered by Most Recent first$/) do |arg|
  results = @page.resources.results_date
  top_result = results.first
  results.delete(top_result)
  results.each do |date|
    remaining = DateTime.parse(date).to_date.to_s
    top_result.should >= remaining
  end
end

When(/^I click to filter results by "([^"]*)"$/) do |filter_type|
  @initial_results = @page.resources.results
  @page.resources.filter_by(filter_type)
end

Then(/^the results should be filtered by (.*)$/) do |filter|
  updated_results = @page.resources.results
  @initial_results.should_not == updated_results
end
