require_relative 'abstract/site_base'
require_relative '../../../_cucumber/lib/helpers/products_helper'

class ForumsPage < SiteBase
  page_url('/forums/')
  #page_title('Forums | Red Hat Developers')
  
  class << self
    include ProductsHelper
  end
  
  elements(:product_types)                           { |el| el.find_elements(xpath: "//*[@class='development-tool']//*") }
  elements(:forum_links)                             { |el| el.find_elements(css: '.forums-product-categories h4 > a') }

  element(:accelerated_development_and_management)   { |el| el.text_of(id: 'accelerated_development_and_management') }
  element(:developer_tools)                          { |el| el.text_of(id: 'developer_tools') }
  element(:infrastructure)                           { |el| el.text_of(id: 'infrastructure') }
  element(:integration_and_automation)               { |el| el.text_of(id: 'integration_and_automation') }
  element(:runtimes)                                 { |el| el.text_of(id: 'runtimes') }

  def forums_product_sections
    titles = []
    elements = [accelerated_development_and_management, developer_tools, infrastructure, integration_and_automation, runtimes]
    elements.each { |el|
      titles << el
    }
    titles
  end

  def forums_available_products
    products = []
    ids      = []

    available_links = forum_links
    available_ids   = product_types

    #return available product id's
    available_ids.each { |id| ids << id.attribute('id') }
    #return available product links
    available_links.each { |el| products << el.text }

    ids.uniq!
    return products, ids.reject!(&:empty?)
  end

  def forums_product_section_for(product)
    desc = text_of(id: "development-tool-#{product}")
    desc.gsub("’", "'")
  end

  def forums_product_link_for(product)
    href = find(id: product)
    href.attribute('href')
  end

end
