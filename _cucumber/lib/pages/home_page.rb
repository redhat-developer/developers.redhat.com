require_relative 'base_page'

class Home < BasePage
  set_url '/'

  element :home_identifier, '.home'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Red Hat Developers')
  end

end
