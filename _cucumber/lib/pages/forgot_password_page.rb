require_relative 'base_page'

class ForgotPassword < BasePage

  element :reset_password_page, '.login-reset-password'
  element :reset_password_form, '#kc-reset-password-form'
  element :forgot_password_username_field, '#username'
  element :submit_forgot_password_btn, "input[value='Submit']"
  element :confirmation, '#kc-feedback-text'


  def initialize(driver)
    super
    verify_page('Forgot Password | Red Hat Developers')
  end

  def enter_email(email)
    forgot_password_username_field.set(email)
    submit_forgot_password_btn.click
  end

end
