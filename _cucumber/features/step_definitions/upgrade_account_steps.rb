When(/^I upgrade my account (and|but) (accept|don't accept) the terms and conditions$/) do |arg, negate|
  @page.upgrade_account.upgrade_account_with(@site_user[:address_line_one], @site_user[:city], @site_user[:postal_code], @site_user[:phone_number], @site_user[:password], @site_user[:password])
  @page.upgrade_account.agree_to_all_terms.click if negate.eql?('accept')
  @page.upgrade_account.finish_button.click
end

When(/^I (accept|don't accept) the terms and conditions$/) do |negate|
  if negate.eql?('accept')
    @page.terms_and_conditions.accept_tcs.click
  else
    @page.terms_and_conditions.not_accept_tcs.click
  end
end

Then(/^I should see an alert box with the following warning "(.*)"$/) do |message|
  expect(@page.upgrade_account.alert_box).to have_text message
end

Then(/^I click on the cancel download button$/) do
  @page.upgrade_account.cancel_button.click
end
