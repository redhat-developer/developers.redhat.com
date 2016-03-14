module DownloadHelper

  TIMEOUT = 30

  extend self

  def download_manager_base_url
    case Capybara.app_host.to_s
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

  def download_dir
    Dir.glob("#{@download_dir}").count { |file| File.file?(file) }
  end

  def downloading?
    dir = download_dir
    wait_for_downloading {
      dir == 1
    }
  end

  def wait_for_downloading(i = TIMEOUT)
    count = 0; downloading = 1
    until downloading == 1 || count == i
      downloading = yield
      sleep(0.5)
      count += 1
    end
    downloading.eql?(1)
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
      else
        raise "No mapping for #{product}! See Downloads Helper"
    end
  end

end

World(DownloadHelper)
