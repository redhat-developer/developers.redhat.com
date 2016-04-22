require_relative 'base_page'

class PasswordReset < BasePage

  element :new_password_field, '#password-new'
  element :confirm_new_password_field, '#password-confirm'
  element :submit_new_password_btn, "input[value='Submit']"

  def initialize(driver)
    super
    verify_page('Update password | Red Hat Developers')
  end

  def update_password
    new_password_field.set('P@$$word01')
    confirm_new_password_field.set('P@$$word01')
    submit_new_password_btn.click
  end

end
