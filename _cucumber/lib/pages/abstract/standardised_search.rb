require_relative 'site_base'

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
  element(:pagination)                 { |b| b.nav(id: 'paginator') }
  element(:current_link)               { |b| b.li(class: 'current') }
  element(:pagination_first_link)      { |b| b.li(id: 'pagination-first') }
  element(:pagination_next_link)       { |b| b.li(id: 'pagination-next') }
  element(:pagination_last_link)       { |b| b.li(id: 'pagination-last') }
  element(:pagination_previous_link)   { |b| b.li(id: 'pagination-prev') }

  value(:wait_until_loaded)            { |p| p.loading_spinner.wait_while_present }
  value(:wait_for_loading)             { |p| p.loading_spinner.wait_until_present }
  value(:wait_until_results_loaded)    { |p| p.results_loaded.wait_until_present }
  value(:results_title_text)           { |p| p.results_title.when_present.text }
  value(:results_sub_title_text)       { |p| p.results_sub_title.when_present.text }
  value(:results_text)                 { |p| p.no_of_results_text.when_present.text }
  value(:has_pagination?)              { |p| p.pagination.present? }
  value(:has_ellipsis?)                { |p| p.li(css: "#pagination-#{5}").when_present.text.include?('⋯') }
  value(:current_link_text)            { |p| p.current_link.when_present.text}
  value(:results_loaded?)              { |p| p.results_loaded.present? }

  def wait_for_results
    wait_until_loaded
    wait_until_results_loaded
  end

  def results_per_page
    default_item = default_dropdown_item(results_per_page_filter)
    available_options = dropdown_items(results_per_page_filter)
    return default_item, available_options
  end

  def results_sort
    default_item = default_dropdown_item(results_sort_filter)
    available_options = dropdown_items(results_sort_filter)
    return default_item, available_options
  end

  def select_results_per_page(option)
    results_per_page_filter.when_present.select(option)
    wait_for_results
  end

  def select_filter_by(option)
    select(results_sort_filter, option)
    wait_for_results
  end

  def results
    results = []
    result_row.each do |result|
      results << result.when_present.text
    end
    results
  end

  def has_pagination_with(i)
    wait_for_results
    @browser.li(css: "#pagination-#{i}").present?
  end

  def pagination_links(link, link_state)
    @browser.li(css: "#pagination-#{link}.#{link_state}").present?
  end

  def click_pagination(link)
    elem = send("pagination_#{link}_link")
    elem_pos = elem.wd.location["y"]
    @browser.execute_script("window.scroll(0, #{elem_pos})")
    elem.when_present.click
    wait_for_results
  end

  def go_to_pagination_no(i)
    elem = @browser.li(css: "#pagination-#{i.to_i-1}")
    elem_pos = elem.wd.location["y"]
    @browser.execute_script("window.scroll(0, #{elem_pos})")
    elem.when_present.click
    wait_for_results
  end

end
