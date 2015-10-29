require_relative 'base_page.rb'

class EventsPage < BasePage
  set_url '/events/'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Events featuring JBoss')
  end

end
