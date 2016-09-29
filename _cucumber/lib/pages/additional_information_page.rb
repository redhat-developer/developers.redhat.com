require_relative 'abstract/site_base'

class AdditionalInformationPage < SiteBase
  expected_element(:h1, text: 'Additional Information Required')
  #page_title('Additional Information Required | Red Hat Developers')

  element(:company_field)                { |b| b.text_field(id: 'user-account:company') }
  element(:country_dropdown)             { |b| b.select_list(id: 'user-account:country') }
  element(:all_terms)                    { |b| b.checkbox(class: 'selectAllCheckboxes') }
  element(:submit_btn)                   { |b| b.button(value: 'Update My User Profile') }
  element(:cancel_download_btn)          { |b| b.button(value: 'Cancel Download') }
  element(:email_field)                  { |b| b.text_field(id: 'email') }
  element(:email_field_error)            { |b| b.element(id: 'email-error')}
  element(:password_field)               { |b| b.text_field(id: 'user.attributes.pwd') }
  element(:confirm_password_field)       { |b| b.text_field(id: 'password-confirm') }
  element(:first_name_field)             { |b| b.text_field(id: 'firstName') }
  element(:last_name_field)              { |b| b.text_field(id: 'lastName') }
  element(:company_field)                { |b| b.text_field(id: 'user.attributes.company') }
  element(:country_dropdown)             { |b| b.select_list(id: 'user.attributes.country') }
  element(:all_terms)                    { |b| b.checkbox(id: 'tac-checkall') }
  element(:tac1)                         { |b| b.checkbox(id: 'user.attributes.tcacc-6') }
  element(:tac2)                         { |b| b.checkbox(id: 'user.attributes.tcacc-1246') }
  element(:submit_btn)                   { |b| b.button(value: 'Submit') }
  element(:link_profile_to_social)       { |b| b.element(css: '#email-error > a') }
  element(:warning)                      { |b| b.element(class: 'warning') }

  action(:accept_all_terms)              { |p| p.all_terms.when_present.click }
  action(:click_submit)                  { |p| p.submit_btn.when_present.click }
  action(:click_cancel)                  { |p| p.cancel_download_btn.when_present.click }
  action(:click_link_profile_to_social)  { |p| p.link_profile_to_social.when_present(30).click }

  value(:feedback)                       { |p| p.warning.when_present.text }
  element(:email_field_error_text)       { |p| p.email_field_error.when_present.text}

  def fill_in(email, password, first_name, last_name, company, country)
    type(email_field, email) unless email.nil?
    enter_password(password, password) unless password.nil?
    type(first_name_field, first_name) unless first_name.nil?
    type(last_name_field, last_name) unless last_name.nil?
    type(company_field, company) unless company.nil?
    select_country(country) unless country.nil?
  end

  def enter_password(password, confirm_password)
    type(password_field, password)
    type(confirm_password_field, confirm_password)
  end

  def select_country(country)
    country_dropdown.when_present.select(country)
  end

  def enter_company(company)
    type(company_field, company)
  end

end
