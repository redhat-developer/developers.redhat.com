require_relative 'base'
require_relative '../../../_cucumber/lib/helpers/products_helper'

class Technologies < Base

  class << self
    include ProductsHelper
  end

  PRODUCTS_SECTIONS          = { css: '.development-tool' }
  PRODUCTS_LINKS             = { css: '.development-tools h4 > a' }
  INFRASTRUCTURE             = { id: 'infrastructure' }
  CLOUD                      = { id: 'private_cloud' }
  MOBILE                     = { id: 'mobile' }
  INTEGRATION_AND_AUTOMATION = { id: 'integration_and_automation' }

  def initialize(driver)
    super
    verify_page('Red Hat Products')
  end

  def product_titles
    titles = []
    elements = [INFRASTRUCTURE, CLOUD, MOBILE, INTEGRATION_AND_AUTOMATION]
    elements.each { |el| titles << text_of(el) }
    titles
  end

  def available_products
    products = []
    links = find_elements(PRODUCTS_LINKS)
    links.each do |el|
      products << el.text
    end
    products
  end

  def product_section_for(product)
    text_of(id: "development-tool-#{product}")
  end

  def product_description_for(product)
    text_of(css: "#development-tool-#{product} .paragraph")
  end

  def product_link_for(product)
    href = find(id: product)
    href.attribute('href')
  end

  def get_started_button_for(product)
    href = find(id: "get-started-with-#{product}")
    href.attribute('href')
  end

  def learn_link_for(product)
    href = find(id: "learn-#{product}")
    href.attribute('href')
  end

  def docs_and_apis_for(product)
    href = find(id: "#{product}-docs-and-apis")
    href.attribute('href')
  end

  def download_button_for(product)
    href = find(id: "download-#{product}")
    href.attribute('href')
  end

end
