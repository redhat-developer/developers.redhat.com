require_relative 'base_page'

class Registration < BasePage

  element :email_field, '#email'
  element :email_error, '#email-error'
  element :password_field, '#password'
  element :password_error, '#password-error'
  element :password_confirm_field, '#password-confirm'
  element :password_confirm_error, '#password-confirm-error'
  element :first_name_field, '#firstName'
  element :first_name_error, "label[id='firstName-error']"
  element :last_name_field, '#lastName'
  element :last_name_error, "label[id='lastName-error']"
  element :company_field, "input[id='user.attributes.company']"
  element :company_error,  "label[id='user.attributes.company-error']"
  element :country_dropdown, "select[id='user.attributes.country']"
  element :country_error, "label[id='user.attributes.country-error']"
  element :greeting_field, "select[id='user.attributes.greeting']"
  element :address_line_one_field, "input[id='user.attributes.addressLine1']"
  element :city_field, "input[id='user.attributes.addressCity']"
  element :postal_code_field, "input[id='user.attributes.addressPostalCode']"
  element :phone_number_field, "input[id='user.attributes.phoneNumber']"
  element :finish_button, ".button[value='Create my account']"
  element :create_account_and_download, ".button[value='CREATE ACCOUNT & DOWNLOAD']"
  element :confirmation, '#kc-content'
  element :password_confirm_field_error, '#password-confirm-error'
  element :registration_confirmation, '#registration-confirmation'
  element :checkall_tac, '#tac-checkall'
  element :accept_terms, '.fulluser-ttac'

  def initialize(driver)
    super
  end

  def open
    open_login_register('register')
    verify_page('Register | Red Hat Developers')
  end

  def fill_in_form(first_name, last_name, email, company, country, password, password_confirmation)
    email_field.set email
    password_field.set password
    password_confirm_field.set password_confirmation
    first_name_field.set first_name
    last_name_field.set last_name
    company_field.set company
    country_dropdown.select country unless country == nil
  end

  def fill_in_extended_form(email, password, password_confirmation, greeting, first_name, last_name, company, address_line_one, city, postal_code, country, phone_number)
    email_field.set email
    password_field.set password
    password_confirm_field.set password_confirmation
    greeting_field.select greeting
    first_name_field.set first_name
    last_name_field.set last_name
    company_field.set company
    address_line_one_field.set address_line_one
    city_field.set city
    postal_code_field.set postal_code
    country_dropdown.select country
    has_country_dropdown? :text => country
    phone_number_field.set phone_number
  end

  def create_account
    finish_button.click
  end

end
