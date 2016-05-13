require_relative 'base'

class Home < Base

  HOME_ID = { css: '.home' }

  def initialize(driver)
    super
    verify_page('Red Hat Developers')
  end

end
