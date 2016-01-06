require_relative 'base_page'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class DownloadOverviewPage < BasePage
  set_url "/products{/product}/download"

  class << self
    include ProductsHelper
  end

  # get_products[0].each do |product_id|
  #   # define elements for each available download
  #   element :"#{product_id}_download_page", ".products#{product_id}download"
  element :cdk_download_page, ".productscdkdownload"
  # end

  def initialize(driver)
    super
  end

  def open(page)
    load(product: page)
    wait_for_ajax
  end

end
