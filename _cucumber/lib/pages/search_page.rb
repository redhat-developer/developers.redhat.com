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

  element :next_link_enabled, '#pagination-next.available'
  element :next_link_disabled, '#pagination-next.unavailable'

  element :last_link_enabled, '#pagination-last.available'
  element :last_link_disabled, '#pagination-last.unavailable'

  element :previous_link_enabled, '#pagination-prev.available'
  element :previous_link_disabled, '#pagination-prev.unavailable'

  element :first_link_enabled, '#pagination-first.available'
  element :first_link_disabled, '#pagination-first.unavailable'

  element :pagination_5, '[data-page="5"]'

  def initialize(driver)
    super
    wait_for_ajax
  end

  def open
    loaded?('Search Results')
  end

end
