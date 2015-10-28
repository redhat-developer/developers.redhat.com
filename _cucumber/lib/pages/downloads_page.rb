require_relative 'base.rb'

class DownloadsPage < Base
  set_url '/downloads/'

  element :downloads_header, '.hero-downloads'
  element :downloads_header, '#downloads'
  element :download_latest_link, '.fa-download'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Downloads available from JBoss')
  end

end
