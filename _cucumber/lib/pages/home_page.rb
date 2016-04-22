require_relative 'base_page'

class Home < BasePage
  set_url '/'

  element :home_identifier, '.home'

  def initialize(driver)
    super
  end

  def open
    load
    verify_page('Red Hat Developers')
  end

end
