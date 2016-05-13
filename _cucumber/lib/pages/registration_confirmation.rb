require_relative 'base'

class RegistrationConfirmation < Base

  CONFIRMATION_PAGE = { css: '.confirmation' }

  def initialize(driver)
    super
    wait_for { displayed?(CONFIRMATION_PAGE) }
    verify_page('Thank you for registering!')
  end

end
