require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/tests/test_helper'
require_relative '../../../_docker/lib/backup/git_backup_strategy'

class TestGitBackupStrategy < Minitest::Test

  def setup
    @process_runner = mock()
    @git_repo_location = '/backup'
  end

  def test_initialises_git_repository_for_backups

    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git reset --hard")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git clean -xdf")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git checkout master")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git pull")

    git_backup_strategy = GitBackupStrategy.new(@git_repo_location, @process_runner)
  end

  def test_add_file_to_backup

    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git reset --hard")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git clean -xdf")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git checkout master")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git pull")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git add my_file")

    git_backup_strategy = GitBackupStrategy.new(@git_repo_location, @process_runner)
    git_backup_strategy.add_file_to_backup('my_file')

  end

  def test_commit_backup

    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git reset --hard")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git clean -xdf")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git checkout master")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git pull")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git commit -a -m \"my_message\"")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git push origin master")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git tag my_tag")
    @process_runner.expects(:execute!).with("cd #{@git_repo_location} && git push origin refs/tags/my_tag")

    git_backup_strategy = GitBackupStrategy.new(@git_repo_location, @process_runner)
    git_backup_strategy.commit_backup('my_message', 'my_tag')
  end

end