Given(/^I am on the ([^"]*) page$/) do |page|
  @page.send(page.downcase.tr(' ', '_')).open
end
