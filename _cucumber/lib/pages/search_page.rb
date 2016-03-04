# require_relative 'base_page.rb'

class SearchPage < BasePage

  element :search_page, "[ng-app='search']"
  element :search_form, '#search_list_text'
  elements :search_results_container, '.search-results-loaded'
  elements :search_results, '.result'
  elements :timestamps, '[data-updated]'
  elements :tags, '.tags-list'
  element :results_title, '.results-title'
  element :results_sub_title, '.results-sub-title'
  element :pagination, '#paginator'
  elements :pagination_numbers, '[data-page]'
  element :Next, '#pagination-next'
  element :Previous, '#pagination-prev'
  element :First, '#pagination-first'
  element :Last, '#pagination-last'

  def initialize(driver)
    super
    wait_for_ajax
  end

  def open
    loaded?('Search Results')
  end

end
