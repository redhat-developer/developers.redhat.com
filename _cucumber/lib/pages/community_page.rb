class CommunityPage < Base

  COMMUNITY_HEADER      = '.hero-projects'
  COMMUNITY_INFO        = '#upstream-projects'
  DEFAULT_PROJECT_IMAGE = '.defaultprojectimage'
  COMMUNITY_LINKS       = '.upstream'
  SOLUTION_NAME_LINKS   = '.solution-name-link'

  def initialize(driver)
    super
    loaded? 'Upstream Projects'
  end

  def community_title
    find(COMMUNITY_HEADER).find('h2').text eql? 'COMMUNITY'
  end

  def promoted_image_links(promoted_links)
    page.has_selector?(DEFAULT_PROJECT_IMAGE, visible: true, :minimum => promoted_links)
  end

  def community_links(community_links)
    page.has_selector?(COMMUNITY_LINKS, visible: true, :minimum => community_links)
  end

  def solution_name_links
    solutions = []
    page.all(SOLUTION_NAME_LINKS).each do |a|
      solutions << a.text
    end
    solutions
  end

  def clear_filters
    click_link 'Clear All Filters'
  end

end
