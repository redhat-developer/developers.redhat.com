require 'open3'
require 'fileutils'

class ProcessExecutor
  def exec!(cmd, args = [])
    out, status = Open3.capture2e(cmd, *args)
    raise out if status.exitstatus != 0
    out
  end
end

class DrupalInstallChecker
  attr_reader :drupal_site, :process_executor

  def initialize(drupal_site, process_executor = ProcessExecutor.new)
    @drupal_site = drupal_site
    @process_executor = process_executor
  end

  def settings_exists?
    File.exists? File.join drupal_site, 'settings.php'
  end

  def rhd_settings_exists?
    File.exists? File.join drupal_site, 'rhd.settings.php'
  end

  def mysql_connect?
    begin
      process_executor.exec! 'mysql','drupal'
      true
    rescue => e
      puts "ERROR: #{e.message}"
      false
    end
  end

  def tables_exists?
    begin
      tables_to_check = %w(node comment node__body taxonomy_index)
      tables = process_executor.exec!('mysql', ['--execute=show tables', 'drupal']).split("\n")[1..-1]
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
    puts 'Creating new settings.php file'
    FileUtils.rm '/var/www/drupal/web/sites/default/settings.php'
    FileUtils.cp '/var/www/drupal/web/sites/default/default.settings.php','/var/www/drupal/web/sites/default/settings.php'
    puts 'Installing Drupal, please wait...'
    puts process_executor.exec!('/var/www/drupal/vendor/bin/drupal', ['site:install', 'standard', '--langcode=en', '--db-type=mysql', '--db-host=drupalmysql', '--db-name=drupal', "--db-user=#{ENV['DB_USER']}", "--db-pass=#{ENV['DB_PASSWORD']}", '--account-name=admin', "--site-name='Red Hat Developers'", "--site-mail='test@example.com'", "--account-mail='admin@example.com'", '--account-pass=admin', '-n'])
    puts 'Installing Drupal theme...'
    puts process_executor.exec!('/var/www/drupal/vendor/bin/drupal', %w(theme:install --set-default rhd))
    puts 'Installing Drupal modules...'
    puts process_executor.exec!('/var/www/drupal/vendor/bin/drupal', %w(module:install serialization basic_auth basewidget rest layoutmanager hal redhat_developers syslog --latest))
  end

end

if $0 == __FILE__
  checker = DrupalInstallChecker.new('/var/www/drupal/web/sites/default')
  checker.install_drupal unless checker.installed?
end
