require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Registration page.
class RegistrationPage < SiteBase
  page_url '/register'
  expected_element(:h1, text: 'Register for your free Red Hat Developer Program account')

  element(:expand_register_with_email)             { |b| b.link(id: 'register-expand-choice-email') }
  element(:expand_register_with_social)            { |b| b.link(id: 'register-expand-choice-social') }
  element(:email_field)                            { |b| b.text_field(id: 'email') }
  element(:password_field)                         { |b| b.text_field(id: 'password') }
  element(:first_name_field)                       { |b| b.text_field(id: 'firstName') }
  element(:last_name_field)                        { |b| b.text_field(id: 'lastName') }
  element(:country_dropdown)                       { |b| b.select_list(id: 'user.attributes.country') }
  element(:finish_button)                          { |b| b.button(value: 'Create my account') }
  element(:github_button)                          { |b| b.link(id: 'social-github') }

  action(:create_account)                          { |p| p.finish_button.click }
  action(:click_github_button)                     { |p| p.github_button.click }
  action(:click_link_social_to_existing_acc)       { |p| p.link_social_to_existing_acc.click }

  value(:thanks_message)                           { |b| b.h2(class: 'divider').text }
  value(:email_field_error)                        { |b| b.span(id: 'email-error').text }
  value(:password_field_error)                     { |b| b.span(id: 'password-error').text }
  value(:first_name_field_error)                   { |b| b.span(id: 'firstName-error').text }
  value(:last_name_field_error)                    { |b| b.span(id: 'lastName-error').text }
  value(:country_field_error)                      { |b| b.span(id: 'user.attributes.country-error').text }

  def fill_in_form(options = {})
    expand_register_choice_email
    type(email_field, options[:email])
    type(password_field, options[:password])
    type(first_name_field, options[:first_name])
    type(last_name_field, options[:last_name])
    country_dropdown.select(options[:country])
  end

  def expand_register_choice_email
    expand_register_with_email.click if expand_register_with_email.visible?
  end

  def click_register_with_github
    expand_register_with_social.click if expand_register_with_social.visible?
    click_github_button
  end

end

# this is the page class that contains all elements and common methods related to the Registration page that is displayed when downloading a product.
class DownloadRegistrationPage < RegistrationPage
  expected_element(:h1, text: 'Thank you for your interest in this download')

  element(:finish_button) { |b| b.button(value: 'CREATE ACCOUNT & DOWNLOAD') }

  def fill_download_reg_form(options = {})
    expand_register_choice_email
    type(email_field, options[:email])
    type(password_field, options[:password])
    type(password_confirm_field, options[:password])
    type(first_name_field, options[:first_name])
    type(last_name_field, options[:last_name])
    type(company_field, options[:company_name])
    type(phone_number_field, options[:phone_number])
    select_country(options[:country])
    select_state(options[:state]) unless options[:state].nil?
    type(city_field, options[:city]) unless options[:city].nil?
  end

end
