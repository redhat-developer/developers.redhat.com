require_relative 'base_page'

class UpgradeAccount < BasePage

  element :account_password, :xpath, '//*[@id="user-account:password"]'
  element :account_password_confirmation, :xpath, '//*[@id="user-account:passwordConfirmation"]'
  element :company_name, :xpath, '//*[@id="user-account:company"]'
  element :account_address1, :xpath, '//*[@id="user-account:address1"]'
  element :account_city, :xpath, '//*[@id="user-account:city"]'
  element :account_postal_code, :xpath, '//*[@id="user-account:postalCode"]'
  element :account_phone_number, :xpath, '//*[@id="user-account:phone"]'
  element :terms_and_conditions, :xpath, '//*[@id="user-account:agreeTC"]'
  element :submit_btn, :xpath, '//*[@id="user-account:submit"]'

  def initialize(driver)
    loaded?('User Account Upgrade | Red Hat Developers')
  end

  def upgrade_account_with(password, confirm_password, company, address_line_one, city, postcode, phone_number, tc='yes')
    account_password.set(password)
    account_password_confirmation.set(confirm_password)
    company_name.set(company)
    account_address1.set(address_line_one)
    account_city.set(city)
    account_postal_code.set(postcode)
    account_phone_number.set(phone_number)
    terms_and_conditions.click if tc.eql?('yes')
    page.has_button?('Submit', disabled: false)
    submit_btn.click
    wait_for_ajax
  end

end
