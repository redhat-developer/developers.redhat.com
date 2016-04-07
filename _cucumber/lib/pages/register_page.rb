require_relative 'base_page'

class Registration < BasePage

  element :first_name_field, '#firstName'
  element :last_name_field, '#lastName'
  element :email_field, '#email'
  element :password_field, '#password'
  element :password_confirm_field, '#password-confirm'
  element :company_field, "input[id='user.attributes.company']"
  element :country_dropdown, "select[id='user.attributes.country']"
  element :finish_button, ".button[value='Create my account']"
  element :confirmation, '#kc-content'
  element :password_confirm_field_error, '#password-confirm-error'
  element :registration_confirmation, '#registration-confirmation'

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
    country_dropdown.select country
    has_country_dropdown? :text => country
  end

  def create_account
    finish_button.click
  end

end
