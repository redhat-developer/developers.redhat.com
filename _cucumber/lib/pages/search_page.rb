# require_relative 'base_page.rb'

class SearchPage < BasePage

  element :search_form, '#search_list_text'

  def initialize(driver)
    super
  end

  def open
    loaded?('Search Results')
  end

end
