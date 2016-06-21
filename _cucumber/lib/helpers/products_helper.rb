module ProductsHelper

  def get_product(product_id, info)
    data = YAML.load_file("products/#{product_id}/_common/product.yml")
    case info
      when 'name'
        return data['name']
      when 'description'
        desc = data['index']['desc'].gsub("\n", ' ')
        return desc.chomp(' ')
      else
        raise("#{info} was not a valid product item, please check Products helper module in /lib/helpers")
    end
  end

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

  def get_product_by_id(id)
    data = YAML.load_file("products/#{id}/_common/product.yml")
    data['name']
  end

  def get_products_with_links(link_type)
    product_type = []
    product_id = []
    if Dir.glob(File.join('products', '**', link_type)).each do |learn|
      path_to_product = learn.gsub("/#{link_type}", '')
      Dir.glob("#{path_to_product}/_common/product.yml").each do |f|
        product_id << path_to_product.gsub('products/', '')
        data = YAML.load_file(f)
        product_type << data['name']
      end
    end
    end
    raise("There was a problem returning the products with #{link_type}, please check Products helper module in /lib/helpers") unless product_type.size == product_id.size
    return product_id, product_type
  end

end

World(ProductsHelper)
