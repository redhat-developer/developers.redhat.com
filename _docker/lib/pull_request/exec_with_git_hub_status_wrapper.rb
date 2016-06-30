#
# This class wraps a command line process and reports its progress and outcome to GitHub using
# the status API.
#
# This class is designed to be used in pull request environments that run Docker containers. This class
# should be set as the entrypoint for your container and the command you wish to run passed in via the
# Docker command argument (or as part of the entrypoint definition).
#
# The GitHub status API updates are controlled via environment variables set on your docker-compose container definition. The supported
# env args are:
# - github_status_api_token -> The API token that should be used to communicate with the Github status API
# - github_status_repo -> The GitHub repo to use in the format <user>/<repo>
# - github_status_target_url -> The URL to set as the target_url in the status update
# - github_status_context -> The context to use for the status update
# - github_status_sha1 -> The SHA1 of the commit that the status update should be applied to
# - github_status_initialise -> A comma separated list of contexts that should be set to pending by this container
#
# This class will set the initial state of the context to 'pending' before executing the command. If the command succeeds, then
# it will be updated to 'success'. If it fails, then it will be updated to 'failure'
#
# If the 'github_status_initialise' property is set on the container definition in which this class is running, then it will set
# all of the contexts within the variable to the 'pending' state.
#
# @author rblake@redhat.com
#

require 'octokit'
require_relative '../default_logger'
require_relative '../process_runner'

class ExecWithGitHubStatusWrapper

  def initialize(git_repository, git_sha1, context, target_url)
    @git_repository = git_repository
    @git_sha1 = git_sha1
    @context = context
    @target_url = target_url
    @log = DefaultLogger.logger
  end

  #
  # Initialises all contexts to the pending status and default description
  #
  def initialise_contexts(contexts=[])
    @log.info("Initialising '#{contexts.length}' contexts for pull request '#{@git_sha1}'")
    contexts.each do | context |
        update_status(context, 'pending')
    end
    @log.info("Successfully initialised '#{contexts.length}' contexts for pull request '#{@git_sha1}'")
  end

  #
  # Creates the status update options for the given context and status
  #
  def create_options(context, status)

    description = "#{context} is pending..."

    case status
      when 'success'
        description = "#{context} completed successfully."
      when 'failure'
        description = "#{context} failed."
    end

    {:context => context, :description => description, :target_url => @target_url}
  end

  #
  # Updates the status of the given context
  #
  def update_status(context, status)
    options = create_options(context, status)
    Octokit.create_status(@git_repository, @git_sha1, status, options)
  end

  #
  # Executes the given command and updates the GitHub Status API with the result
  #
  def execute_command_and_update_status!(command)

    command_executed_ok = Kernel.system(command)
    status = command_executed_ok ? 'success' : 'failure'
    update_status(@context, status)

    unless command_executed_ok
      raise StandardError.new("Execution of command '#{command}' failed.")
    end
  end

end

#
# Gets a value from the environment. Can be configured to optionally raise an exception if this
# value is not set
#
def get_env_value(key, fail_if_not_present)
  value = ENV[key]
  if (value.nil? || value.empty?) && fail_if_not_present
    raise StandardError.new("Required environment variable '#{key}' is not set. Aborting execution.")
  end
  value
end

#
# Optionally initialises all GitHub statuses if the environment variable has been set
#
def initialise_github_statuses(execution_wrapper, contexts_to_initialise)
  unless contexts_to_initialise.nil? || contexts_to_initialise.empty?
    execution_wrapper.initialise_contexts(contexts_to_initialise.split(','))
  end
end

#
# Executes the command and wraps progress in the Github status API.
#
def execute_command(execution_wrapper, command=[])
  command_to_execute = command.join(' ')
  execution_wrapper.execute_command_and_update_status!(command_to_execute)
end


if $0 == __FILE__

  github_status_api_token = get_env_value('github_status_api_token', true)
  github_status_repo = get_env_value('github_status_repo', true)
  github_status_target_url = get_env_value('github_status_target_url', true)
  github_status_context = get_env_value('github_status_context', true)
  github_status_sha1 = get_env_value('github_status_sha1', true)
  github_status_initialise = get_env_value('github_status_initialise', false)

  Octokit.configure do |c|
    c.access_token = github_status_api_token
    c.connection_options[:ssl] = { :verify => false }
  end

  execution_wrapper = ExecWithGitHubStatusWrapper.new(github_status_repo, github_status_sha1, github_status_context, github_status_target_url)
  initialise_github_statuses(execution_wrapper, github_status_initialise)
  execute_command(execution_wrapper, ARGV)
end