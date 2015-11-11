require_relative 'base_page'

class ProductOverviewPage < BasePage
  set_url "/products{/product}/overview"

  SIDE_NAV_LINKS = ['Overview', 'Get Started', 'Docs and APIs', 'Learn', 'Download', 'Buzz']
  SIDE_NAV_LINKS.each do |el|
   element :"side_nav_#{el.downcase.tr(' ', '_')}_link", :xpath, "//*[@class='side-nav']//a[contains(text(),'#{el}')]"
  end

  def initialize(driver)
    super
  end

  def open(page)
    load(product: page)
    wait_for_ajax
  end

end
