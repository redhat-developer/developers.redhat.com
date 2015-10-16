class DownloadsPage < Base

  DOWNLOADS_HEADER = '.hero-downloads'
  DOWNLOADS_INFO = '#downloads'
  DOWNLOAD_LATEST_LINK = '.fa-download'

  def initialize(driver)
    super
    loaded?('Downloads available from JBoss')
  end

  def downloads_title
    find(DOWNLOADS_HEADER).find(DOWNLOADS_INFO).find('h2').text eql? 'DOWNLOADS'
  end

  def download_links(downloads)
    page.has_selector?(DOWNLOAD_LATEST_LINK, visible: true, :count => downloads.to_i)
  end

end
