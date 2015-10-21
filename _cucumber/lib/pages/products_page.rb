class ProductsPage < Base

  PRODUCTS_SECTIONS          = '.development-tool'
  LEARN_LINKS                = '.fa-files-o'
  INFRASTRUCTURE_MANAGEMENT  = '#infrastructure_management'
  CLOUD_PRODUCTS             = '#cloud_products'
  MOBILE                     = '#mobile'
  JBOSS_DEV_AND_MANAGEMENT   = '#jboss_development_and_management'
  INTEGRATION_AND_AUTOMATION = '#integration_and_automation'

  def initialize(driver)
    super
    loaded?('Red Hat Products')
  end

  def product_titles(product)
    case product
      when 'INFRASTRUCTURE MANAGEMENT'
        page.find(INFRASTRUCTURE_MANAGEMENT).find('h5').text
      when 'CLOUD PRODUCTS'
        page.find(CLOUD_PRODUCTS).find('h5').text
      when 'JBOSS DEVELOPMENT AND MANAGEMENT'
        page.find(JBOSS_DEV_AND_MANAGEMENT).find('h5').text
      when 'INTEGRATION AND AUTOMATION'
        page.find(INTEGRATION_AND_AUTOMATION).find('h5').text
      else
        raise "#{product} was not a expected product title"
    end
  end

  def available_products(products)
    page.has_selector?(PRODUCTS_SECTIONS, :count => products.to_i)
  end

  def learn_links(links)
    page.has_selector?(LEARN_LINKS, :count => links.to_i)
  end

end
