require_relative 'base'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class ProductDownloadPage < Base
  class << self
    include ProductsHelper
  end

  def initialize(driver)
    super
    verify_page('Downloads')
  end

  def loaded?(product)
    wait_for { displayed?(css: ".products#{product}download") }
  end

  def click_featured_download_for(product, version,  url)
    click_on(link: "Download #{product} #{version}", :href => url)
  end

end
