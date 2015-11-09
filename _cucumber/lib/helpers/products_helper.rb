module ProductsHelper

  PRODUCTS = ['Red Hat Enterprise Linux Atomic Host', 'Red Hat Enterprise Linux', 'Red Hat Satellite', 'Red Hat Developer Toolset', 'Red Hat Software Collections', 'OpenShift Enterprise by Red Hat', 'Red Hat Mobile Application Platform', 'Red Hat JBoss Developer Studio', 'Red Hat JBoss Enterprise Application Platform', 'Red Hat JBoss Data Grid', 'Red Hat JBoss Web Server', 'Red Hat JBoss Fuse', 'Red Hat JBoss BPM Suite', 'Red Hat JBoss BRMS', 'Red Hat JBoss Data Virtualization', 'Red Hat JBoss A-MQ']

  def get_products
    product_type = []
    product_id = []
    Dir.glob(File.join('products', '**', '**.yml')).each do |file|
      data = YAML.load_file(file)
      product_type << data['name']
      product_id << file.gsub('products/', '').gsub('/_common/product.yml', '')
    end
    raise('There was a problem returning products and their ids, please check Products helper module in /lib/helpers') unless product_type.size == product_id.size
    Hash[product_id.zip(product_type)]
  end

  def get_products_with_learn_links
    product_type = []
    product_id = []
    if Dir.glob(File.join('products', '**', 'learn.html.slim')).each do |learn|
      path_to_product = learn.gsub('/learn.html.slim', '')
      Dir.glob("#{path_to_product}/_common/product.yml").each do |f|
        product_id << path_to_product.gsub('products/', '')
        data = YAML.load_file(f)
        product_type << data['name']
      end
    end
    end
    raise('There was a problem returning the product ids for products that contain learn links, please check Products helper module in /lib/helpers') unless product_type.size == product_id.size
    Hash[product_id.zip(product_type)]
  end

end

World(ProductsHelper)
