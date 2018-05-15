require 'net/http'
require 'uri'
require 'json'
require 'date'
require 'tmpdir'

class Jenkins

  def initialize
    @jenkins_base_url = ENV['jenkins_base_url'] || 'http://jenkins.mw.lab.eng.bos.redhat.com/hudson/'
    unless ENV['jenkins_username'] && ENV['jenkins_password']
    end
  end

  def read_changes(job, build_number)
    url = @jenkins_base_url
    url << "job/#{job}/#{build_number}/api/json?wrapper=changes"
    uri = URI.parse(url)
    req = Net::HTTP::Get.new(uri.path)
    if ENV['jenkins_username'] && ENV['jenkins_password']
      req.basic_auth ENV['jenkins_username'], ENV['jenkins_password']
    end
    http = Net::HTTP.new(uri.host, uri.port)
    if uri.scheme == 'https'
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    end
    resp = http.request(req)
    issues = []
    commits = []
    if resp.is_a?(Net::HTTPSuccess)
        json = JSON.parse(resp.body)
        json['changeSet']['items'].each do |item|
          commits << item['commitId']
          issues << item['comment'].scan(JIRA::KEY_PATTERN)
        end
    else
      msg "Error loading changes from Jenkins using #{url}. Status code #{resp.code}. Error message #{resp.body}"
    end
    # There can be multiple comments per issue
    {:issues => issues.flatten.uniq, :commits => commits}
  end
end
