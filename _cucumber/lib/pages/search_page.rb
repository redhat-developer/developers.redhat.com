require_relative 'base'

class SearchPage < Base

  SEARCH_PAGE              = { css: '.search ' }
  SEARCH_FORM              = { id: 'search_list_text' }
  RESULTS_TITLE            = { css: '.results-title'}
  RESULTS_SUB_TITLE        = { css: '.results-sub-title' }
  PAGINATION               = { css: '.pagination' }
  SEARCH_RESULTS_CONTAINER = { css: '.search-results-loaded' }
  SEARCH_RESULTS           = { css: '.result' }
  SEARCH_BUTTON            = { id:  '#search-button' }
  TIMESTAMPS               = { css: '[data-updated]' }
  PAGINATION_NUMBERS       = { css: '[data-page]' }
  CURRENT_LINK             = { css: '.current' }
  RESULTS_SORT_BY          = { xpath: '//p/select[1]' }
  RESULTS_NUMBER           = { xpath: '//p/select[2]' }
  TAGS                     = { css: '.tags-list' }
  CLEAR_SEARCH             = { css: 'TODO' }
  RESULTS_TEXT             = { css: '#paginator > span' }

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

  def results_sort
    default_item = default_dropdown_item(RESULTS_SORT_BY)
    available_options = dropdown_items(RESULTS_SORT_BY)
    return default_item, available_options
  end

  def results_per_page
    default_item = default_dropdown_item(RESULTS_NUMBER)
    available_options = dropdown_items(RESULTS_NUMBER)
    return default_item, available_options
  end

  def results_title
    wait_for { displayed?(RESULTS_TITLE) }
    text_of(RESULTS_TITLE)
  end

  def results_sub_title
    wait_for { displayed?(RESULTS_SUB_TITLE) }
    text_of(RESULTS_SUB_TITLE)
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

  def results_text
    wait_for { displayed?(RESULTS_TEXT) }
    text_of(RESULTS_TEXT)
  end

  def has_pagination?
    displayed?(PAGINATION)
  end

  def has_ellipsis?
    text_of(css: "#pagination-#{5}").include?('⋯')
  end

  def has_pagination_with(i)
    wait_for(12) { displayed?(SEARCH_RESULTS_CONTAINER) && displayed?(PAGINATION) }
    displayed?(css: "#pagination-#{i}")
  end

  def pagination_links(link, link_state)
    wait_for(30) { displayed?(SEARCH_RESULTS_CONTAINER) }

    if link_state == 'enabled'
      case link
        when 'previous'
          displayed?(css: "#pagination-prev.available")
        else
          displayed?(css: "#pagination-#{link}.available")
      end
    else
      case link
        when 'previous'
          displayed?(css: "#pagination-prev.unavailable")
        else
          displayed?(css: "#pagination-#{link}.unavailable")
      end
    end
  end

  def click_pagination(link)
    case link
      when 'first', 'next', 'last'
        wait_for { displayed?(css: "#pagination-#{link}") }
        click_on(css: "#pagination-#{link}")
      when 'previous'
        wait_for { displayed?(css: "#pagination-prev") }
        click_on(css: "#pagination-prev")
      else
        wait_for { displayed?(css: "#pagination-#{link.to_i-1}") }
        click_on(css: "#pagination-#{link.to_i-1}")
    end
    wait_for_ajax
  end

  def current_link
    wait_for(12) { displayed?(SEARCH_RESULTS_CONTAINER) && displayed?(PAGINATION) }
    text_of(CURRENT_LINK)
  end

end
