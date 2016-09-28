And(/^I fill in my country and company$/) do
  on AdditionalInformationPage do |page|
    page.enter_company($site_user[:company_name])
    page.select_country($site_user[:country])
  end
end

And(/^I accept all terms and proceed$/) do
  on AdditionalInformationPage do |page|
    page.accept_all_terms
    page.click_submit
  end
end
