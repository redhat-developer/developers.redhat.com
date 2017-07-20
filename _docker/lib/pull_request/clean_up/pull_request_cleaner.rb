require 'tmpdir'

require_relative 'pull_requests'
require_relative '../../default_logger'
require_relative '../../process_runner'

#
# This class cleans-up resources associated with pull requests. It primarily performs 2 tasks:
#
# 1: Delete any docker resources associated with the pull request
# 2: Delete the site export associated with the pull request
#
# @author rblake@redhat.com
#
class PullRequestCleaner

  attr_accessor :empty_dir

  def initialize(pull_requests, process_runner, docker_environment_directory)
    @pull_requests = pull_requests
    @process_runner = process_runner
    @docker_environment_directory = docker_environment_directory
    @log = DefaultLogger.logger
    @empty_dir = Dir.mktmpdir
  end

  #
  # Run the pull request clean-up process.
  #
  def clean_up_closed_pull_requests
    pull_requests_to_clean = @pull_requests.list_closed
    clean_up_pull_request_docker_resources(pull_requests_to_clean)
    clean_up_pull_request_site_export(pull_requests_to_clean)
  end

  private

  #
  # For each pull request, uses docker-compose down to destroy any associated docker resources
  #
  def clean_up_pull_request_docker_resources(pull_requests)

    pull_requests.each do |pull_request|
      @log.info("Cleaning up Docker resources for pull request '#{pull_request}'...")
      @process_runner.execute!("cd #{@docker_environment_directory} && docker-compose -p rhdpr#{pull_request} down -v --remove-orphans --rmi local")

      #
      # This command cleans-up any remaining Docker images. It will fail if there are no images to be cleaned, so we
      # use execute? to ignore that failure as it doesn't matter.
      #
      @process_runner.execute?("docker rmi $(docker images --format \"{{.Repository}}\" rhdpr#{pull_request}*)")
    end
  end

  #
  # For each pull request, rsyncs an empty directory into the export location to clean-up
  #
  def clean_up_pull_request_site_export(pull_requests)

    pull_requests.each do |pull_request|
      @log.info("Cleaning up site export for pull request '#{pull_request}'...")
      @process_runner.execute!("rsync --partial --archive --checksum --compress --omit-dir-times --quiet --ignore-non-existing --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 --delete #{@empty_dir}/ rhd@filemgmt.jboss.org:/stg_htdocs/it-rhd-stg/pr/#{pull_request}")
    end

  end

end
