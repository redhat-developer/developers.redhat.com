require_relative 'site_base'
require_relative '../../../_cucumber/lib/helpers/downloads_helper.rb'

class DownloadsPage < SiteBase
  page_url('/downloads/')
  page_title('Downloads | Red Hat Developers')

  class << self
    include DownloadHelper
  end

  element(:loaded?)                        { |el| el.wait_until_not_displayed(css: '#downloads .fa-refresh') }
  element(:most_popular_section)           { |el| el.find(css: '.most-popular-downloads') }
  elements(:download_buttons)              { |el| el.find_elements(css: '#downloads .fa-download') }
  elements(:most_popular_download_buttons) { |el| el.find_elements(css: '.most-popular-downloads .fa-download') }
  elements(:product_downloads)             { |el| el.find_elements(css: '#downloads h5') }
  elements(:other_resources)               { |el| el.find_elements(xpath: '//*[@id="other-resources"]/ul/li') }

  def available_downloads
    products = []
    product_downloads.each do |product|
      products << product.text
    end
    products
  end

  def other_resources_links
    other_resources.size
  end

  def most_popular_downloads
    wait_for { most_popular_section.displayed? }
    most_popular_section.text
  end

  def most_popular_downloads_btns
    most_popular_download_buttons.size
  end

  def download_btns
    download_buttons.size
  end

  def click_to_download(url)
    click_on(xpath: "//*[@id='downloads']//a[@href='#{url}']")
    wait_for_ajax
  end

end
