require 'octokit'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../lib/pull_request/clean_up/pull_requests'
require_relative '../../test_helper'

class TestPullRequests < MiniTest::Test

  def setup
    @pull_requests = PullRequests.new('redhat-developers/developers.redhat.com','foo')
  end

  def test_should_list_and_return_closed_pull_requests

    pull_request = {:number => 20}
    pull_request_2 = {:number => 30}
    Octokit.expects(:pull_requests).with('redhat-developers/developers.redhat.com',{:state => 'closed', :per_page => 50, :sort => 'updated', :direction => 'desc'}).returns([pull_request, pull_request_2])

    closed_pull_requests = @pull_requests.list_closed(50)

    assert_equal(2, closed_pull_requests.length)
    assert_includes(closed_pull_requests, 20)
    assert_includes(closed_pull_requests, 30)
  end

end