require 'octokit'

#
# This class lists the most recently closed pull requests on the redhat-developers/developers.redhat.com
# Git repository.
#
# Most recently is defined as a pull request that is closed, sorted by the last-modified date.
#
# @author rblake@redhat.com
#
class PullRequests

  def initialize(git_repository, api_token)
    @git_repository = git_repository
    Octokit.configure do |config|
      config.access_token = api_token
      config.connection_options[:ssl] = { :verify => false }
    end
  end

  #
  # Returns an array containing the numbers of the most recently closed pull requests
  #
  def list_closed(number_to_list = 100)
    Octokit.pull_requests(@git_repository, :state => 'closed', :per_page => number_to_list, :sort => 'updated', :direction => 'desc').map {|pull_request| pull_request[:number]}
  end

end
