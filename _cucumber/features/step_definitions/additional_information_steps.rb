And(/^I accept terms on the Additional Information page$/) do
  on AdditionalInformationPage do |page|
    page.click_accept_all_terms_2
    page.click_update_profile
  end
end
