require_relative 'base_page.rb'

class DownloadsPage < BasePage
  set_url '/downloads/'

  element :downloads, '#downloads'
  element :download_latest_link, '.fa-download'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Downloads available from JBoss')
  end

end
