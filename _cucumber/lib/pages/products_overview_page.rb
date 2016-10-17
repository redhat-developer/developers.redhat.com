require_relative 'abstract/site_base'

class ProductOverviewPage < SiteBase

  element(:side_nav)        { |b| b.ul(class: 'side-nav') }
  element(:side_nav_toggle) { |b| b.li(class: 'side-nav-toggle') }
  element(:side_nav_open)   { |b| b.ul(class: 'side-nav-open') }
  element(:download_btn)    { |b| b.link(css: '.download-link > a') }
  element(:download_rhel)   { |b| b.link(text: 'Download Red Hat Enterprise Linux 7') }

  def open_overview_for(product)
    open("/products/#{product}/overview/")
    toggle_product_menu
  end

  def open_download_for(product)
    open("/products/#{product}/download/")
  end

  def toggle_product_menu
    if is_mobile?
      side_nav_toggle.when_present.click
      side_nav_open.wait_until_present
    else
      side_nav.wait_until_present
    end
  end

  def side_nav_item_displayed?(nav_item)
    side_nav.text.include?(nav_item.upcase)
  end

  def click_to_download(url)
    myelement = @browser.link(xpath: "//*//a[@href='#{url}']", :index => 0)
    myelement.when_present.fire_event('click')
  end

end
