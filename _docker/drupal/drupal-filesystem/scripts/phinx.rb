require 'yaml'

#
# Small wrapper around the phinx command line executable that loads and binds the correct
# environment variables for database authentication before running the command.
#
# @author rblake@redhat.com
#
class Phinx

  attr_accessor :drupal_config_file

  def initialize
    @drupal_config_file = '/var/www/drupal/web/sites/default/rhd.settings.yml'
  end

  #
  # Runs the given Phinx command, first binding the database credentials into the environment
  #
  def run_phinx_command(command)
   load_and_bind_configuration
   puts "Running Phinx database schema migration against database '#{ENV['PHINX_DB_HOST']}/#{ENV['PHINX_DB_NAME']}'..."
   executed = Kernel.system("phinx #{command} -e automated")
   puts "Phinx database schema migration has #{executed ? 'completed successfully' : 'failed'}."
   Kernel.exit(executed ? 0 : 1)
  end

  private

  #
  # Reads the rhd.settings.yml file and binds the database credentials as Phinx environment variables
  #
  def load_and_bind_configuration
   config = YAML.load_file(@drupal_config_file)
   ENV['PHINX_DB_HOST'] = config['database']['host']
   ENV['PHINX_DB_NAME'] = config['database']['name']
   ENV['PHINX_DB_USER'] = config['database']['username']
   ENV['PHINX_DB_PASSWORD'] = config['database']['password']
  end

end

if $PROGRAM_NAME == __FILE__
  command = ARGV[0]
  Phinx.new.run_phinx_command(command)
end