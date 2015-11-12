require 'octokit'

class GitHub

  Octokit.configure do |c|
    puts '~~~~~~~~~Setting access token'
    c.access_token = ENV['github_token']
  end

  def self.list_closed_prs(org, repo)
    puts "~~~~~~~~~List closed prs "
    Octokit.pull_requests("#{org}/#{repo}", :state => 'closed')
  end

  def self.comment_on_pull(org, repo, pr_number, comment)
    puts "~~~~~~~~~comment_on_pull "
    Octokit.add_comment("#{org}/#{repo}", pr_number, comment)
  end

  def self.list_closed_pulls(org, repo)
    puts "~~~~~~~~~list_closed_pulls"
    #this api call gives us the last 30 pull requests that have been closed(/merged)
    pulls = GitHub.list_closed_prs(org, repo)
    pulls.collect { |pr| pr.number }
  end

  def self.link_issues(org, repo, pull, issues)
    puts "~~~~~~~~~link_issues "
    puts "~~~~~~~#{issues.size}:issues #{issues}"
    if issues.length > 0
      issue_list = issues.collect {|i| %Q{<a href="https://issues.jboss.org/browse/} + i + %Q{">} + i + %Q{</a>}}.join(", ")
    GitHub.comment_on_pull(org, repo, pull, "Related issue#{issues.length > 1 ? 's' : ''}: #{issue_list}")
    end
  end
end
