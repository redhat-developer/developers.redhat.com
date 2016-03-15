When(/^I upgrade my account (and|but) (accept|don't accept) the terms and conditions$/) do |arg, negate|
  @page.upgrade_account.upgrade_account_with(@site_user[:password], @site_user[:password], @site_user[:company_name], @site_user[:address_line_one], @site_user[:city], @site_user[:postal_code], @site_user[:phone_number])
  @page.terms_and_conditions.accept_tcs.click if negate.eql?('accept')
  @page.terms_and_conditions.not_accept_tcs.click if negate.eql?("don't accept")
  @page.current_page.wait_for_ajax
end

When(/^I (accept|don't accept) the terms and conditions$/) do |negate|
  if negate.eql?('accept')
    @page.terms_and_conditions.accept_tcs.click
  else
    @page.terms_and_conditions.not_accept_tcs.click
  end
  @page.current_page.wait_for_ajax
end
