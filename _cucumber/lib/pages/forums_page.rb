require_relative 'base'
require_relative '../../../_cucumber/lib/helpers/products_helper'

class Forums < Base
  
  class << self
    include ProductsHelper
  end
  
  PRODUCTS_FORUM_SECTIONS                  = { css: '.development-tool' }
  PRODUCTS_FORUM_LINKS                     = { css: '.forums-product-categories h4 > a' }
  FORUMS_INFRASTRUCTURE                           = { id: 'infrastructure' }
  FORUMS_INTEGRATION_AND_AUTOMATION               = { id: 'integration_and_automation' }
  FORUMS_ACCELERATED_DEVELOPMENT_AND_MANAGEMENT   = { id: 'accelerated_development_and_management' }
  # FORUMS_CLOUD                                    = { id: 'private_cloud' }
  # FORUMS_MOBILE                                   = { id: 'mobile' }

  def initialize(driver)
    super
    verify_page('forums')
  end

  def forums_product_sections
    titles = []
    elements = [FORUMS_INFRASTRUCTURE, FORUMS_ACCELERATED_DEVELOPMENT_AND_MANAGEMENT, FORUMS_INTEGRATION_AND_AUTOMATION]
    elements.each { |el| titles << text_of(el) }
    titles
  end

  def forums_available_products
    products = []
    links = find_elements(PRODUCTS_FORUM_LINKS)
    links.each do |el|
      products << el.text
    end
    products
  end

  def forums_product_section_for(product)
    text_of(id: "development-tool-#{product}")
  end

  def forums_product_link_for(product)
    href = find(id: product)
    href.attribute('href')
  end

end
