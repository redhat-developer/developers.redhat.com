require_relative 'abstract/standardised_search'
require_relative '../../../_cucumber/lib/helpers/driver_helper'

# this is the page class that contains all elements and common methods related to the Search page.
class SearchPage < StandardisedSearch

  element(:search_box)           { |b| b.text_field(id: 'search_list_text') }
  elements(:first_result)        { |b| b.link(css: 'h4 > a', index: 0) }

  value(:first_result_attribute) { |p| p.first_result.href }

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
