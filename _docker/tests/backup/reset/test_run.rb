require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../test_helper'
require_relative '../../../lib/backup/reset/run'

class TestRun < MiniTest::Test

  def setup
    @process_runner = mock()
    @environments_directory = '/tmp/environments'
    @run = Run.new(@environments_directory, @process_runner)
  end

  def test_should_correctly_invoke_docker_compose_command

    @process_runner.expects(:execute!).with("cd #{@environments_directory} && docker-compose -f drupal-production/docker-compose.yml run --rm --entrypoint 'ruby /home/jenkins_developer/developer.redhat.com/_docker/lib/backup/reset/backup_reset.rb' backup")
    @run.execute!
  end
end