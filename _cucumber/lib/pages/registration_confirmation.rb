require_relative 'base_page'

class RegistrationConfirmation < BasePage

  element :confirmation_page, '.confirmation'
  element :registration_confirmation, '#registration-confirmation'

  def initialize(driver)
    super
    verify_page('Thank you for registering!')
  end

end
