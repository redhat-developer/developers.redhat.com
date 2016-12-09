require 'yaml'
# this module contains a set of helper methods related to download tests, and is also used for getting latest available downloads from the download manager REST endpoint.
module DownloadHelper
  module_function

  def downloads
    Dir.glob("#{$download_directory}/*")
  end

  def download
    wait_for_downloaded
    downloads.first
  end

  def wait_for_downloaded
    Timeout.timeout(30) do
      sleep 0.1 until downloaded?
    end
  rescue
    downloading? == true
  end

  def downloaded?
    downloads.any? && !downloading.any?
  end

  def downloading?
    downloads.grep(/\.crdownload$/).any?
  end

  def clear_downloads
    FileUtils.rm_f(downloads)
  end

  def download_data(url)
    response = RestClient::Request.execute(method: :get, url: url, verify_ssl: false, headers: { accept: :json })
    JSON.parse(response)
  end

  def product_downloads_from_dm
    product_ids = expected_downloads[0]
    product_codes = []
    product_names = []
    data = download_data($download_manager_base_url + "/#{product_ids.join(',')}?nv=1")
    data.each do |code|
      product_names << code['name']
      product_codes << code['productCode']
    end
    [product_codes, product_names]
  end

  def all_available_downloads
    product_codes = []
    product_names = []
    data = download_data($download_manager_base_url + '?nv=1')
    data.each do |code|
      product_names << code['name']
      product_codes << code['productCode']
    end
    Hash[product_names.zip(product_codes)]
  end

  def featured_download_for(product_id)
    data = download_data($download_manager_base_url + "/#{product_id}?nv=1")
    download_version = data[0]['featuredArtifact']['versionName']
    download_url = data[0]['featuredArtifact']['url']
    [download_version, download_url]
  end

  def expected_downloads
    products = []
    data = YAML.load_file('_config/categories.yml')
    data.each do |product|
      products << product['products']
    end
    products = products.flatten
    products -= %w(developertoolset softwarecollections)

    # now get product names
    product_name = []
    products.each do |product|
      product_name << product_by_id(product)
    end
    [products, product_name]
  end
end
World(DownloadHelper)
