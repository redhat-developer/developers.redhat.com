When(/^I update my password$/) do
  on UpdatePasswordPage do |page|
    page.submit_new_password
  end
end
