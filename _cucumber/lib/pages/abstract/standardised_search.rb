require_relative 'site_base'

# this class contains common elements that are located on pages that use standardised search code. Currently at the time of writing these are Search,
# Stack Overflow, and Resources pages, therefore the pages will inherit this class.
class StandardisedSearch < SiteBase

  element(:results_per_page_filter)    { |b| b.select_list(xpath: '//p/select[2]') }
  element(:results_sort_filter)        { |b| b.select_list(xpath: '//p/select[1]') }
  element(:loading_spinner)            { |b| b.span(class: 'loader') }
  element(:results_loaded)             { |b| b.div(class: 'search-results-loaded') }
  element(:results_title)              { |b| b.h3(class: 'results-title') }
  element(:results_sub_title)          { |b| b.h4(class: 'results-sub-title') }
  element(:no_of_results_text)         { |b| b.span(css: '#paginator > span') }
  element(:result_row)                 { |b| b.divs(class: 'result') }
  element(:result_tag)                 { |b| b.divs(class: 'tags-list') }
  element(:pagination)                 { |b| b.ul(class: 'pagination') }
  element(:current_link)               { |b| b.li(class: 'current') }
  element(:pagination_first_link)      { |b| b.li(id: 'pagination-first') }
  element(:pagination_next_link)       { |b| b.li(id: 'pagination-next') }
  element(:pagination_last_link)       { |b| b.li(id: 'pagination-last') }
  element(:pagination_previous_link)   { |b| b.li(id: 'pagination-prev') }

  value(:wait_until_loaded)            { |p| p.loading_spinner.wait_while(&:present?) }
  value(:wait_for_loading)             { |p| p.loading_spinner.wait_until(&:present?) }
  value(:wait_until_results_loaded)    { |p| p.results_loaded.wait_until(&:present?) }
  value(:results_title_text)           { |p| p.results_title.text }
  value(:results_sub_title_text)       { |p| p.results_sub_title.text }
  value(:results_text)                 { |p| p.no_of_results_text.text }
  value(:current_link_text)            { |p| p.current_link.text }
  value(:results_loaded?)              { |p| p.results_loaded.present? }

  def wait_for_results
    wait_until_loaded && wait_until_results_loaded
  end

  def ellipsis?
    if $browser.li(css: "#pagination-#{5}").present?
      pagination_text = $browser.li(css: "#pagination-#{5}").text.include?('⋯')
    else
      pagination_text = $browser.li(css: "#pagination-#{5}").present?
    end
    pagination_text
  end

  def results_per_page
    default_item = default_dropdown_item(results_per_page_filter)
    available_options = dropdown_items(results_per_page_filter)
    [default_item, available_options]
  end

  def results_sort
    default_item = default_dropdown_item(results_sort_filter)
    available_options = dropdown_items(results_sort_filter)
    [default_item, available_options]
  end

  def select_results_per_page(option)
    results_per_page_filter.select(option)
    wait_for_results
  end

  def results
    results = []
    result_row.each do |result|
      results << result.text
    end
    results
  end

  def pagination_with?(i)
    wait_for_results
    $browser.li(css: "#pagination-#{i}").present?
  end

  def pagination_links(link, link_state)
    $browser.li(css: "#pagination-#{link}.#{link_state}").present?
  end

  def click_pagination(link)
    elem = send("pagination_#{link}_link")
    $browser.execute_script('arguments[0].scrollIntoView();', elem)
    elem.click
    wait_for_results
  end

  def go_to_pagination_no(i)
    elem = $browser.li(css: "#pagination-#{i.to_i - 1}")
    $browser.execute_script('arguments[0].scrollIntoView();', elem)
    elem.click
    wait_for_results
  end

end
