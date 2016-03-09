require_relative 'base_page'
require_relative '../../../_cucumber/lib/helpers/products_helper'

class Technologies < BasePage

  class << self
    include ProductsHelper
  end

  set_url '/products/'

  elements :products_sections, '.development-tool'
  elements :products_link, 'h4 > a'
  element :infrastructure, '#infrastructure'
  element :cloud_products, '#cloud_products'
  element :mobile, '#mobile'
  element :jboss_dev_and_management, '#jboss_development_and_management'
  element :integration_and_automation, '#integration_and_automation'

  get_products[0].each do |product_id|
    # define elements for each available product
    element :"#{product_id}_section", "#development-tool-#{product_id}"
    element :"get_started_with_#{product_id}_button", "#get-started-with-#{product_id}"
    element :"product_#{product_id}_link", "##{product_id}"
    element :"learn_#{product_id}_link", "#learn-#{product_id}"
    element :"#{product_id}_docs_and_apis", "##{product_id}-docs-and-apis"
    element :"download_#{product_id}", "#download-#{product_id}"
  end

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Red Hat Products')
  end

  def product_titles
    titles = []
    elements = [infrastructure, cloud_products, mobile, jboss_dev_and_management, integration_and_automation]
    elements.each { |el| titles << el.text }
    titles
  end

  def available_products
    products = []
    products_link.map { |name|
      products << name.text }
    products
  end

end
