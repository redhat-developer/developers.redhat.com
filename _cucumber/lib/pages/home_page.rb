require_relative 'base_page.rb'

class Home < BasePage
  set_url '/'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Red Hat Developers')
  end

end
