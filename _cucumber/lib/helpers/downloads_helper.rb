require 'yaml'

module DownloadHelper

  TIMEOUT = 12

  extend self

  def download_manager_base_url
    case $host_to_test
      when 'http://developers.redhat.com/', 'https://developers.redhat.com/'
        'https://developers.redhat.com/download-manager/rest/available'
      else
        'https://developers.stage.redhat.com/download-manager/rest/available'
    end
  end

  def get_download_data(url)
    response = RestClient::Request.execute(method: :get, url: url, verify_ssl: false, headers: {:accept => :json})
    raise("Download Manager is down! Response code was: #{response.code}") unless response.code.eql?(200)
    JSON.parse(response)
  end

  def get_featured_download_for(product_id)
    data = get_download_data(download_manager_base_url + "/#{product_id}")
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
      when 'Red Hat Container Development Kit (CDK)'
        'cdk'
      when 'Red Hat Enterprise Linux'
        'rhel'
      else
        raise "No mapping for #{product}! See Downloads Helper"
    end
  end

end

World(DownloadHelper)
