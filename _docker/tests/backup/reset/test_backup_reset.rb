require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../test_helper'
require_relative '../../../lib/backup/reset/backup_reset'

class TestBackupReset < MiniTest::Test

  def setup
    @backup_dir = '/backups'
    @backup_git_repository = 'https://github.com/redhat-developer/rhd-backups.git'
    @process_runner = mock()
    @backup_reset = BackupReset.new(@backup_dir, @backup_git_repository, @process_runner)
  end

  def test_should_clean_and_reset_repository
    @process_runner.expects(:execute!).with("rm -rf #{@backup_dir}/* #{@backup_dir}/.git #{@backup_dir}/.gitattributes")
    @process_runner.expects(:execute!).with("git lfs clone #{@backup_git_repository} #{@backup_dir}")

    @backup_reset.reset_backup_repository
  end
end
