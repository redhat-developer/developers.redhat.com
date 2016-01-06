module DownloadHelper

  TIMEOUT = 30
  PATH = File.join(Dir.pwd, '_cucumber/tmp/downloads')

  extend self

  def get_available_downloads
    url = "#{Capybara.app_host}/download-manager/rest/available/"
    response = RestClient::Request.execute(method: :get, url: url, verify_ssl: false, headers: {:accept => :json})
    raise("Download Manager REST endpoint is down! Response code was: #{response.code}") unless response.code.eql?(200)
    data = JSON.parse(response)
    products = []
    data.each do |i|
      products << i['name']
    end
    # returns an array of available downloads from the Download manager
    products
  end

  def downloads
    Dir.glob("#{PATH}/*")
  end

  def downloading?(product_id)
    Timeout.timeout(TIMEOUT) do
      downloaded_file_size = Dir[File.join(PATH, '**', '*')].count { |file| File.file?(file)  }
      sleep 0.1 until downloaded_file_size == 1 && downloads.first.include?(product_id)
    end
    downloads.first.include?(product_id)
  end

  def clear_downloads
    FileUtils.rm_rf(PATH)
  end

end

World(DownloadHelper)
