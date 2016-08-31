require_relative 'abstract/common_elements'

class ResourcesPage < CommonElements
  page_url('/resources/')
  #page_title('Discover the developer materials Red Hat has to offer')

  element(:blog_posts)             { |el| el.find(id: 'blogposts') }
  element(:books)                  { |el| el.find(id: 'book') }
  element(:code)                   { |el| el.find(id: 'code') }
  element(:get_started)            { |el| el.find(id: 'get-started') }
  element(:knowledgebase)          { |el| el.find(id: 'knowledge') }
  element(:video)                  { |el| el.find(id: 'video') }
  elements(:checkboxes)            { |el| el.find_elements(css: 'input[type="checkbox"]') }

  element(:keyword_field)          { |el| el.find(class: 'search_field') }
  element(:product_filter)         { |el| el.find(class: 'search-by-product') }
  element(:publish_date)           { |el| el.find(class: 'publish-date') }

  elements(:result_date)           { |el| el.find_elements(css: '.result-details .created-date') }
  elements(:result_tags)           { |el| el.find_elements(class: 'tag') }

  element(:start_date)             { |el| el.find(class: 'publish-date') }
  element(:end_date)               { |el| el.find(class: 'end-date') }
  element(:results_count)          { |el| el.find(class: 'results-count') }

  def any_checked?
    checkboxes_arr = []
    checkboxes.each { |el| checkboxes_arr << el.attribute('checked') }
    checkboxes_arr
  end

  def results_date
    results = []
    result_date.each do |result|
      results << result.text
    end
    results
  end

  def filter_by(type)
    case type.downcase
      when 'blog posts'
        click_on(xpath: "//label[@for='blogposts']")
      when 'book'
        click_on(xpath: "//label[@for='book']")
      when 'code artifact'
        click_on(xpath: "//label[@for='code']")
      when 'get started'
        click_on(xpath: "//label[@for='get-started']")
      when 'knowledgebase article / solution'
        click_on(xpath: "//label[@for='knowledge']")
      when 'video'
        click_on(xpath: "//label[@for='video']")
      else
        raise("#{type} not found")
    end
    wait_for_results
  end

  def keyword_search(search_string)
    type(keyword_field, search_string)
    wait_for_loading
    wait_until_loaded
  end

  def filter_by_product(product)
    select(product_filter, product)
    wait_for_loading
    wait_for_results
  end

  def filter_by_publish_date(date_type)
    select(publish_date, date_type)
    wait_for_loading
    wait_for_results
  end

  def results_contain_img_for(type)
    elements = find_elements(css: ".result-icon .icon-RHDev_-resources_icons_#{type.downcase}")
    elements.size == 10
  end

  def tags
    tag_arr = []
    result_tags.each { |tag| tag_arr << tag.text }
    tag_arr
  end

end
