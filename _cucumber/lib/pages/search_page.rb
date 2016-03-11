# require_relative 'base_page.rb'

class SearchPage < BasePage

  element :search_page, "[ng-app='search']"
  element :search_form, '#search_list_text'
  elements :search_results_container, '.search-results-loaded'
  elements :search_results, '.result'
  elements :search_button, '#search-button'
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

  element :current_link, '.current a'

  element :pagination_1, 'a[data-page="1"]'
  element :pagination_2, 'a[data-page="2"]'
  element :pagination_3, 'a[data-page="3"]'
  element :pagination_4, 'a[data-page="4"]'
  element :pagination_5, 'a[data-page="5"]'
  element :pagination_6, 'a[data-page="6"]'
  element :pagination_7, 'a[data-page="7"]'
  element :pagination_8, 'a[data-page="8"]'
  element :pagination_9, 'a[data-page="9"]'
  element :pagination_10, 'a[data-page="10"]'
  element :pagination_11, 'a[data-page="11"]'
  element :pagination_12, 'a[data-page="12"]'
  element :pagination_13, 'a[data-page="13"]'


  def initialize(driver)
    super
    wait_for_ajax
  end

  def goToSearchPage(q)
    visit "/search/?q=#{q}"
  end

  def open
    loaded?('Search Results')
  end

end
