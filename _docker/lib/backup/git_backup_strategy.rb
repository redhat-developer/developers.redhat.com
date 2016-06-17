require_relative '../../../_docker/lib/default_logger'
require_relative '../../../_docker/lib/process_runner'

#
# A backup strategy that pushes files to a provided Git repository
#
# @author rblake@redhat.com
#
class GitBackupStrategy

  def initialize(git_repo_location, process_runner)
    @log = DefaultLogger.logger
    @process_runner = process_runner;
    @git_repo_location = git_repo_location
    prepare_git_repository_for_backup(git_repo_location)
  end

  def execute_git_command(git_command)
    @process_runner.execute!("cd #{@git_repo_location} && #{git_command}")
  end

  def prepare_git_repository_for_backup(repository_location)
    @log.info("Preparing repository at location '#{repository_location}' for backup:")
    execute_git_command('git reset --hard')
    execute_git_command('git clean -xdf')
    execute_git_command('git checkout master')
    execute_git_command('git pull')
  end

  def add_file_to_backup(file)
    execute_git_command("git add #{file}")
  end

  def commit_backup(backup_message, tag)
    @log.info('Committing backup and pushing to origin...')
    execute_git_command("git commit -a -m \"#{backup_message}\"")
    execute_git_command('git push origin master')
    execute_git_command("git tag #{tag}")
    execute_git_command("git push origin refs/tags/#{tag}")
    @log.info('Successfully pushed backup to origin')
  end

  private :execute_git_command, :prepare_git_repository_for_backup

end