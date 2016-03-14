require_relative 'base_page'
require_relative '../../../_cucumber/lib/helpers/downloads_helper.rb'

class DownloadsPage < BasePage
  set_url '/downloads/'

  class << self
    include DownloadHelper
  end

  elements :fetching_download_spinner, '.fa-refresh'
  elements :download_latest_links, '.fa-download'
  elements :product_downloads, 'h5 > a'
  elements :other_resources, :xpath, '//*[@id="other-resources"]/ul/li'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Downloads | Red Hat Developers')
  end

  def available_downloads
    products = []
    product_downloads.map { |name|
      products << name.text }
    products
  end

  def other_resources_links
    other_resources.map { |link| link.text.capitalize }
  end

end
