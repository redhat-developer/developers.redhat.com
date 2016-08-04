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
  @page.resources.filter_by(filter_type)
end

Then(/^the results should be filtered by (.*)$/) do |filter|
  updated_results = @page.resources.results
  @page.resources.results_contain_img_for(filter).should == true
end

When(/^I uncheck the "([^"]*)" filter$/) do |filter_type|
  @page.resources.filter_by(filter_type)
end

Then(/^the default set of results are displayed$/) do
  results = @page.resources.results
  @initial_results.should == results
end

And(/^the results for "([^"]*)" are displayed$/) do |filter_type|
  @page.resources.results_contain_img_for(filter_type).should == true
end

And(/^the results displayed should not contain "([^"]*)"$/) do |filter_type|
  @page.resources.results_contain_img_for(filter_type).should_not == true
end

Then(/^the max characters on the Keyword field should be set to "([^"]*)"$/) do |arg|
  @page.resources.keyword_field.attribute('maxlength').should == arg
end


When(/^I enter "([^"]*)" into the Keyword's box$/) do |term|
  @page.resources.keyword_search(term)
end

Then(/^the results displayed should contain "([^"]*)"$/) do |term|
  results = @page.resources.results
  results.each { |res| res.should include term }
end

Then(/^the results displayed should contain "([^"]*)" or "([^"]*)"$/) do |term1, term2|
  results = @page.resources.results
  results.each { |res|
    result = res.downcase.include?(term1.downcase) || res.downcase.include?(term2.downcase)
    result.should be true
  }
end

Then(/^some of the results should contain a "([^"]*)" tag$/) do |tag|
  results = @page.resources.tags
  occurrences = Hash.new(0)
  results.each do |v|
    occurrences[v.downcase] += 1
  end
  occurrences["#{tag.downcase}"].should be >= 1
end

When(/^select "([^"]*)" from the product filter$/) do |product|
  @initial_results = @page.resources.results
  @page.resources.filter_by_product(product)
end


Then(/^the results should be updated$/) do
  updated_results = @page.resources.results
  @initial_results.should_not == updated_results
end

When(/^I change the Publish date drop down menu to "([^"]*)"$/) do |date_type|
  @page.resources.filter_by_date(date_type)
end

Then(/^all of the results should contain a "([^"]*)" thumbnail$/) do |filter|
  @page.resources.results_contain_img_for(filter).should == true
end

Then(/^the results should be from "([^"]*)"$/) do |publish_date|
  results = @page.resources.results_date
  top_result = results.first
  results.delete(top_result)
  results.each do |date|
    remaining = DateTime.parse(date).to_date.to_s
    case publish_date
      when 'Past Day'
        valid = Date.today - 1 <= Date.parse(remaining, "%d-%m-%Y")
      when 'Past Week'
        valid = Date.today - 7 <= Date.parse(remaining, "%d-%m-%Y")
      when 'Past Month'
        valid = Date.today.prev_month <= Date.parse(remaining, "%d-%m-%Y")
      when 'Past Quarter'
        valid = Date.today.prev_month - 3 <= Date.parse(remaining, "%d-%m-%Y")
      when 'Past Year'
        valid = Date.today.prev_year <= Date.parse(remaining, "%d-%m-%Y")
      else
        raise("#{publish_date} is not a valid filter type")
    end
    valid.should == true
  end
end

And(/^results have loaded$/) do
  @page.resources.loaded?
  @page.pagination.has_pagination?.should be true
  @initial_results = @page.resources.results
end

When(/^I select "([^"]*)" from the results per page filter$/) do |results_per_page|
  @page.resources.results_count(results_per_page)
end