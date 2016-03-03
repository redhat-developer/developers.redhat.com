# require_relative 'base_page.rb'

class SearchPage < BasePage

  element :search_page, "[ng-app='search']"
  element :search_form, '#search_list_text'
  elements :search_results, '.result > p'

  def initialize(driver)
    super
    wait_for_ajax
  end

  def open
    loaded?('Search Results')
  end

end
