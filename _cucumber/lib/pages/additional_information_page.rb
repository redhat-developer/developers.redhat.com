require_relative 'abstract/site_base'

class AdditionalInformationPage < SiteBase
  expected_element(:h1, text: 'Additional Information Required')
  #page_title('Additional Information Required | Red Hat Developers')

  element(:company_field)                { |b| b.text_field(id: 'user-account:company') }
  element(:country_dropdown)             { |b| b.select_list(id: 'user-account:country') }
  element(:all_terms)                    { |b| b.checkbox(class: 'selectAllCheckboxes') }
  element(:submit_btn)                   { |b| b.button(value: 'Update My User Profile') }
  element(:cancel_download_btn)          { |b| b.button(value: 'Cancel Download') }

  action(:accept_all_terms)              { |p| p.all_terms.when_present.click }
  action(:click_submit)                  { |p| p.submit_btn.when_present.click }
  action(:click_cancel)                  { |p| p.cancel_download_btn.when_present.click }

  def select_country(country)
    country_dropdown.when_present.select(country)
  end

  def enter_company(company)
    type(company_field, company)
  end

end
