module DownloadHelper

  TIMEOUT = 30
  PATH = File.join(Dir.pwd, '_cucumber/tmp/downloads')

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
    Dir.glob("#{PATH}/*")
  end

  def download_path
    wait_for_download
    download_dir.first
  end

  def downloaded?
    download_dir.any? && !downloading?
  end

  def downloading?(product_id)
    wait_for_downloading {
      downloaded_file_size = Dir[File.join(PATH, '**', '*')].count { |file| File.file?(file) }
      downloaded_file_size == 1 && (download_dir.first.include?(product_id) || download_dir.grep(/\.crdownload$/).any?)
    }
  end

  def wait_for_downloading(i = TIMEOUT)
    count = 0; downloading = false
    until downloading == true || count == i
      downloading = yield
      sleep(1)
      count += 1
    end
    downloading
  end

  def clear_downloads
    FileUtils.rm_f(download_dir)
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
