require_relative 'base_page.rb'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class ProductsPage < BasePage
  include ProductsHelper
  attr_accessor :product_ids, :products
  set_url '/products/'

  element :infrastructure_management, '#infrastructure_management'
  element :cloud_products, '#cloud_products'
  element :mobile, '#mobile'
  element :jboss_dev_and_management, '#jboss_development_and_management'
  element :integration_and_automation, '#integration_and_automation'
  elements :products, 'h4 > a'
  elements :products_sections, '.development-tool'
  elements :learn_links, '.fa-files-o'

  @product_ids.each do |id|
    element :"get-started-with-#{id}", "get-started-with-#{id}"
  end

  def initialize(driver)
    super
    get_products.each { |key, value|
      @product_ids = key
      @products = value
    }
  end

  def open
    load
    loaded?('Red Hat Products')
  end

  def product_titles
    t = []
    elements = [infrastructure_management, cloud_products, mobile, jboss_dev_and_management, integration_and_automation]
    elements.each { |el| t << el.text }
    t
  end

  def available_products
    p = []
    products.map { |name|
      p << name.text }
    p
  end

end
