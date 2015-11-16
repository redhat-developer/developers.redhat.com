Then(/^(I|they) should be redirected to the Developers.redhat Login Page$/) do |negate|
  expect(@page.login_page).to respond_to :wait_for_login_with_existing_account
end
