require_relative 'base'
require_relative '../../../_cucumber/lib/helpers/products_helper'

class Forums < Base
  
  class << self
    include ProductsHelper
  end
  
  PRODUCTS_FORUM_SECTIONS                         = { css: '.development-tool' }
  PRODUCTS_FORUM_LINKS                            = { css: '.forums-product-categories h4 > a' }
  FORUMS_INFRASTRUCTURE                           = { id: 'infrastructure' }
  FORUMS_INTEGRATION_AND_AUTOMATION               = { id: 'integration_and_automation' }
  FORUMS_ACCELERATED_DEVELOPMENT_AND_MANAGEMENT   = { id: 'accelerated_development_and_management' }

  def initialize(driver)
    super
    verify_page('Forums | Red Hat Developers')
  end

  def forums_product_sections
    titles = []
    elements = [FORUMS_INFRASTRUCTURE, FORUMS_ACCELERATED_DEVELOPMENT_AND_MANAGEMENT, FORUMS_INTEGRATION_AND_AUTOMATION]
    elements.each { |el|
      wait_for { displayed?(el) }
      titles << text_of(el)
    }
    titles
  end

  def forums_available_products
    products = []
    ids      = []

    available_links = find_elements(PRODUCTS_FORUM_LINKS)
    available_ids   = find_elements(xpath: "//*[@class='development-tool']//*")

    #return available product id's
    available_ids.each { |id| ids << id.attribute('id') }
    #return available product links
    available_links.each { |el| products << el.text }

    ids.uniq!
    return products, ids.reject!(&:empty?)
  end

  def forums_product_section_for(product)
    wait_for(20) { displayed?(id: "development-tool-#{product}") }
    text_of(id: "development-tool-#{product}")
  end

  def forums_product_link_for(product)
    href = find(id: product)
    href.attribute('href')
  end

end
