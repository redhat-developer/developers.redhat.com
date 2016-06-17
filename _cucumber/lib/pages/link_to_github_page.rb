require_relative 'base'

class LinkToGitHub < Base

  KC_ERROR                    = { css: '#kc-error-message .instruction' }
  CHOOSE_ANOTHER_EMAIL_BTN    = { id: 'updateProfile' }
  SEND_VERIFICATION_EMAIL_BTN = { id: 'linkAccount' }

  def initialize(driver)
    super
    wait_for(30) { displayed?(KC_ERROR) }
    verify_page('Link your Github account to a Red Hat account')
  end

  def error
    text_of(KC_ERROR)
  end

  def click_on_choose_another_email
    click_on(CHOOSE_ANOTHER_EMAIL_BTN)
  end

  def click_send_verification_email
    click_on(SEND_VERIFICATION_EMAIL_BTN)
  end

end
