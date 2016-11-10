require_relative 'abstract/site_base'

class ProductOverviewPage < SiteBase

  element(:side_nav)  { |b| b.li(class: 'side-nav') }

  def open_overview_for(product)
    open("/products/#{product}/overview/")
    side_nav.wait_until_present
  end

  def open_download_for(product)
    open("/products/#{product}/download/")
    side_nav.wait_until_present
  end

  def side_nav_item_displayed?(nav_item)
    side_nav.when_present.text.include?(nav_item)
  end

  def click_to_download(url)
    myelement = @browser.link(xpath: "//*//a[@href='#{url}']", :index => 0)
    myelement.when_present.fire_event('click')
  end

end
