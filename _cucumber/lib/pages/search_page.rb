require_relative 'base'

class SearchPage < Base

  SEARCH_PAGE              = { css: '.search ' }
  SEARCH_FORM              = { id: 'search_list_text' }
  SEARCH_RESULTS_CONTAINER = { css: '.search-results-loaded' }
  SEARCH_RESULTS           = { css: '.result' }
  SEARCH_BUTTON            = { id:  '#search-button' }
  TIMESTAMPS               = { css: '[data-updated]' }
  PAGINATION_NUMBERS       = { css: '[data-page]' }
  TAGS                     = { css: '.tags-list' }
  CLEAR_SEARCH             = { css: 'TODO' }

  def initialize(driver)
    super
    wait_for { displayed?(SEARCH_PAGE) }
    verify_page('Search Results')
  end

  def enter_search_term(search_string)
    wait_for { displayed?(SEARCH_FORM) }
    type(SEARCH_FORM, search_string)
  end

  def click_clear_search
    click_on(CLEAR_SEARCH)
  end

  def search_box_value
    wait_for { displayed?(SEARCH_FORM) }
    attribute(SEARCH_FORM, 'value')
  end

  def search_results
    search_results = []
    wait_for(30) { displayed?(SEARCH_RESULTS_CONTAINER) }
    results = find_elements(SEARCH_RESULTS)
    results.each do |result|
      search_results << result.text
    end
    search_results
  end

  def tags
    results = []
    tags = find_elements(TAGS)
    tags.each do |tag|
      results << tag.text
    end
    results
  end

  def results_container_visible?
    displayed?(SEARCH_RESULTS_CONTAINER)
  end

end