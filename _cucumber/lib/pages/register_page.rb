require_relative 'abstract/site_base'

class RegistrationPage < SiteBase
  expected_element(:h1, text: "We're glad you're here")
  #page_title('Register | Red Hat Developers')

  element(:expand_register_with_email)             { |b| b.link(id: 'register-expand-choice-email') }
  element(:expand_register_with_social)            { |b| b.link(id: 'register-expand-choice-social') }
  element(:email_field)                            { |b| b.text_field(id: 'email') }
  element(:password_field)                         { |b| b.text_field(id: 'password') }
  element(:password_confirm_field)                 { |b| b.text_field(id: 'password-confirm') }
  element(:first_name_field)                       { |b| b.text_field(id: 'firstName') }
  element(:last_name_field)                        { |b| b.text_field(id: 'lastName') }
  element(:company_field)                          { |b| b.text_field(id: 'user.attributes.company') }
  element(:country_dropdown)                       { |b| b.select_list(id: 'user.attributes.country') }
  element(:greeting_field)                         { |b| b.text_field(id: 'user.attributes.greeting') }
  element(:address_line_one_field)                 { |b| b.text_field(id: 'user.attributes.addressLine1') }
  element(:city_field)                             { |b| b.text_field(id: 'user.attributes.addressCity') }
  element(:postcode_field)                         { |b| b.text_field(id: 'user.attributes.addressPostalCode') }
  element(:phone_number_field)                     { |b| b.text_field(id: 'user.attributes.phoneNumber') }
  element(:finish_button)                          { |b| b.button(value: 'Create my account') }
  element(:terms_and_conditions_section)           { |b| b.element(class: 'tac-all-wrapper') }
  element(:all_terms)                              { |b| b.checkbox(id: 'tac-checkall') }
  element(:github_button)                          { |b| b.link(id: 'social-github') }
  element(:rhd_developer_terms)                    { |b| b.link(text: 'Red Hat Developer Program Terms & Conditions') }
  element(:rhd_subscription_terms)                 { |b| b.link(text: 'Red Hat Subscription Agreement') }
  element(:rh_portal_terms)                        { |b| b.link(text: 'Red Hat Portals Terms of Use') }

  value(:email_field_error)                        { |b| b.label(id: 'email-error').when_present.text }
  value(:password_field_error)                     { |b| b.label(id: 'password-error').when_present.text }
  value(:password_confirm_field_error)             { |b| b.label(id: 'password-confirm-error').when_present.text }
  value(:first_name_field_error)                   { |b| b.label(id: 'firstName-error').when_present.text }
  value(:last_name_field_error)                    { |b| b.label(id: 'lastName-error').when_present.text }
  value(:company_field_error)                      { |b| b.label(id: 'user.attributes.company-error').when_present.text }
  value(:country_field_error)                      { |b| b.label(id: 'user.attributes.country-error').when_present.text}

  action(:accept_all_terms)                        { |p| p.all_terms.click }
  action(:create_account)                          { |p| p.finish_button.click }
  action(:click_github_button)                     { |p| p.github_button.when_present.click }
  action(:click_link_social_to_existing_acc)       { |p| p.link_social_to_existing_acc.when_present.click }

  def fill_in_form(first_name, last_name, email, company, country, password, password_confirm)
    expand_register_choice_email
    type(email_field, email)
    type(password_field, password)
    type(password_confirm_field, password_confirm)
    type(first_name_field, first_name)
    type(last_name_field, last_name)
    type(company_field, company)
    select_country(country) unless country.nil?
  end

  def select_country(country)
    country_dropdown.select(country)
  end

  def expand_register_choice_email
    expand_register_with_email.click if expand_register_with_email.present?
    email_field.wait_until_present
  end

  def click_register_with_github
    expand_register_with_social.click if expand_register_with_social.present?
    click_github_button
  end

end
