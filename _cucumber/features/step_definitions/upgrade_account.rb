When(/^I upgrade my account (and|but) (accept|don't accept) the terms and conditions$/) do |arg, negate|
  @page.upgrade_account.upgrade_account_with(@customer[:password], @customer[:password], @customer[:company_name], @customer[:address_line_one], @customer[:city], @customer[:postal_code], @customer[:phone_number])
  @page.terms_and_conditions.accept_tcs.click if negate.eql?('accept')
  @page.terms_and_conditions.not_accept_tcs.click if negate.eql?("don't accept")
  @page.current_page.wait_for_ajax
end

When(/^I (accept|don't accept) the terms and conditions$/) do |negate|
  @page.terms_and_conditions.accept_tcs.click if negate.eql?('accept')
  @page.terms_and_conditions.not_accept_tcs.click if negate.eql?("don't accept")
  @page.current_page.wait_for_ajax
end
