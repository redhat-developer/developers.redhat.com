require_relative 'base.rb'

class CommunityPage < Base
  set_url '/projects/'

  element :promoted_links, '.defaultprojectimage'
  element :community_links, '.upstream'
  elements :solution_links, '.solution-name-link'

  def initialize(driver)
    super
  end

  def open
    load
    loaded? 'Upstream Projects'
  end

  def clear_filters
    click_link 'Clear All Filters'
  end

end
