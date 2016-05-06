require_relative 'base'

class UpdatePassword < Base

  NEW_PASSWORD_FIELD         = { id: 'password-new' }
  NEW_PASSWORD_CONFIRM_FIELD = { id: 'password-confirm' }
  SUBMIT_NEW_PASSWORD_BTN    = { xpath: "//input[@value='Submit']" }
  KC_FEEDBACK                = { id: 'kc-feedback' }

  def initialize(driver)
    super
    verify_page('Update password | Red Hat Developers')
  end

  def submit_new_password
    type(NEW_PASSWORD_FIELD, 'P@$$word01')
    type(NEW_PASSWORD_CONFIRM_FIELD, 'P@$$word01')
    click_on(SUBMIT_NEW_PASSWORD_BTN)
  end

  def confirmation
    wait_for { displayed?(KC_FEEDBACK) }
    text_of(KC_FEEDBACK)
  end

end
