require_relative 'base'

class ForgotPassword < Base

  PASSWORD_RESET_PAGE        = { css: '.login-reset-password' }
  USERNAME_FIELD             = { id: 'username' }
  SUBMIT_BTN                 = { xpath: "//input[@value='Submit']" }
  CONFIRMATION               = { css: '.kc-feedback-text' }

  def initialize(driver)
    super
    wait_for(30) { title.include?('Forgot your password?') }
  end

  def enter_email(email)
    wait_for { displayed?(USERNAME_FIELD) }
    type(USERNAME_FIELD, email)
    click_on(SUBMIT_BTN)
    wait_for { displayed?(CONFIRMATION) }
  end

  def confirmation
    text_of(CONFIRMATION)
  end

end
