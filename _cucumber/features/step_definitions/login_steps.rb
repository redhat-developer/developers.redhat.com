Then(/^(I|they) should be redirected to the Red Hat Developers Login Page$/) do |negate|
  expect(@page.login_page.page_loaded?).to be true
end
