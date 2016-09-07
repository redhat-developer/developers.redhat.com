require_relative 'abstract/site_base'

class ProductOverviewPage < SiteBase

  element(:side_nav)  { |b| b.ul(class: 'side-nav') }

  def open_overview_for(product)
    open("/products/#{product}/overview/")
    side_nav.wait_until_present
  end

  def side_nav_item_displayed?(nav_item)
    @browser.link(xpath: "//*[@class='side-nav']//a[contains(text(),'#{nav_item.split.map(&:capitalize).join(' ')}')]").present?
  end

end
