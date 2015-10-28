require_relative 'base.rb'

class ResourcesPage < Base
  set_url '/resources/'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Discover the developer materials JBoss has to offer')
  end

end
