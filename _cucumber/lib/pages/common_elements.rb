require_relative 'site_base'

class CommonElements < SiteBase

  value(:wait_until_loaded)           { |el| el.wait_until_not_displayed(class: 'loader') }
  value(:results_loaded?)             { |el| el.displayed?(class: 'search-results-loaded') }
  value(:results_title)               { |el| el.text_of(class: 'results-title') }
  value(:results_sub_title)           { |el| el.text_of(class: 'results-sub-title') }
  value(:results_text)                { |el| el.text_of(css: '#paginator > span') }

  element(:results_per_page_filter)   { |el| el.find(xpath: '//p/select[2]') }
  element(:results_sort_filter)       { |el| el.find(xpath: '//p/select[1]') }

  elements(:result_row)               { |el| el.find_elements(class: 'result') }
  elements(:result_tag)               { |el| el.find_elements(class: 'tags-list') }

  element(:pagination)                { |el| el.find(id: 'paginator') }

  value(:has_pagination?)             { |el| el.displayed?(id: 'paginator') }
  value(:has_ellipsis?)               { |el| el.text_of(css: "#pagination-#{5}").include?('⋯') }
  value(:current_link_text)           { |el| el.text_of(class: 'current') }

  action(:click_search_button)        { |el| el.click_on(id: 'search-button') }

  def wait_for_results
    wait_until_loaded
    wait_for(20) { results_loaded? }
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
    select(results_per_page_filter, option)
    wait_for_results
  end

  def select_filter_by(option)
    select(results_sort_filter, option)
    wait_for_results
  end

  def results
    results = []
    result_row.each do |result|
      results << result.text
    end
    results
  end

  def has_pagination_with(i)
    wait_for_results
    displayed?(css: "#pagination-#{i}")
  end

  def pagination_links(link, link_state)
    if link_state == 'enabled'
      case link
        when 'previous'
          displayed?(css: "#pagination-prev.available")
        else
          displayed?(css: "#pagination-#{link}.available")
      end
    else
      case link
        when 'previous'
          displayed?(css: "#pagination-prev.unavailable")
        else
          displayed?(css: "#pagination-#{link}.unavailable")
      end
    end
  end

  def click_pagination(link)
    footer = find(css: ".bottom")
    footer.location_once_scrolled_into_view
    case link
      when 'first', 'next', 'last'
        wait_until_displayed(css: "#pagination-#{link}")
        click_on(css: "#pagination-#{link}")
      when 'previous'
        wait_until_displayed(css: "#pagination-prev")
        hover_on(css: "#pagination-prev")
        click_on(css: "#pagination-prev")
      else
        wait_until_displayed(css: "#pagination-#{link.to_i-1}")
        hover_on(css: "#pagination-#{link.to_i-1}")
        click_on(css: "#pagination-#{link.to_i-1}")
    end
    wait_for_ajax
  end

  def current_link
    wait_for(12) { has_pagination? }
    current_link_text
  end

end
