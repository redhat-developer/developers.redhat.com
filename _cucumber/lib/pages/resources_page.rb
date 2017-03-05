require_relative 'abstract/standardised_search'

# this is the page class that contains all elements and common methods related to the Resources page
class ResourcesPage < StandardisedSearch

  element(:blog_posts)             { |b| b.element(xpath: "//*[@id='blogposts']") }
  element(:book)                   { |b| b.element(xpath: "//*[@id='book']") }
  element(:code)                   { |b| b.element(xpath: "//*[@id='code']") }
  element(:get_started)            { |b| b.element(xpath: "//*[@id='get-started']") }
  element(:knowledgebase)          { |b| b.element(xpath: "//*[@id='knowledge']") }
  element(:video)                  { |b| b.element(xpath: "//*[@id='video']") }
  elements(:checkbox_filters)      { |b| b.checkboxes(css: 'input[type="checkbox"]') }
  element(:keyword_field)          { |b| b.text_field(class: 'search_field') }
  element(:product_filter)         { |b| b.select_list(class: 'search-by-product') }
  element(:publish_date)           { |b| b.select_list(class: 'publish-date') }
  elements(:result_date)           { |b| b.spans(css: '.result-details .created-date') }
  elements(:result_tags)           { |b| b.spans(class: 'tag') }

  def go_to_resources
    open('/')
    toggle_menu

    if ENV['DEVICE'].nil?
      @browser.a(text: /HELP/).wait_until(timeout: 60, &:present?).hover
    else
      @browser.a(text: /HELP/).wait_until(timeout: 60, &:present?).click
    end
    @browser.a(text: /Resources/).click
    wait_for_results
  end

  def filter_by(type)
    element = send("#{type.downcase.tr(' ', '_')}")
    element.fire_event('click')
  end

  def any_checked?
    checkboxes_arr = []
    checkbox_filters.each { |el| checkboxes_arr << el.attribute_value('checked') }
    checkboxes_arr
  end

  def checkbox_checked(type)
    element = send("#{type.downcase.tr(' ', '_')}")
    element.attribute_value('checked')
  end

  def results_date
    results = []
    result_date.each do |result|
      results << result.text
    end
    results
  end

  def keyword_search(search_string)
    type(keyword_field, search_string)
    press_return
    sleep 1.5 # wait for new search to be triggered
    wait_until_loaded
  end

  def filter_by_product(product)
    product_filter.wait_until(&:present?).select(product)
    sleep 1.5 # wait for new search to be triggered
    wait_until_loaded
  end

  def filter_by_publish_date(date_type)
    publish_date.select(date_type)
    sleep 1.5 # wait for new search to be triggered
    wait_until_loaded
  end

  def results_contain_img_for(type)
    wait_until_loaded
    @browser.images(css: ".result-icon .icon-RHDev_-resources_icons_#{type.downcase}")
  end

  def tags
    tag_arr = []
    result_tags.each { |tag| tag_arr << tag.text }
    tag_arr
  end

end
