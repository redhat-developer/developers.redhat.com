class ProductsPage < Base

  def initialize(driver)
    super
    loaded?('Red Hat Products')
  end

  PRODUCTS_SECTION           = '.development-tool'
  LEARN_LINKS                = '.fa-files-o'
  INFRASTRUCTURE_MANAGEMENT  = '#infrastructure_management'
  CLOUD_PRODUCTS             = '#cloud_products'
  MOBILE                     = '#mobile'
  JBOSS_DEV_AND_MANAGEMENT   = '#jboss_development_and_management'
  INTEGRATION_AND_AUTOMATION = '#integration_and_automation'

end