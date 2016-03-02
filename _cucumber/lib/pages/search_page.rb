# require_relative 'base_page.rb'

class SearchPage < BasePage
  set_url '/search/?q=boston'
  element :search_form, '#search_list_text'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Search Results')
  end

end
