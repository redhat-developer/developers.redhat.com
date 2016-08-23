require_relative 'abstract/standardised_search'
require_relative '../../../_cucumber/lib/helpers/driver_helper'

class SearchPage < StandardisedSearch
  include DriverHelper

  element(:search_box) { |el| el.text_field(id: 'search_list_text') }

  def enter_search_term(search_string)
    type(search_box, search_string)
  end

  def search_results
    results = []
    wait_until_results_loaded
    result_row.each do |result|
      results << result.text
    end
    results
  end

  def tags
    results = []
    search_tag.each do |tag|
      results << tag.text
    end
    results
  end

end