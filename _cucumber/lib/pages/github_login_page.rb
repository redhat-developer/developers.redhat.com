require_relative 'base'

class GitHubPage < Base

  AUTHORIZE_PAGE    = { css: '.oauth-permissions' }
  AUTHORIZE_APP_BTN = { css: '.btn-primary' }
  LOGIN_FIELD       = { id: 'login_field' }
  PASSWORD_FIELD    = { id: 'password' }
  SIGN_IN_BTN       = { css: '#login .btn-primary' }

  def initialize(driver)
    super
  end

  def authorize_app
    wait_for { displayed?(AUTHORIZE_PAGE) && displayed?(AUTHORIZE_APP_BTN) }
    click_on(AUTHORIZE_APP_BTN)
  end

  def login(username, password)
    wait_for { displayed?(LOGIN_FIELD) && displayed?(PASSWORD_FIELD) }
    type(LOGIN_FIELD, username)
    type(PASSWORD_FIELD, password)
    click_on(SIGN_IN_BTN)
  end

end
