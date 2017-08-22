require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../lib/pull_request/clean_up/pull_request_cleaner'
require_relative '../../test_helper'

class TestPullRequestCleaner < MiniTest::Test

  def setup
    @pull_requests = mock()
    @process_runner = mock()
    @docker_directory = '/tmp/docker'
    @empty_dir = Dir.mktmpdir
    @pull_request_cleaner = PullRequestCleaner.new(@pull_requests, @process_runner, @docker_directory)
    @pull_request_cleaner.empty_dir = @empty_dir
  end

  def test_should_clean_up_for_each_pull_request

    @pull_requests.expects(:list_closed).returns(%w(1 2))

    @process_runner.expects(:execute!).with("cd #{@docker_directory} && docker-compose -p rhdpr1 down -v --remove-orphans --rmi local")
    @process_runner.expects(:execute?).with('docker rmi $(docker images --format "{{.Repository}}" rhdpr1*)')
    @process_runner.expects(:execute!).with("cd #{@docker_directory} && docker-compose -p rhdpr2 down -v --remove-orphans --rmi local")
    @process_runner.expects(:execute?).with('docker rmi $(docker images --format "{{.Repository}}" rhdpr2*)')
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --ignore-non-existing --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 --delete #{@empty_dir}/ rhd@filemgmt.jboss.org:/stg_htdocs/it-rhd-stg/pr/1")
    @process_runner.expects(:execute!).with("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --ignore-non-existing --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 --delete #{@empty_dir}/ rhd@filemgmt.jboss.org:/stg_htdocs/it-rhd-stg/pr/2")

    @pull_request_cleaner.clean_up_closed_pull_requests
  end

end