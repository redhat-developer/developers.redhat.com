class Home < Base

  def initialize(driver)
    super
    loaded?('Red Hat Developers')
  end

end