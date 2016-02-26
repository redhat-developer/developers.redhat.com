module DownloadHelper

  TIMEOUT = 30
  PATH = File.join(Dir.pwd, '_cucumber/tmp/downloads')

  def download_manager_base_url
    if Capybara.app_host == 'http://developers.redhat.com/' || 'https://developers.redhat.com/'
      'https://developers.redhat.com/download-manager/rest/available'
    else
      'https://developers.stage.redhat.com/download-manager/rest/available'
    end
  end

  extend self

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

  def downloads
    Dir.glob("#{PATH}/*")
  end

  def downloading?(product_id)
    Timeout.timeout(TIMEOUT) do
      downloaded_file_size = Dir[File.join(PATH, '**', '*')].count { |file| File.file?(file) }
      sleep 0.1 until downloaded_file_size == 1 && (downloads.first.include?(product_id) || downloads.grep(/\.crdownload$/).any?)
    end
    downloads.grep(/\.crdownload$/).any?
  end

  def clear_downloads
    FileUtils.rm_rf(PATH)
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
      when 'Red Hat Container Development Kit (CDK) 2'
        'cdk'
      else
        raise "No mapping for #{product}! See Downloads Helper"
    end
  end

end

World(DownloadHelper)
