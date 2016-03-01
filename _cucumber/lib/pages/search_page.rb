# require_relative 'base_page.rb'

class SearchPage < BasePage
  set_url '/search/?q=boston'
  element :search_form, '#search_list_text'
  element :search_field, '[ng-model="params.query"]'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('The title of the page goes here')
  end

end
