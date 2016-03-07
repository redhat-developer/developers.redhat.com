require_relative 'base_page.rb'

class ResourcesPage < BasePage
  set_url '/resources/'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Discover the developer materials Red Hat has to offer')
  end

end
