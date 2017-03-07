require_relative '../../process_runner'
require_relative 'pull_requests'
require_relative 'pull_request_cleaner'

# We need to bind this env value as the docker-compose.yml for the PR environment expects it to be there.
# Without it the docker-compose.yml is invalid. This won't cause any issues as we do not run any containers here.
ENV['DRUPAL_HOST_PORT']= '9999'

github_api_token = ENV['github_status_api_token']
Kernel.abort('The environment variable \'github_status_api_token\' is not set. I cannot connect to the GitHub API!') if github_api_token.nil? || github_api_token.empty?

docker_env_directory = File.join(File.dirname(__FILE__),'../../../environments/drupal-pull-request')

pull_requests = PullRequests.new('redhat-developer/developers.redhat.com', github_api_token)
pull_request_cleaner = PullRequestCleaner.new(pull_requests, ProcessRunner.new, docker_env_directory)
pull_request_cleaner.clean_up_closed_pull_requests