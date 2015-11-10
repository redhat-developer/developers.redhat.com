module ProductsHelper

  def get_products
    product_type = []
    product_id = []
    Dir.glob(File.join('products', '**', '**.yml')).each do |file|
      data = YAML.load_file(file)
      product_type << data['name']
      product_id << file.gsub('products/', '').gsub('/_common/product.yml', '')
    end
    raise('There was a problem returning available products, please check Products helper module in /lib/helpers') unless product_type.size == product_id.size
    return product_id, product_type
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
    raise('There was a problem returning the products that have a learn link available, please check Products helper module in /lib/helpers') unless product_type.size == product_id.size
    return product_id, product_type
  end

  def get_products_with_docs
    product_type = []
    product_id = []
    if Dir.glob(File.join('products', '**', 'docs-and-apis.adoc')).each do |learn|
      path_to_product = learn.gsub('/docs-and-apis.adoc', '')
      Dir.glob("#{path_to_product}/_common/product.yml").each do |f|
        product_id << path_to_product.gsub('products/', '')
        data = YAML.load_file(f)
        product_type << data['name']
      end
    end
    end
    raise("There was a problem returning the products that contain docs and API's, please check Products helper module in /lib/helpers") unless product_type.size == product_id.size
    return product_id, product_type
  end

  def get_products_with_downloads
    product_type = []
    product_id = []
    if Dir.glob(File.join('products', '**', 'download.adoc')).each do |learn|
      path_to_product = learn.gsub('/download.adoc', '')
      Dir.glob("#{path_to_product}/_common/product.yml").each do |f|
        product_id << path_to_product.gsub('products/', '')
        data = YAML.load_file(f)
        product_type << data['name']
      end
    end
    end
    raise("There was a problem returning the products that have downloads available, please check Products helper module in /lib/helpers") unless product_type.size == product_id.size
    return product_id, product_type
  end


end

World(ProductsHelper)
