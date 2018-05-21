require 'fileutils'
require_relative '../../../_docker/tests/test_helper'
require_relative '../../../_docker/drupal/drupal-filesystem/scripts/drupal_install_checker'

class DrupalInstallCheckerTest < Minitest::Test

  def setup
    @drupal_site = Dir.mktmpdir
    @process_exec = MiniTest::Mock.new
    @opts = yaml_opts_prod
    @install_checker = DrupalInstallChecker.new(@drupal_site, @process_exec, @opts)

    FileUtils.touch File.join @drupal_site, 'settings.php'
    FileUtils.touch File.join @drupal_site, 'rhd.settings.php'

  end

  def teardown
    FileUtils.remove_entry_secure @drupal_site
  end

  def test_should_fail_if_settings_php_missing

    @process_exec.expect :exec!, true, ['mysql', ["--host=#{@opts['database']['host']}",
                                                  "--port=#{@opts['database']['port']}",
                                                  "--user=#{@opts['database']['username']}",
                                                  "--password=#{@opts['database']['password']}",
                                                  '--connect-timeout=20', "#{@opts['database']['name']}"]]
    expected_file = File.join @drupal_site, 'settings.php'
    FileUtils.rm_rf expected_file

    assert_raises(StandardError, "Required Drupal configuration file '#{expected_file}' is missing. Aborting Drupal boot process.") {
      @install_checker.prepare_drupal_for_boot
    }

  end

  def test_should_fail_if_rhd_settings_missing
    @process_exec.expect :exec!, true, ['mysql', ["--host=#{@opts['database']['host']}",
                                                  "--port=#{@opts['database']['port']}",
                                                  "--user=#{@opts['database']['username']}",
                                                  "--password=#{@opts['database']['password']}",
                                                  '--connect-timeout=20', "#{@opts['database']['name']}"]]
    expected_file = File.join @drupal_site, 'rhd.settings.php'
    FileUtils.rm_rf expected_file

    assert_raises(StandardError, "Required Drupal configuration file '#{expected_file}' is missing. Aborting Drupal boot process.") {
      @install_checker.prepare_drupal_for_boot
    }

  end

  def test_should_fail_if_db_table_missing

    @process_exec.expect :exec!, true, ['mysql', ["--host=#{@opts['database']['host']}",
                                                  "--port=#{@opts['database']['port']}",
                                                  "--user=#{@opts['database']['username']}",
                                                  "--password=#{@opts['database']['password']}",
                                                  '--connect-timeout=20', "#{@opts['database']['name']}"]]

    found_db_tables = "Tables_in_drupal\nlightning_node\nlightning_taxonomy_index"
    @process_exec.expect :exec!, found_db_tables, ['mysql', ["--host=#{@opts['database']['host']}",
                                                              "--port=#{@opts['database']['port']}",
                                                              "--user=#{@opts['database']['username']}",
                                                              "--password=#{@opts['database']['password']}",
                                                              '--execute=show tables', "#{@opts['database']['name']}"]]

    assert_raises(StandardError, "Not all required database tables are present. The missing tables are '[\"lightning_node__body\"]'. Aborting boot.") {
      @install_checker.prepare_drupal_for_boot
    }
  end

  def test_should_fully_prepare_drupal_for_boot
    @process_exec.expect :exec!, true, ['mysql', ["--host=#{@opts['database']['host']}",
                                                  "--port=#{@opts['database']['port']}",
                                                  "--user=#{@opts['database']['username']}",
                                                  "--password=#{@opts['database']['password']}",
                                                  '--connect-timeout=20', "#{@opts['database']['name']}"]]

    found_db_tables = "Tables_in_drupal\nlightning_node\nlightning_node__body\nlightning_taxonomy_index"

    @process_exec.expect :exec!, found_db_tables, ['mysql', ["--host=#{@opts['database']['host']}",
                                                             "--port=#{@opts['database']['port']}",
                                                             "--user=#{@opts['database']['username']}",
                                                             "--password=#{@opts['database']['password']}",
                                                             '--execute=show tables', "#{@opts['database']['name']}"]]


    @process_exec.expect :exec!, true, ['/var/www/drupal/vendor/bin/drush', %w(--root=/var/www/drupal/web cr)]
    @process_exec.expect :exec!, true, ['/var/www/drupal/vendor/bin/drush', %w(--root=/var/www/drupal/web -y cim)]
    @process_exec.expect :exec!, true, ['/var/www/drupal/vendor/bin/drush', %w(--root=/var/www/drupal/web cr)]
    @process_exec.expect :exec!, true, ['/var/www/drupal/vendor/bin/drush', %w(-y --root=/var/www/drupal/web --entity-updates updb)]
    @process_exec.expect :exec!, true, ['/var/www/drupal/vendor/bin/drush', %w(--root=/var/www/drupal/web cr)]

    @install_checker.prepare_drupal_for_boot
  end

  def yaml_opts_prod
    opts = <<yml
environment: prod
database:
  host:  prod.example.com
  port: '3306'
  username: 'prod-testing'
  password: 'password'
  name: 'drupal-prod'
drupal:
  admin:
    name: 'joe'
    password: 'secret'
    mail: 'joe@example.com'
yml
    YAML.load opts
  end

  private :yaml_opts_prod
end
