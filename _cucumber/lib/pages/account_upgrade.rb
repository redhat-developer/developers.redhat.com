require_relative 'base_page'

class UpgradeAccount < BasePage

  element :address_line_one_field, "input[id='user-account:address1']"
  element :city_field, "input[id='user-account:city']"
  element :postal_code_field, "input[id='user-account:postalCode']"
  element :phone_number_field, "input[id='user-account:phone']"
  element :password_field, "input[id='user-account:password']"
  element :confirm_password_field, "input[id='user-account:passwordConfirmation']"
  element :phone_number_field, "input[id='user-account:phone']"
  element :agree_to_all_terms, '.selectAllCheckboxes'
  element :finish_button, ".button[value='Upgrade My Account']"
  element :cancel_button, ".button[value='Cancel Download']"
  element :alert_box, '.warning'

  def initialize(driver)
    super
    verify_page('Additional Information Required')
  end

  def upgrade_account_with(address_line_one, city, postal_code, phone_number, password, confirm_password)
    address_line_one_field.set(address_line_one)
    city_field.set(city)
    postal_code_field.set(postal_code)
    phone_number_field.set(phone_number)
    password_field.set(password)
    confirm_password_field.set(confirm_password)
  end

end
