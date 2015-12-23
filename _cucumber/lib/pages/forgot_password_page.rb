class ForgotPassword < BasePage

  element :reset_password_page, '.login-reset-password'
  element :reset_password_form, '#kc-reset-password-form'
  element :forgot_password_username_field, '#username'
  element :submit_forgot_password_btn, "input[value='Submit']"
  element :confirmation, '#kc-feedback-text'


  def initialize(driver)
    super
    loaded?('Forgot Password | Red Hat Developers')
    wait_for_reset_password_page && wait_for_reset_password_form
  end

  def enter_email(email)
    wait_for_forgot_password_username_field && wait_for_submit_forgot_password_btn
    forgot_password_username_field.set(email)
    submit_forgot_password_btn.click
    wait_for_ajax && wait_for_confirmation
  end

end
