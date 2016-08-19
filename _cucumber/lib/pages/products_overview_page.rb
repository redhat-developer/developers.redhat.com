require_relative 'site_base'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class ProductOverviewPage < SiteBase

  class << self
    include ProductsHelper
  end

  element(:loaded?)  { |el| el.wait_until_displayed(class: 'side-nav') }

  def open_overview_for(product)
    open("/products/#{product}/overview/")
    wait_for_ajax
    loaded?
  end

  def side_nav_item_displayed?(nav_item)
    displayed?(xpath: "//*[@class='side-nav']//a[contains(text(),'#{nav_item.split.map(&:capitalize).join(' ')}')]")
  end

end
