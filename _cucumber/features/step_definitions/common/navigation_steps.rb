Given(/^(I am|they are on) on the ([^"]*) page$/) do |negate, page|
  @page.send(page.downcase.tr(' ', '_')).open
end

Given(/^I should be directed to the ([^"]*) page$/) do |page|
  @page.send(page.downcase.tr(' ', '_')).open
end
