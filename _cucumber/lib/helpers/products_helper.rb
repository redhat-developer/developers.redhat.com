# this module is used to get the latest products from their representative product.yml file
module ProductsHelper
  module_function

  def product(product_id, info)
    data = YAML.load_file("#{$products_dir}/#{product_id}/_common/product.yml")
    case info
      when 'name'
        data['name']
      when 'description'
        desc = data['index']['desc'].sub("\n", ' ')
        desc.sub("'", '’') if desc.include?("'")
        desc.chomp(' ')
      when 'forum_desc'
        data['forum_desc']
      else
        fail("#{info} was not a valid product item, please check Products helper module in /lib/helpers")
    end
  end

  def products
    product_type = []
    product_id = []
    Dir.glob(File.join("#{$products_dir}", '**', '**.yml')).each do |file|
      data = YAML.load_file(file)
      product_type << data['name']
      product_id << file.sub('products/', '').sub('/_common/product.yml', '')
    end
    fail('There was a problem returning available products, please check Products helper module in /lib/helpers') unless product_type.size == product_id.size
    [product_id, product_type]
  end

  def product_by_id(id)
    data = YAML.load_file("#{$products_dir}/#{id}/_common/product.yml")
    data['name']
  end

  def products_with_links(link_type)
    product_type = []
    product_id = []
    if Dir.glob(File.join("#{$product_dir}", '**', link_type)).each do |learn|
      path_to_product = learn.gsub("/#{link_type}", '')
      Dir.glob("#{path_to_product}/_common/product.yml").each do |f|
        product_id << path_to_product.sub('products/', '')
        data = YAML.load_file(f)
        product_type << data['name']
      end
    end
    end
    fail("There was a problem returning the products with #{link_type}, please check Products helper module in /lib/helpers") unless product_type.size == product_id.size
    [product_id, product_type]
  end

  def categories
    product_title = []
    product_id = []
    data = YAML.load_file("#{$config_dir}/categories.yml")
    data.each do |product|
      product_title << product['name']
      product_id << product['products']
    end
    [product_title, product_id]
  end
end
World(ProductsHelper)
