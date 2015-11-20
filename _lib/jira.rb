class JIRA

  KEY_PATTERN = /(?:[[:punct:]]|\s|^)([A-Z]+-[0-9]+)(?=[[:punct:]]|\s|$)/

  def initialize
    @jira_base_url = ENV['jira_base_url'] || 'https://issues.jboss.org/'
    @jira_issue_base_url = "#{@jira_base_url}rest/api/2/issue/"
    unless ENV['jira_username'] && ENV['jira_password']
      abort 'Must provide jira_username and jira_password environment variables'
    end
  end

  def comment_issues(issues, comment)
    issues.each do |k|
      url = "#{@jira_issue_base_url}#{k}/comment"
      body = %Q{{ "body": "#{comment}"}}
      resp = post(url, body)
      if resp.is_a?(Net::HTTPSuccess)
        msg "Successfully commented on #{k}"
      else
        msg "Error commenting on #{k} in JIRA. Status code #{resp.code}. Error message #{resp.body}"
        msg "Request body: #{body}"
      end
    end
  end

  def issue_status(issue)
    url = "#{@jira_issue_base_url}#{issue}?fields=status"
    resp = get(url)
    if resp.is_a?(Net::HTTPSuccess)
      json = JSON.parse(resp.body)
      if json['fields'] && json['fields']['status'] && json['fields']['status']['name']
        json['fields']['status']['name']
      else
        msg "Error fetching status of #{issue} from JIRA. Status field not present"
        -1
      end
    else
      msg "Error fetching status of #{issue} from JIRA. Status code #{resp.code}. Error message #{resp.body}"
      -1
    end
  end

  def linked_pull_request(issue)
    url = "#{@jira_issue_base_url}#{issue}?fields=customfield_12310220"
    resp = get(url)
    if resp.is_a?(Net::HTTPSuccess)
      json = JSON.parse(resp.body)
      if json['fields'] && json['fields']['customfield_12310220']
        json['fields']['customfield_12310220']
      end
    else
      msg "Error fetching linked pull request for #{issue} from JIRA. Status code #{resp.code}. Error message #{resp.body}"
      -1
    end
  end

  def post(url, body)
    uri = URI.parse(url)
    req = Net::HTTP::Post.new(uri.path, initheader = {'Content-Type' =>'application/json'})
    req.basic_auth ENV['jira_username'], ENV['jira_password']
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req.body = body
    http.request(req)
  end

  def get(url)
    uri = URI.parse(url)
    req = Net::HTTP::Get.new(uri.path, initheader = {'Content-Type' =>'application/json'})
    req.basic_auth ENV['jira_username'], ENV['jira_password']
    http = Net::HTTP.new(uri.host, uri.port)
    if uri.scheme == 'https'
      http.use_ssl = true
    end
    http.request(req)
  end

  def link_pull_requests_if_unlinked(issues, pull_request)
    linked_issues = []
    issues.each do |k|
      pr = linked_pull_request k
      if pr.nil?
        url = "#{@jira_issue_base_url}#{k}/transitions"
        body = %Q{
          {
            "update": {
              "customfield_12310220": [
                {
                  "set": "https://github.com/redhat-developer/developers.redhat.com/pull/#{pull_request}"
                }
              ]
            },
            "transition": {
              "id": "131"
            }
          }
        }
        resp = post(url, body)
        if resp.is_a?(Net::HTTPSuccess)
          msg "Successfully linked https://github.com/redhat-developer/developers.redhat.com/pull/#{pull_request} to #{k}"
        else
          msg "Error linking https://github.com/redhat-developer/developers.redhat.com/pull/#{pull_request} to #{k} in JIRA. Status code #{resp.code}. Error message #{resp.body}"
          msg "Request body: #{body}"
        end
        linked_issues << k
      end
    end
    linked_issues
  end
end
