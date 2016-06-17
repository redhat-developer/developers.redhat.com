require_relative 'rhd_environment'

#
# Class that loads the list of environments that are currently supported by
# the developers.redhat.com control scripts
#
# @author rblake@redhat.com
#
class RhdEnvironments

  def initialize(environments_directory, testing_directory)
    @environments_directory = environments_directory
    @testing_directory = testing_directory
  end

  #
  # Given the specified environment name, this will load the environment from the configured environments directory
  # @return the RhdEnvironment instance or nil of the environment doesn't exist or is not valid
  #
  def load_environment(environment_name)
    environment_name.strip!
    puts "Attempting to load details of environment '#{environment_name}' from environment directory '#{@environments_directory}'"
    environment = load_environments.select { | environment | environment.environment_name == environment_name && environment.is_valid_environment?}.first

    if !environment.nil?
      puts "Successfully loaded environment '#{environment.environment_name}' from directory '#{environment.environment_directory}'"
    else
      puts "Cannot load environment '#{environment_name}' from directory '#{@environments_directory}'"
    end

    environment
  end

  def load_environments

    candidate_directories = Dir.entries(@environments_directory).map do | file |

      full_directory_path = "#{File.expand_path(@environments_directory)}/#{file}"

      if File.directory?(full_directory_path) and !(full_directory_path.end_with?('..') or full_directory_path.end_with?('.'))
        full_directory_path
      else
        nil
      end
    end

    candidate_directories.compact.map do |directory|
      drupal_dir = File.join(directory, '..', '..', 'drupal', 'web', 'sites', 'default')
      RhdEnvironment.new(directory, @testing_directory, drupal_dir)
    end
  end

  private :load_environments

end