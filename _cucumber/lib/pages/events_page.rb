require_relative 'base.rb'

class EventsPage < Base
  set_url '/events/'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Events featuring JBoss')
  end

end
