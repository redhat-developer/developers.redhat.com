Given(/^I register a new account$/) do
  @redirect_url = @page.registration.open

  @page.registration.fill_in_form(@customer[:first_name], @customer[:last_name], @customer[:email], @customer[:country], @customer[:password], @customer[:password])
  @page.registration.create_account

  verify_account_link = get_email
  url = verify_account_link.to_s.gsub(Capybara.app_host, '')
  visit(url)
  @page.current_page.wait_for_ajax

  expect(@page.current_page).to be_logged_in
end

When(/^I complete the registration form$/) do
  @page.registration.fill_in_form(@customer[:first_name], @customer[:last_name], @customer[:email], @customer[:country], @customer[:password], @customer[:password])
  @page.registration.create_account
end

When(/^I should receive an email containing an account verification link$/) do
  verify_account_link = get_email
  expect(verify_account_link.to_s).to include('email-verification?')
end

When(/^I navigate to the verify account URL$/) do
  verify_account_link = get_email
  url = verify_account_link.to_s.gsub(Capybara.app_host, '')
  visit(url)
  @page.current_page.wait_for_ajax
end

Then(/^I should see the following confirmation message: (.*)/) do |message|
  expect(@page.registration.confirmation).to have_text(message)
end

When(/^I try to enter passwords that do not match$/) do
  @page.registration.fill_in_form(@customer[:first_name], @customer[:last_name], @customer[:email], @customer[:country], @customer[:password], 'password')
  @page.registration.create_account
end
