require 'open3'
require 'fileutils'
require 'yaml'

class ProcessExecutor
  def exec!(cmd, args = [])
    puts "DEBUG - executing command #{cmd} #{args}"
    out, status = Open3.capture2e(cmd, *args)
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

  def settings_exists?
    File.exists? File.join drupal_site, 'settings.php'
  end

  def rhd_settings_exists?
    File.exists? File.join drupal_site, 'rhd.settings.php'
  end

  def mysql_connect?
    begin
      process_executor.exec! 'mysql', ["--host=#{@opts['database']['host']}",
                                       "--port=#{@opts['database']['port']}",
                                       "--user=#{@opts['database']['username']}",
                                       "--password=#{@opts['database']['password']}",
                                       '--connect-timeout=20',
                                       "#{@opts['database']['name']}"]
      true
    rescue => e
      puts "ERROR: #{e.message}"
      false
    end
  end

  def tables_exists?
    begin
      tables_to_check = %w(node comment node__body taxonomy_index)
      tables = process_executor.exec!('mysql', ["--host=#{@opts['database']['host']}",
                                                "--port=#{@opts['database']['port']}",
                                                "--user=#{@opts['database']['username']}",
                                                "--password=#{@opts['database']['password']}",
                                                '--execute=show tables', "#{@opts['database']['name']}"]).split("\n")[1..-1]
      return false if tables.nil? || tables.empty?
      (tables_to_check.uniq.sort - tables.uniq.sort).empty?
    rescue => e
      puts "ERROR: #{e.message}"
      false
    end
  end

  def installed?
    settings_exists? && rhd_settings_exists? && mysql_connect? && tables_exists?
  end

  def install_drupal
    puts 'Running composer install'
    if @opts['environment'] == 'dev'
      process_executor.exec!('/usr/local/bin/composer', %w(install -n))
    else
      process_executor.exec!('/usr/local/bin/composer', %w(install -n --no-dev --optimize-autoloader))
    end

    puts 'Creating new settings.php file'
    FileUtils.rm File.join("#{@drupal_site}", 'settings.php') if File.exists? File.join("#{@drupal_site}", 'settings.php')
    FileUtils.cp File.join("#{@drupal_site}", 'default.settings.php'), File.join("#{@drupal_site}", 'settings.php')

    puts 'Installing Drupal, please wait...'
    process_executor.exec!('/var/www/drupal/vendor/bin/drupal',
                           ['--root=web', 'site:install', 'standard', '--langcode=en', '--db-type=mysql',
                            "--db-host=#{@opts['database']['host']}", "--db-name=#{@opts['database']['name']}",
                            "--db-user=#{@opts['database']['username']}", "--db-port=#{@opts['database']['port']}",
                            "--db-pass=#{@opts['database']['password']}", '--account-name=admin',
                            "--site-name='Red Hat Developers'", "--site-mail='test@example.com'",
                            "--account-mail='admin@example.com'", '--account-pass=admin', '-n'])

    puts 'Installing Drupal theme...'
    process_executor.exec!('/var/www/drupal/vendor/bin/drupal', %w(--root=web theme:install --set-default rhd))

    puts 'Installing Drupal modules...'
    module_install_args = ['--root=web', 'module:install', 'serialization', 'basic_auth', 'basewidget', 'rest',
                           'layoutmanager', 'hal', 'redhat_developers', 'syslog', 'diff', 'entity',
                           'entity_storage_migrate', 'key_value', 'multiversion', 'token', 'metatag',
                           'metatag_google_plus', 'metatag_open_graph', 'metatag_twitter_cards',
                           'metatag_verification', 'admin_toolbar', 'admin_toolbar_tools']

    if @opts['environment'] == 'dev'
      module_install_args.push(*%w(devel kint))
    end
    process_executor.exec!('/var/www/drupal/vendor/bin/drupal', module_install_args)
  end

end

if $0 == __FILE__
  drupal_site_dir = '/var/www/drupal/web/sites/default'
  opts = YAML.load_file(File.join(drupal_site_dir, 'rhd.settings.yml'))
  checker = DrupalInstallChecker.new(drupal_site_dir, ProcessExecutor.new, opts)

  mysql_up = false
  until mysql_up
    puts 'Waiting for mysql to boot up...'
    mysql_up = checker.mysql_connect?
  end

  checker.install_drupal unless checker.installed?
end
