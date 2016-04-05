require_relative 'base_page'

class SolutionsPage < BasePage
  set_url '/solutions/'

  element  :solutions_header, '.hero-solutions'
  elements :solutions, '.solutions > li'

  def initialize(driver)
    super
  end

  def open
    load
    verify_page('Technology Solutions')
  end

end
