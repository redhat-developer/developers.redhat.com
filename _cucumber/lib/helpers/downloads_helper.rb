require 'yaml'

module DownloadHelper

  extend self

  def get_download_data(url)
    response = RestClient::Request.execute(method: :get, url: url, verify_ssl: false, headers: {:accept => :json})
    raise("Download Manager is down! Response code was: #{response.code}") unless response.code.eql?(200)
    JSON.parse(response)
  end

  def get_dm_available_downloads
    test = []
    data = get_download_data($download_manager_base_url)
    data.each { |code|
      test << code['productCode']
    }
    test
  end

  def get_featured_download_for(product_id)
    data = get_download_data($download_manager_base_url + "/#{product_id}")
    if data[0]['featuredArtifact']['versionName'].nil?
      raise "No Featured Artifact for #{product_id}"
    else
      download_version = data[0]['featuredArtifact']['versionName']
      download_url = data[0]['featuredArtifact']['url']
    end
    return download_version, download_url
  end

  def get_available_downloads
    products = []
    data = YAML.load_file('_config/categories.yml')
    data.each do |product|
      products << product['products']
    end
    products = products.flatten
    products -= ['developertoolset', 'softwarecollections']

    # now get product names
    product_name = []
    products.each do |product|
      product_name << get_product_by_id(product)
    end
    return products, product_name
  end

  def get_product_id(product)
    case product
      when 'JBoss Developer Studio'
        'devstudio'
      when 'Enterprise Application Server'
        'eap'
      when 'JBoss Data Grid'
        'datagrid'
      when 'JBoss Fuse'
        'fuse'
      when 'JBoss BPM Suite'
        'bpmsuite'
      when 'JBoss Business Rule Management System'
        'brms'
      when 'Data Virtualization'
        'datavirt'
      when 'Red Hat Container Development Kit'
        'cdk'
      when 'Red Hat Enterprise Linux'
        'rhel'
      when '.NET Runtime for Red Hat Linux'
        'dotnet'
      when 'Red Hat JBoss A-MQ'
        'amq'
      when 'Red Hat Development Suite'
        'devsuite'
      else
        raise "No mapping for #{product}! See Downloads Helper"
    end
  end

end

World(DownloadHelper)
