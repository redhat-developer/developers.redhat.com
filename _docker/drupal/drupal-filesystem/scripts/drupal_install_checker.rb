require 'open3'
require 'fileutils'
require 'yaml'

class ProcessExecutor
  def exec!(cmd, args = [])
    puts "DEBUG - executing command #{cmd} #{args}"
    out, status = Open3.capture2e(cmd, *args)
    puts "DEBUG - execution of command '#{cmd} #{args}' has failed with status code='#{status.exitstatus}'" if status.exitstatus != 0
    raise out if status.exitstatus != 0
    out
  end
end

class DrupalInstallChecker
  attr_reader :drupal_site, :process_executor

  def initialize(drupal_site, process_executor = ProcessExecutor.new, opts)
    @drupal_site = drupal_site
    @process_executor = process_executor
    @opts = opts
  end

  def prepare_drupal_for_boot

    wait_for_database_to_boot
    check_all_required_drupal_configuration

    drush_cache_rebuild
    drush_updb
    lightning_update
    drush_config_import
  end

  private

  def ensure_file_exists(file_name)
    expected_file = File.join(@drupal_site, file_name)
    puts "Checking for presence of required Drupal configuration file '#{expected_file}'..."

    raise StandardError "Required Drupal configuration file '#{expected_file}' is missing. Aborting Drupal boot process." unless File.exists?(expected_file)

    puts "\tFound Drupal configuration file '#{expected_file}.'"
  end

  def settings_exists
    ensure_file_exists('settings.php')
  end

  def rhd_settings_exists
    ensure_file_exists('rhd.settings.php')
  end

  def wait_for_database_to_boot
    sleep (5) until database_connect?
  end

  def database_connect?

    puts "Checking connectivity to database '#{@opts['database']['host']}:#{@opts['database']['port']}'..."

    begin
      process_executor.exec! 'mysql', ["--host=#{@opts['database']['host']}",
      "--port=#{@opts['database']['port']}",
      "--user=#{@opts['database']['username']}",
      "--password=#{@opts['database']['password']}",
      '--connect-timeout=20',
      "#{@opts['database']['name']}"]

      puts "\tSuccessful connection to database '#{@opts['database']['host']}:#{@opts['database']['port']}'."
      true
    rescue => e
      puts "Failed to make connection to database '#{@opts['database']['host']}:#{@opts['database']['port']}', reason: #{e.message}"
      false
    end
  end

  def database_tables_exists
    required_tables = %w(lightning_node lightning_node__body lightning_taxonomy_index)
    puts "Checking for required database tables '#{required_tables}' in Drupal database..."

    tables_in_db = process_executor.exec!('mysql', ["--host=#{@opts['database']['host']}",
                                                    "--port=#{@opts['database']['port']}",
                                                    "--user=#{@opts['database']['username']}",
                                                    "--password=#{@opts['database']['password']}",
                                                    '--execute=show tables', "#{@opts['database']['name']}"])

    tables_in_db.split("\n").each do | existing_table |
      required_tables.delete_if do | required_table |
        required_table == existing_table.chomp
      end
    end

    raise StandardError, "Not all required database tables are present. The missing tables are '#{required_tables}'. Aborting boot." unless required_tables.empty?
    puts "\tAll required database tables are present."

  end

  def check_all_required_drupal_configuration
    settings_exists
    rhd_settings_exists
    database_tables_exists
  end

  def drush_cache_rebuild
    process_executor.exec!('/var/www/drupal/vendor/bin/drush', %w(--root=/var/www/drupal/web cr))
  end

  def drush_updb
    puts 'Executing drush updb...'
    process_executor.exec!('/var/www/drupal/vendor/bin/drush', %w(-y --root=/var/www/drupal/web --entity-updates updb))
    drush_cache_rebuild
  end

  def lightning_update
    puts 'Executing drush update:lightning...'
    process_executor.exec!('/var/www/drupal/vendor/bin/drush', %w(--root=/var/www/drupal/web update:lightning --no-interaction))
    drush_cache_rebuild
  end

  def drush_config_import
    puts 'Importing latest Drupal configuration...'
    process_executor.exec!('/var/www/drupal/vendor/bin/drush', %w(--root=/var/www/drupal/web -y cim))
    drush_cache_rebuild
  end

end

if $0 == __FILE__
  drupal_site_dir = '/var/www/drupal/web/sites/default'
  opts = YAML.load_file(File.join(drupal_site_dir, 'rhd.settings.yml'))
  checker = DrupalInstallChecker.new(drupal_site_dir, ProcessExecutor.new, opts)
  checker.prepare_drupal_for_boot
end
