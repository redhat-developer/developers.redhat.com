require_relative 'base'

class ResourcesPage < Base

  LOADING            =  { class: 'loader'}
  RESOURCES_PAGE     =  { css: '.resources' }
  KEYWORD_FIELD      =  { css: '.search_field' }
  RESULT_ROW         =  { css: '.result' }
  RESULT_DATE        =  { css: '.result-details .created-date' }
  BLOG_POSTS         =  { id: 'blogposts' }
  BOOKS              =  { id: 'book' }
  CODE_ARTIFACTS     =  { id: 'code' }
  GET_STARTED        =  { id: 'get-started' }
  KNOWLEDGEBASE      =  { id: 'knowledge' }
  VIDEO              =  { id: 'video' }
  TAGS_LIST          =  { class: 'tags-list'}
  TAGS               =  { class: 'tag'}
  FILTER_BY_PRODUCT  =  { class: 'search-by-product' }
  FILTER_BY_DATE     =  { class: 'publish-date' }
  START_DATE         =  { class: 'start-date' }
  END_DATE           =  { class: 'end-date' }
  RESULTS_COUNT      =  { class: 'results-count' }


  def initialize(driver)
    super
    wait_for { displayed?(RESOURCES_PAGE) }
    verify_page('Discover the developer materials Red Hat has to offer')
    wait_for(20) {
      questions = find_elements(RESULT_ROW)
      displayed?(LOADING) == false && questions.size == 10
    }
  end

  def loaded?
    wait_for(20) {
      questions = find_elements(RESULT_ROW)
      displayed?(LOADING) == false && questions.size == 10
    }
  end

  def any_checked?
    checkboxes = []
    elements = find_elements(css: 'input[type="checkbox"]')
    elements.each { |el| checkboxes << el.attribute('checked') }
    checkboxes
  end

  def results_count(count)
    select(RESULTS_COUNT, count)
    sleep(1.5) # slight delay to wait for search to kick-off
    wait_for { displayed?(LOADING) == false }
  end

  def filter_by(type)
    case type.downcase
      when 'blog posts'
        click_on(xpath: "//label[@for='blogposts']")
      when 'book'
        click_on(xpath: "//label[@for='book']")
      when 'code artifact'
        click_on(xpath: "//label[@for='code']")
      when 'get started'
        click_on(xpath: "//label[@for='get-started']")
      when 'knowledgebase article / solution'
        click_on(xpath: "//label[@for='knowledge']")
      when 'video'
        click_on(xpath: "//label[@for='video']")
      else
        raise("#{type} not found")
    end
    wait_for_ajax
    wait_for(30) { displayed?(LOADING) == false }
  end

  def filter_by_product(product)
    select(FILTER_BY_PRODUCT, product)
    sleep(1.5) # slight delay to wait for search to kick-off
    wait_for(30) { displayed?(LOADING) == false }
  end

  def filter_by_date(date_type)
    select(FILTER_BY_DATE, date_type)
    sleep(1.5) # slight delay to wait for search to kick-off
    wait_for(30) { displayed?(LOADING) == false }
  end

  def results
    results = []
    res = find_elements(RESULT_ROW)
    res.each do |result|
      results << result.text
    end
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

  def results_contain_img_for(type)
    elements = find_elements(css: ".result-icon .icon-RHDev_-resources_icons_#{type.downcase}")
    elements.size == 10
  end

  def keyword_field
    find(KEYWORD_FIELD)
  end

  def keyword_search(term)
    wait_for { displayed?(KEYWORD_FIELD) }
    type(KEYWORD_FIELD, term)
    sleep(1.5) # slight delay to wait for search to kick-off
    wait_for(30) { displayed?(LOADING) == false }
  end

  def tags
    tags = []
    row = find_elements(TAGS)
    row.each { |tag| tags << tag.text }
    tags
  end

end
