require_relative 'base'

class LoginPage < Base

  LOGIN_PAGE            = { id: 'kc-form-login' }
  TITLE                 = { css: '.centered-title' }
  USERNAME_FIELD        = { id: 'username' }
  PASSWORD_FIELD        = { id: 'password' }
  LOGIN_BTN             = { id: 'kc-login' }
  CANCEL_BTN            = { id: 'kc-cancel' }
  FORGOT_PASSWORD_LINK  = { link: 'Forgot Password?' }
  ERROR_MSG             = { id: 'kc-feedback' }
  REGISTER_ACCOUNT_LINK = { link: 'Register' }
  GITHUB_LOGIN_BTN      = { id: 'social-github' }

  def initialize(driver)
    super
    wait_for(12) { displayed?(LOGIN_PAGE) }
    verify_page('Log In | Red Hat Developers')
  end

  def with_existing_account(username, password)
    type(USERNAME_FIELD, username)
    type(PASSWORD_FIELD, password)
    click_on(LOGIN_BTN)
    wait_for_ajax
  end

  def click_register_link
    click_on(REGISTER_ACCOUNT_LINK)
    wait_for_ajax
  end

  def click_password_reset
    click_on(FORGOT_PASSWORD_LINK)
    wait_for_ajax
  end

  def error_message
    wait_for { displayed?(ERROR_MSG) }
    text_of(ERROR_MSG)
  end

  def click_login_with_github
    wait_for { displayed?(GITHUB_LOGIN_BTN) }
    click_on(GITHUB_LOGIN_BTN)
  end

end
