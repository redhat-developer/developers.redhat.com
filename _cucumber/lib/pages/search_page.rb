require_relative 'base_page'

class SearchPage < BasePage

  element :search_page, "[ng-app='search']"
  element :search_form, '#search_list_text'
  element :results_title, '.results-title'
  element :results_sub_title, '.results-sub-title'
  element :pagination, '#paginator'
  elements :search_results_container, '.search-results-loaded'
  elements :search_results, '.result'
  elements :search_button, '#search-button'
  elements :timestamps, '[data-updated]'
  elements :tags, '.tags-list'
  elements :pagination_numbers, '[data-page]'

  pagination_links = %w[next last previous first prev]
  pagination_links.each do |link|
    element :"#{link}_link_enabled", "#pagination-#{link}.available"
    element :"#{link}_link_disabled", "#pagination-#{link}.unavailable"
    element :"#{link}_link", "#pagination-#{link}"
  end

  element :current_link, '.current a'

  def initialize(driver)
    super
    wait_for_ajax
  end

  def goToSearchPage(q)
   visit "/search/?q=#{q}"
   loaded?('Search Results')
  end

  def click_pagination(page_number)
    find('a', "#{page_number}").click
  end

end
