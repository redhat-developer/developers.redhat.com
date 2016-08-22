require_relative 'abstract/common_elements'

class SearchPage < CommonElements

  element(:search_box) { |el| el.find(id: 'search_list_text') }

  def enter_search_term(search_string)
    search_box.send_keys(search_string)
  end

  def search_results
    results = []
    wait_for(30) { results_loaded? }
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