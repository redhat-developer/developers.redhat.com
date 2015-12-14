require 'octokit'

module GitHubExceptions
  class UnknownStatus < StandardError; end
end

class GitHub

  @@valid_contexts = ['Unit Tests', 'Site Preview', 'Acceptance Tests', 'Blinkr']

  Octokit.configure do |c|
    c.access_token = ENV['github_status_api_token']
  end

  def self.list_closed_prs(org, repo)
    Octokit.pull_requests("#{org}/#{repo}", :state => 'closed')
  end

  def self.update_status(org, repo, sha, state, options = {})
    status = options[:context]
    if (!@@valid_contexts.include?(status))
      raise GitHubExceptions::UnknownStatus.new
    end
    Octokit.create_status("#{org}/#{repo}", sha, state, options)
  end

  def self.comment_on_pull(org, repo, pr_number, comment)
    Octokit.add_comment("#{org}/#{repo}", pr_number, comment)
  end

  def self.list_closed_pulls(org, repo)
    #this api call gives us the last 30 pull requests that have been closed(/merged)
    pulls = GitHub.list_closed_prs(org, repo)
    pulls.collect { |pr| pr.number }
  end

  def self.link_issues(org, repo, pull, issues)
    if issues.length > 0
      issue_list = issues.collect {|i| %Q{<a href="https://issues.jboss.org/browse/} + i + %Q{">} + i + %Q{</a>}}.join(", ")
    GitHub.comment_on_pull(org, repo, pull, "Related issue#{issues.length > 1 ? 's' : ''}: #{issue_list}")
    end
  end
end
