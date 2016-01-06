require_relative 'base_page'

class Registration < BasePage

  element :first_name_field, '#firstName'
  element :last_name_field, '#lastName'
  element :email_field, '#email'
  element :password_field, '#password'
  element :password_confirm_field, '#password-confirm'
  element :country_dropdown, "select[id='user.attributes.country']"
  element :finish_button, ".button[value='Finish']"
  element :confirmation, '#kc-content'

  def initialize(driver)
    super
  end

  def open
    Home.new(@driver).open
    register_link.click
    begin
      loaded?('Register | Red Hat Developers')
    rescue
      register_link.click
      loaded?('Register | Red Hat Developers')
    end
  end

  def fill_in_form(first_name, last_name, email, country, password, password_confirmation)
    first_name_field.set first_name
    last_name_field.set last_name
    email_field.set email
    country_dropdown.select country
    password_field.set password
    password_confirm_field.set password_confirmation
  end

  def create_account
    finish_button.click
    wait_for_ajax
  end

end
