require_relative 'base.rb'

class SolutionsPage < Base
  set_url '/solutions/'

  element  :solutions_header, '.hero-solutions'
  elements :solutions, '.solutions > li'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Technology Solutions')
  end

end
