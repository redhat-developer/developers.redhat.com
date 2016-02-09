require 'minitest/autorun'
require 'mocha/mini_test'
require 'sawyer'
require_relative '../_lib/github.rb'
require_relative 'test_helper.rb'

class ResourceStub
  def initialize(n)
    @number = n
  end
  def number
    @number
  end
end

class TestGitHub < Minitest::Test
  def test_list_closed_prs
    prs = [ResourceStub.new(5), ResourceStub.new(4), ResourceStub.new(3), ResourceStub.new(2), ResourceStub.new(1)]
    Octokit.stubs(:pull_requests).with("foo/bar", :state => 'closed', :per_page => 100).returns prs

    pulls = GitHub.list_closed_pulls('foo', 'bar')
    assert_equal(pulls, [5,4,3,2,1])
  end

  def test_list_closed_prs_with_perpage_param
    prs = [ResourceStub.new(5), ResourceStub.new(4)]
    Octokit.stubs(:pull_requests).with("foo/bar", :state => 'closed', :per_page => 2).returns prs

    pulls = GitHub.list_closed_pulls('foo', 'bar', 2)
    assert_equal(pulls, [5,4])
  end

  def test_comment_on_pull
    pr_number = 88
    expected_comment = "FooBar"
    Octokit.expects(:add_comment).with("foo/bar", pr_number, expected_comment)
    GitHub.comment_on_pull('foo', 'bar', pr_number, expected_comment)
  end

  def test_zero_linked_prs
    issues = []
    pr_number = 144
    Octokit.expects(:add_comment).never
    GitHub.link_issues('foo', 'bar', pr_number, issues)
  end

  def test_one_linked_pr
    issues = ["RHD-99"]
    pr_number = 144
    expectedComment = %Q{Related issue: <a href="https://issues.jboss.org/browse/RHD-99">RHD-99</a>}
    Octokit.expects(:add_comment).with("foo/bar", pr_number, expectedComment)
    GitHub.link_issues('foo', 'bar', pr_number, issues)
  end

  def test_two_linked_prs
    issues = ["RHD-99", "RHD-33"]
    pr_number = 144
    expectedComment = %Q{Related issues: <a href="https://issues.jboss.org/browse/RHD-99">RHD-99</a>, <a href="https://issues.jboss.org/browse/RHD-33">RHD-33</a>}
    Octokit.expects(:add_comment).with("foo/bar", pr_number, expectedComment)
    GitHub.link_issues('foo', 'bar', pr_number, issues)
  end

  def test_rejects_unknown_status
    assert_raises GitHubExceptions::UnknownStatus do
      sha = 7777
      state = "pending"
      options = {:context => "mock tests", :target_url => "www.example.com", :description => "Short Desc"}
      GitHub.update_status('foo', 'bar', sha, state, options)
    end
  end

  def test_status_update_contexts
    sha = 7777
    state = "pending"
    options = {:context => "Unit Tests", :target_url => "www.example.com", :description => "Short Desc"}
    Octokit.expects(:create_status).with('foo/bar', sha, state, options)
    GitHub.update_status('foo', 'bar', sha, state, options)

    options = {:context => "Site Preview", :target_url => "www.example.com", :description => "Short Desc"}
    Octokit.expects(:create_status).with('foo/bar', sha, state, options)
    GitHub.update_status('foo', 'bar', sha, state, options)

    options = {:context => "Blinkr", :target_url => "www.example.com", :description => "Short Desc"}
    Octokit.expects(:create_status).with('foo/bar', sha, state, options)
    GitHub.update_status('foo', 'bar', sha, state, options)

    options = {:context => "Acceptance Tests", :target_url => "www.example.com", :description => "Short Desc"}
    Octokit.expects(:create_status).with('foo/bar', sha, state, options)
    GitHub.update_status('foo', 'bar', sha, state, options)
  end

  def test_status_update
    sha = 7777
    state = "pending"
    options = {:context => "Unit Tests", :target_url => "www.example.com", :description => "Short Desc"}
    Octokit.expects(:create_status).with('foo/bar', sha, state, options)
    GitHub.update_status('foo', 'bar', sha, state, options)
  end

  def test_set_all_status_to_pending
    sha = 7777
    state = "pending"
    target_url = "www.example.com"
    options1 = {:context => "Unit Tests", :target_url => "www.example.com", :description => "Pending"}
    options2 = {:context => "Acceptance Tests", :target_url => "www.example.com", :description => "Pending"}
    options3 = {:context => "Blinkr", :target_url => "www.example.com", :description => "Pending"}
    options4 = {:context => "Site Preview", :target_url => "www.example.com", :description => "Pending"}
    Octokit.expects(:create_status).with('foo/bar', sha, state, options1)
    Octokit.expects(:create_status).with('foo/bar', sha, state, options2)
    Octokit.expects(:create_status).with('foo/bar', sha, state, options3)
    Octokit.expects(:create_status).with('foo/bar', sha, state, options4)
    GitHub.all_status_to_pending('foo', 'bar', sha, target_url)
  end
end
