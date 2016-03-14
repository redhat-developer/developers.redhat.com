require_relative 'base_page'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class ProductDownloadPage < BasePage
  set_url "/products{/product}/download"

  class << self
    include ProductsHelper
  end

  get_products[0].each do |product_id|
    element :"#{product_id}_download_page", ".products#{product_id}download"
  end

  def initialize(driver)
    super
  end

  def open(page)
    load(product: page)
    wait_for_ajax
  end

  def click_featured_download_for(product, version,  url)
    page.click_link("Download #{product} #{version}", :href => url)
    wait_for_ajax
  end
end
