require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Product Page.
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
    if side_nav_toggle.present?
      side_nav_toggle.click
      side_nav_open
    else
      side_nav_open
    end
  end

  def side_nav_item_displayed?(nav_item)
    side_nav.text.downcase.include?(nav_item.downcase)
  end

  def click_to_download(url)
    myelement = $browser.link(xpath: "//*//a[@href='#{url}']", index: 0)
    myelement.fire_event('click')
  end

end
