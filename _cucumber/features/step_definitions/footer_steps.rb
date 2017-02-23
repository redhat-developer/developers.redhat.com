Then(/^the footer should contain a "([^"]*)" link$/) do |arg1|
  link = @browser.link text: 'Report a website issue'
  link.present?
end
