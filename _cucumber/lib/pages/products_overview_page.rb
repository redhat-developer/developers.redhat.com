require_relative 'base_page'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class ProductOverviewPage < BasePage
  set_url "/products{/product}/overview"

  class << self
    include ProductsHelper
  end

  SIDE_NAV_LINKS = ['Overview', 'Get Started', 'Docs and APIs', 'Learn', 'Download', 'Buzz']
  SIDE_NAV_LINKS.each do |el|
    element :"side_nav_#{el.downcase.tr(' ', '_')}_link", :xpath, "//*[@class='side-nav']//a[contains(text(),'#{el}')]"
  end

  get_products[0].each do |product_id|
    element :"#{product_id}_product_overview_page", ".products#{product_id}overview"
  end

  def initialize(driver)
    super
  end

  def open(page)
    load(product: page)
    wait_for_ajax
  end

end
