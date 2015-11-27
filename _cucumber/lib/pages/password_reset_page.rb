class PasswordReset < BasePage

  element :new_password_field, '#password-new'
  element :confirm_new_password_field, '#password-confirm'
  element :submit_new_password_btn, "input[value='Submit']"

  def initialize(driver)
    super
    loaded?('Update password | Red Hat Developers')
  end

  def update_password
    wait_for_new_password_field && wait_for_confirm_new_password_field
    new_password_field.set('P@$$word01')
    confirm_new_password_field.set('P@$$word01')
    submit_new_password_btn.click
    wait_for_ajax
  end

end
