require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Additional Action page
class AdditionalActionPage < SiteBase

  element(:email_field)                  { |b| b.text_field(id: 'email') }
  element(:email_field_error)            { |b| b.element(id: 'email-error') }
  element(:password_field)               { |b| b.text_field(id: 'user.attributes.pwd') }
  element(:confirm_password_field)       { |b| b.text_field(id: 'password-confirm') }
  element(:first_name_field)             { |b| b.text_field(id: 'firstName') }
  element(:last_name_field)              { |b| b.text_field(id: 'lastName') }
  element(:city_field)                   { |b| b.text_field(id: 'user.attributes.addressCity') }
  element(:company_field)                { |b| b.text_field(id: 'user.attributes.company') }
  element(:phone_number_field)           { |b| b.text_field(id: 'user.attributes.phoneNumber') }
  element(:phone_number_field_error)     { |b| b.text_field(id: 'user.attributes.phoneNumber-error') }
  element(:country_dropdown)             { |b| b.select_list(id: 'user.attributes.country') }
  element(:state_dropdown)               { |b| b.select_list(id: 'user.attributes.addressState') }
  element(:all_terms)                    { |b| b.checkbox(id: 'tac-checkall') }
  element(:tac1)                         { |b| b.checkbox(id: 'user.attributes.tcacc-6') }
  element(:tac2)                         { |b| b.checkbox(id: 'user.attributes.tcacc-1246') }
  element(:submit_btn)                   { |b| b.button(value: 'Submit') }
  element(:link_profile_to_social)       { |b| b.link(text: 'Link your social account with the existing account.') }
  element(:warning)                      { |b| b.element(class: 'warning') }

  action(:accept_all_terms)              { |p| p.all_terms.click }
  action(:accept_tac1)                   { |p| p.tac1.click }
  action(:accept_tac2)                   { |p| p.tac2.click }
  action(:click_submit)                  { |p| p.submit_btn.click }
  action(:click_link_profile_to_social)  { |p| p.link_profile_to_social.click }

  value(:feedback)                       { |p| p.warning.text }
  value(:email_field_error_text)         { |p| p.email_field_error.text }

  def fill_in(options = {})
    enter_password(options[:password], options[:password]) if password_field.present?
    type(email_field, options[:email])
    type(first_name_field, options[:first_name])
    type(last_name_field, options[:last_name])
    type(company_field, options[:company_name])
    type(phone_number_field, options[:phone_number])
    select_country(options[:country])
    select_state(options[:state]) unless options[:state].nil?
    type(city_field, options[:city]) unless options[:city].nil?
  end

  def enter_email(email)
    type(email_field, email)
  end

  def enter_password(password, confirm_password)
    type(password_field, password)
    type(confirm_password_field, confirm_password)
  end

  def select_country(country)
    country_dropdown.select(country)
  end

  def select_state(state)
    state_dropdown.select(state)
  end

  def enter_city(city)
    type(city_field, city)
  end

  def enter_phone_number(phone_number)
    type(phone_number_field, phone_number)
  end

  def enter_company(company)
    type(company_field, company)
  end

  def fulluser_tac_accept
    accept_tac1
    accept_tac2
  end

end

# this is the page class that contains all elements and common methods related to the Additional Action page
class AdditionalInformationPage < AdditionalActionPage

  action(:click_accept_all_terms_2)  { |b| b.checkbox(id: 'user-account:j_idt28:j_idt31:0:subscription').click }
  action(:click_update_profile)      { |b| b.button(text: 'Update My User Profile').click }

end
