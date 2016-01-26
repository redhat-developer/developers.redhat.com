Given(/^(I am|they are) on the ([^"]*) page$/) do |negate, page|
  @redirect_url = @page.send(page.downcase.tr(' ', '_')).open
end

And(/^(I|they) click the (Login|Logout|Register) link$/) do |negate, link|
  @page.current_page.send("#{link.downcase}_link").click
  @page.current_page.wait_for_ajax
end

When(/^(I|they) click on the "([^"]*)" link$/) do |negate, link|
  click_link(link)
  @page.current_page.wait_for_ajax
end

Then(/^(I|they) should be logged (in|out)$/) do |negate, status|
  if status.eql? 'out'
    expect(@page.current_page).to be_logged_out
  else
    expect(@page.current_page).to be_logged_in
  end
end

Then(/^(I|they) should be redirected to the Developers.redhat Login Page$/) do |negate|
  expect(@page.login).to respond_to :wait_for_login_with_existing_account
end
