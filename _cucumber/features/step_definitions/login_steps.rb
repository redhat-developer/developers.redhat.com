Then(/^(I|they) should be redirected to the Developers.redhat Login Page$/) do |negate|
  expect(@page.login_page.page_loaded?).to be true
end
