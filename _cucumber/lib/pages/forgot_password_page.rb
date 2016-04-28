require_relative 'base'

class ForgotPassword < Base

  PASSWORD_RESET_PAGE        = { css: '.login-reset-password' }
  USERNAME_FIELD             = { id: 'username' }
  SUBMIT_BTN                 = { xpath: "//input[@value='Submit']" }
  CONFIRMATION               = { css: '.kc-feedback-text' }

  def initialize(driver)
    super
    wait_for { displayed?(PASSWORD_RESET_PAGE) }
    verify_page('Forgot Password | Red Hat Developers')
  end

  def enter_email(email)
    type(USERNAME_FIELD, email)
    click_on(SUBMIT_BTN)
    wait_for { displayed?(CONFIRMATION) }
  end

  def confirmation
    text_of(CONFIRMATION)
  end

end
