require_relative 'site_base'

class RegistrationPage < SiteBase
  page_url('/register/')
  page_title('Register | Red Hat Developers')

  value(:register_with_email_section_displayed?)   { |el| el.displayed?(id: 'login-choice-email') }
  value(:register_with_social_section_displayed?)  { |el| el.displayed?(id: 'login-choice-social') }

  element(:expand_register_with_email)  { |el| el.find(id: 'register-expand-choice-email') }
  element(:expand_register_with_social) { |el| el.find(id: 'register-expand-choice-social') }

  element(:email_field)                 { |el| el.find(id: 'email') }
  value(:email_field_error)             { |el| el.text_of(id: 'email-error') }

  element(:password_field)              { |el| el.find(id: 'password') }
  value(:password_field_error)          { |el| el.text_of(id: 'password-error') }

  element(:password_confirm_field)      { |el| el.find(id: 'password-confirm') }
  value(:password_confirm_field_error)  { |el| el.text_of(id: 'password-confirm-error') }

  element(:first_name_field)            { |el| el.find(id: 'firstName') }
  value(:first_name_field_error)        { |el| el.text_of(id: 'firstName-error') }

  element(:last_name_field)             { |el| el.find(id: 'lastName') }
  value(:last_name_field_error)         { |el| el.text_of(id: 'lastName-error') }

  element(:company_field)               { |el| el.find(id: 'user.attributes.company') }
  value(:company_field_error)           { |el| el.text_of(id: 'user.attributes.company-error') }

  element(:country_dropdown)            { |el| el.find(id: 'user.attributes.country') }
  value(:country_field_error)           { |el| el.text_of(id: 'user.attributes.country-error') }

  element(:greeting_field)              { |el| el.find(id: 'user.attributes.greeting') }

  element(:address_line_one_field)      { |el| el.find(id: 'user.attributes.addressLine1') }
  element(:city_field)                  { |el| el.find(id: 'user.attributes.addressCity') }
  element(:postcode_field)              { |el| el.find(id: 'user.attributes.addressPostalCode') }
  element(:phone_number_field)          { |el| el.find(id: 'user.attributes.phoneNumber') }
  element(:finish_button)               { |el| el.find(xpath: "//input[@value='Create my account']") }

  element(:terms_and_conditions_section) { |el| el.find(class: 'tac-all-wrapper') }
  element(:accept_all_terms)             { |el| el.find(id: 'tac-checkall') }
  element(:developer_terms)              { |el| el.find(id: 'user.attributes.tcacc-1246') }
  element(:redhat_subscription_terms)    { |el| el.find(id: 'user.attributes.tcacc-6') }
  element(:redhat_portal_terms)          { |el| el.find(id: 'user.attributes.tcacc-1010') }

  element(:github_button)                { |el| el.find(id: 'social-github') }

  action(:create_account)                {|el|  el.click_on(xpath: "//input[@value='Create my account']")}

  def fill_in_form(first_name, last_name, email, company, country, password, password_confirm)
    wait_for { email_field.displayed? }
    type(email_field, email)
    type(password_field, password)
    type(password_confirm_field, password_confirm)
    type(first_name_field, first_name)
    type(last_name_field, last_name)
    type(company_field, company)
    select(country_dropdown, country) unless country.nil?
  end

  def expand_register_choice_email
    if expand_register_with_email.displayed?
      expand_register_with_email.click
      wait_for { register_with_email_section_displayed? }
    end
  end

  def expand_register_choice_social
    if expand_register_with_social.displayed?
      expand_register_with_social.click
      wait_for { register_with_social_section_displayed? }
    end
  end

  def click_register_with_github
    if expand_register_with_social.displayed?
      expand_register_with_social.click
    end
    wait_for { github_button.displayed? }
    github_button.click
  end

  def accept_terms(term)
    case term
      when 'all'
        accept_all_terms.click
      when 'developer'
        developer_terms.click
      when 'red hat'
        redhat_subscription_terms.click
      when 'portal'
        redhat_portal_terms.click
      else
        raise("#{term} is not a recognised condition")
    end
  end

end
