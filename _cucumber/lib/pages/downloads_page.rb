require_relative 'base_page.rb'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class DownloadsPage < BasePage
  set_url '/downloads/'

  class << self
    include ProductsHelper
  end

  elements :download_latest_links, '.fa-download'
  elements :product_downloads, 'h5 > a'
  elements :other_resources, :xpath, '//*[@id="other-resources"]/ul/li'

  get_products[0].each do |product_id|
    # define elements for each available download
   element :"#{product_id.downcase.tr(' ', '_')}_overview_link", "##{product_id}-overview"
   element :"#{product_id.downcase.tr(' ', '_')}_download_link", "#download-#{product_id}"
  end

  def initialize(driver)
    super
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
    other_resources.map { |link| link.text }
  end

end
