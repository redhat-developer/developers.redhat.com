require_relative '../../../lib/process_runner'

#
# A simple wrapper class that provides a way of executing the backup-reset code
# within the desired Docker container.
#
# @author rblake@redhat.com
#
class Run

  def initialize(environments_directory, process_runner)
    @environments_directory = environments_directory
    @process_runner = process_runner
  end

  #
  # Executes the docker-compose command that will run the backup reset process. This script is invoked by
  # Jenkins.
  #
  def execute!
    @process_runner.execute!("cd #{@environments_directory} && docker-compose -f drupal-production/docker-compose.yml run --rm --entrypoint 'ruby /home/jenkins_developer/developer.redhat.com/_docker/lib/backup/reset/backup_reset.rb' backup")
  end
end

if $PROGRAM_NAME == __FILE__
  Run.new('../../../environments', ProcessRunner.new).execute!
end
