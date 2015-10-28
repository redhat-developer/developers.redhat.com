require_relative 'base.rb'

class ProductsPage < Base
  set_url '/products/'

  elements :products_sections, '.development-tool'
  elements :learn_links, '.fa-files-o'
  element  :infrastructure_management, '#infrastructure_management'
  element  :cloud_products, '#cloud_products'
  element  :mobile, '#mobile'
  element  :jboss_dev_and_management, '#jboss_development_and_management'
  element  :integration_and_automation, '#integration_and_automation'

  def initialize(driver)
    super
  end

  def open
    load
    loaded?('Red Hat Products')
  end

end
