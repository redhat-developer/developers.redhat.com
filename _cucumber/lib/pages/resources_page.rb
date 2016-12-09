require_relative 'abstract/standardised_search'

# this is the page class that contains all elements and common methods related to the Resources page
class ResourcesPage < StandardisedSearch
  page_url('/resources/')
  expected_element(:h2, text: 'Resources')
  # page_title('Discover the developer materials Red Hat has to offer')

  element(:blog_posts)             { |b| b.element(xpath: "//label[@for='blogposts']") }
  element(:book)                   { |b| b.element(xpath: "//label[@for='book']") }
  element(:code)                   { |b| b.element(xpath: "//label[@for='code']") }
  element(:get_started)            { |b| b.element(xpath: "//label[@for='get-started']") }
  element(:code_artifact)          { |b| b.element(xpath: "//label[@for='code']") }
  element(:knowledgebase)          { |b| b.element(xpath: "//label[@for='knowledge']") }
  element(:video)                  { |b| b.element(xpath: "//label[@for='video']") }
  elements(:checkbox_filters)      { |b| b.checkboxes(css: 'input[type="checkbox"]') }
  element(:keyword_field)          { |b| b.text_field(class: 'search_field') }
  element(:product_filter)         { |b| b.select_list(class: 'search-by-product') }
  element(:publish_date)           { |b| b.select_list(class: 'publish-date') }
  elements(:result_date)           { |b| b.spans(css: '.result-details .created-date') }
  elements(:result_tags)           { |b| b.spans(class: 'tag') }

  def filter_by(type)
    element = send("#{type.downcase.tr(' ', '_')}")
    element.fire_event('click')
  end

  def any_checked?
    checkboxes_arr = []
    checkbox_filters.each { |el| checkboxes_arr << el.attribute_value('checked') }
    checkboxes_arr
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
    wait_until_loaded
  end

  def filter_by_product(product)
    product_filter.select(product)
    wait_for_results
  end

  def filter_by_publish_date(date_type)
    publish_date.select(date_type)
    wait_for_results
  end

  def results_contain_img_for(type)
    wait_for_results
    @browser.images(css: ".result-icon .icon-RHDev_-resources_icons_#{type.downcase}")
  end

  def tags
    tag_arr = []
    result_tags.each { |tag| tag_arr << tag.text }
    tag_arr
  end

end
