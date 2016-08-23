require_relative 'abstract/site_base'
require_relative '../../../_cucumber/lib/helpers/products_helper'

class TechnologiesPage < SiteBase
  page_url('/products/')
  page_title('Red Hat Products')

  class << self
    include ProductsHelper
  end

  element(:products_sections)                      { |el| el.find_elements(css: '.development-tool') }
  elements(:products_links)                        { |el| el.find_elements(css: '.development-tools h4 > a') }

  element(:accelerated_development_and_management) { |el| el.text_of(id: 'accelerated_development_and_management') }
  element(:developer_tools)                        { |el| el.text_of(id: 'developer_tools') }
  element(:infrastructure)                         { |el| el.text_of(id: 'infrastructure') }
  element(:integration_and_automation)             { |el| el.text_of(id: 'integration_and_automation') }
  element(:runtimes)                               { |el| el.text_of(id: 'runtimes') }
  element(:cloud)                                  { |el| el.text_of(id: 'private_cloud') }
  element(:mobile)                                 { |el| el.text_of(id: 'mobile') }

  def product_titles
    titles = []
    elements = [accelerated_development_and_management, developer_tools, infrastructure, integration_and_automation, runtimes, cloud, mobile]
    elements.each { |el| titles << el }
    titles
  end

  def available_products
    products = []
    products_links.each do |el|
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
