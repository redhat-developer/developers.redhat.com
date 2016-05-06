require_relative 'base'
require_relative '../../../_cucumber/lib/helpers/downloads_helper.rb'

class DownloadsPage < Base

  class << self
    include DownloadHelper
  end

  MOST_POPULAR_SECTION      = { css: '.most-popular-downloads' }
  FETCHING_SPINNER          = { css: '#downloads .fa-refresh'  }
  DOWNLOAD_BTN              = { css: '#downloads .fa-download' }
  MOST_POPULAR_DOWNLOAD_BTN = { css: '.most-popular-downloads .fa-download' }
  PRODUCT_DOWNLOADS         = { css: '#downloads h5' }
  OTHER_RESOURCES           = { xpath: '//*[@id="other-resources"]/ul/li' }

  def initialize(driver)
    super
    verify_page('Downloads | Red Hat Developers')
    wait_for { !displayed?(FETCHING_SPINNER) }
  end

  def available_downloads
    products = []
    product_downloads = find_elements(PRODUCT_DOWNLOADS)
    product_downloads.each do |product|
      products << product.text
    end
    products
  end

  def other_resources_links
    other_resources = find_elements(OTHER_RESOURCES)
    other_resources.size
  end

  def most_popular_downloads
    wait_for { displayed?(MOST_POPULAR_SECTION) }
    text_of(MOST_POPULAR_SECTION)
  end

  def most_popular_downloads_btns
    mp_downloads_buttons = find_elements(MOST_POPULAR_DOWNLOAD_BTN)
    mp_downloads_buttons.size
  end

  def download_btns
    download_buttons = find_elements(DOWNLOAD_BTN)
    download_buttons.size
  end

  def click_to_download(url)
    click_on(xpath: "//*[@id='downloads']//a[@href='#{url}']")
    wait_for_ajax
  end

end
