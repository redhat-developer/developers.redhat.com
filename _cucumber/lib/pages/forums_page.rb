require_relative 'abstract/site_base'
require_relative '../../../_cucumber/lib/helpers/products_helper'

class ForumsPage < SiteBase
  page_url('/forums/')
  expected_element(:h2, text: 'Forums')
  #page_title('Forums | Red Hat Developers')

  class << self
    include ProductsHelper
  end

  elements(:product_types)                           { |b| b.divs(class: 'development-tool') }
  elements(:forum_links)                             { |b| b.links(css: '.forums-product-categories h4 > a') }

  element(:accelerated_development_and_management)   { |b| b.h4(id: 'accelerated_development_and_management') }
  element(:developer_tools)                          { |b| b.h4(id: 'developer_tools') }
  element(:infrastructure)                           { |b| b.h4(id: 'infrastructure') }
  element(:integration_and_automation)               { |b| b.h4(id: 'integration_and_automation') }
  element(:runtimes)                                 { |b| b.h4(id: 'runtimes') }

  def forums_product_sections
    titles = []
    elements = [accelerated_development_and_management, developer_tools, infrastructure, integration_and_automation, runtimes]
    elements.each { |el|
      titles << el.text
    }
    titles
  end

  def forums_available_products
    products = []
    ids      = []

    #return available product id's
    forum_links.each { |id| ids << id.attribute_value('id') }
    #return available product links
    forum_links.each { |el| products << el.text }

    return products, ids
  end

  def forums_product_section_for(product)
    desc = @browser.div(id: "development-tool-#{product}").text
    desc.gsub("’", "'")
  end

  def forums_product_link_for(product)
    href = @browser.link(id: product)
    href.attribute_value('href')
  end

end
