require_relative 'base'

class ResourcesPage < Base

  RESOURCES_PAGE   =  { css: '.resources' }
  RESULT_ROW       =  { css: '.result' }
  RESULT_DATE      =  { css: '.result-details .created-date' }
  BLOG_POSTS       =  { id: 'blogposts' }
  BOOKS            =  { id: 'book' }
  CODE_ARTIFACTS   =  { id: 'code' }
  GET_STARTED      =  { id: 'get-started' }
  KNOWLEDGEBASE    =  { id: 'knowledge' }
  VIDEO            =  { id: 'video' }
  VIDEO_IMG        =  { css: '.icon-RHDev_-resources_icons_blogpost' }

  def initialize(driver)
    super
    wait_for { displayed?(RESOURCES_PAGE) }
    verify_page('Discover the developer materials Red Hat has to offer')
    wait_for(20) {
      questions = find_elements(RESULT_ROW)
      questions.size == 10
    }
  end

  def any_checked?
    checkboxes = []
    elements = find_elements(css: 'input[type="checkbox"]')
    elements.each { |el| checkboxes << el.attribute('checked') }
    checkboxes
  end

  def filter_by(type)
    case type.downcase
      when 'blog posts'
        click_on(xpath: "//label[@for='blogposts']")
        wait_for { find(BLOG_POSTS).attribute('checked') == 'true' }
      when 'book'
        click_on(xpath: "//label[@for='book']")
        wait_for { find(BOOKS).attribute('checked') == 'true' }
      when 'code artifact'
        click_on(xpath: "//label[@for='code']")
        wait_for { find(CODE_ARTIFACTS).attribute('checked') == 'true' }
      when 'get started'
        click_on(xpath: "//label[@for='get-started']")
        wait_for { find(GET_STARTED).attribute('checked') == 'true' }
      when 'knowledgebase article / solution'
        click_on(xpath: "//label[@for='knowledge']")
        wait_for { find(KNOWLEDGEBASE).attribute('checked') == 'true' }
      when 'video'
        click_on(xpath: "//label[@for='video']")
        wait_for { find(VIDEO).attribute('checked') == 'true' }
      else
        raise("#{type} not found")
    end
    wait_for_ajax
  end

  def results
    results = []
    res = find_elements(RESULT_ROW)
    res.each do |result|
      results << result.text
    end
    wait_for { results.size == 10 }
    results
  end

  def results_date
    results = []
    res = find_elements(RESULT_DATE)
    res.each do |result|
      results << result.text
    end
    results
  end

end
