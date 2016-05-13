When(/^I upgrade my account (and|but) (accept|don't accept) the terms and conditions$/) do |arg, negate|
  @page.upgrade_account.upgrade_account_with(@site_user[:address_line_one], @site_user[:city], @site_user[:postal_code], @site_user[:phone_number], @site_user[:password], @site_user[:password])
  @page.upgrade_account.click_agree_to_all_terms if negate.eql?('accept')
  @page.upgrade_account.click_finish_btn
end

Then(/^I should see an alert box with the following warning "(.*)"$/) do |message|
  expect(@page.upgrade_account.alert_box).to include(message)
end

Then(/^I click on the cancel download button$/) do
  @page.upgrade_account.click_cancel_btn
end

When(/^I (accept|don't accept) the terms and conditions$/) do |negate|
  if negate.eql?('accept')
    @page.terms_and_conditions.click_accept_tcs
  else
    @page.terms_and_conditions.click_not_accept_tcs
  end
end

