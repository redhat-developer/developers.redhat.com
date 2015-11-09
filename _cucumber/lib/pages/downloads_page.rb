require_relative 'base_page.rb'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class DownloadsPage < BasePage
  include ProductsHelper
  set_url '/downloads/'

  element  :products, '#downloads'
  elements :download_latest_links, '.fa-download'
  elements :product_downloads, 'h5 > a'
  elements :other_resources, :xpath, '//*[@id="other-resources"]/ul/li'

  PRODUCTS.each_with_index do |product, i|
    element :"#{product.downcase.tr(' ', '_')}_download_link", :xpath, "(//a[contains(text(),'Download Latest')])[#{i+1}]"
  end

  def initialize(driver)
    super
    warn('WARNING => New products have been added to developers.redhat.com/products directory') unless get_products.count == PRODUCTS.count
  end

  def open
    load
    loaded?('Downloads available from JBoss')
  end

  def available_downloads
    products = []
    product_downloads.map { |name|
      products << name.text }
    products
  end

  def other_resources_links
    other_resources.map { |link| p link.text }
  end

end
