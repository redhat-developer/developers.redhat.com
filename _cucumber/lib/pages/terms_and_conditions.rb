require_relative 'base_page'

class TermsAndConditions < BasePage

  element :accept_tcs, "input[value='Accept']"
  element :not_accept_tcs, "input[value='Not Accept']"

  def initialize(driver)
    super
    verify_page('T&C Acceptance | Red Hat Developers')
  end

end
