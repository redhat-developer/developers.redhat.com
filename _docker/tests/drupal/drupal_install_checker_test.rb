require 'fileutils'
require_relative '../../../_docker/tests/test_helper'
require_relative '../../../_docker/drupal/scripts/drupal_install_checker'

class DrupalInstallCheckerTest < Minitest::Test

  def setup
    @drupal_site = Dir.mktmpdir
    @process_exec = MiniTest::Mock.new
    @opts = yaml_opts_prod
    @install_checker = DrupalInstallChecker.new(@drupal_site, @process_exec, @opts)
  end

  def teardown
    FileUtils.remove_entry_secure @drupal_site
  end

  def test_settings_exists_when_true
    settings_file = File.join @drupal_site, 'settings.php'

    FileUtils.touch settings_file
    assert @install_checker.settings_exists?
  end

  def test_settings_exists_when_false
    refute @install_checker.settings_exists?
  end

  def test_rhd_settings_exists_when_true
    settings_file = File.join @drupal_site, 'rhd.settings.php'

    FileUtils.touch settings_file
    assert @install_checker.rhd_settings_exists?
  end

  def test_rhd_settings_exists_when_false
    refute @install_checker.rhd_settings_exists?
  end

  def test_mysql_connect_when_true

    @process_exec.expect :exec!, true, ['mysql', ["--host=#{@opts['database']['host']}",
                                                 "--port=#{@opts['database']['port']}",
                                                 "--user=#{@opts['database']['username']}",
                                                 "--password=#{@opts['database']['password']}",
                                                 '--connect-timeout=20', "#{@opts['database']['name']}"]]
    assert @install_checker.mysql_connect?
    assert @process_exec.verify
  end

  def test_mysql_connect_when_false
    @process_exec.expect(:exec!, false) do |db, args|
      raise 'Cannot connect to db'
    end

    assert_output("ERROR: Cannot connect to db\n", '') do
      refute @install_checker.mysql_connect?
      assert @process_exec.verify
    end
  end

  def test_tables_exists_when_true
    tables_to_expect = "Tables_in_drupal\nbatch\nblock_content\nblock_content__body\nblock_content_field_data\nblock_content_field_revision\nblock_content_revision\nblock_content_revision__body\ncache_bootstrap\ncache_config\ncache_container\ncache_data\ncache_default\ncache_discovery\ncache_dynamic_page_cache\ncache_entity\ncache_menu\ncache_render\ncache_rest\ncache_toolbar\ncachetags\ncomment\ncomment__comment_body\ncomment_entity_statistics\ncomment_field_data\nconfig\nfile_managed\nfile_usage\nflood\nhistory\nkey_value\nkey_value_expire\nmenu_link_content\nmenu_link_content_data\nmenu_tree\nnode\nnode__body\nnode__comment\nnode__field_blue_card_description\nnode__field_blue_card_links\nnode__field_blue_card_title\nnode__field_bottom_left_white_card\nnode__field_bottom_right_white_card\nnode__field_container_external_link\nnode__field_container_tags\nnode__field_containers_short_summary\nnode__field_description\nnode__field_green_card\nnode__field_grey_card\nnode__field_id\nnode__field_image\nnode__field_orange_card\nnode__field_solution_name\nnode__field_solution_tag_line\nnode__field_tags\nnode__field_top_left_white_card\nnode__field_top_right_white_card\nnode__field_topic_sub_title\nnode_access\nnode_field_data\nnode_field_revision\nnode_revision\nnode_revision__body\nnode_revision__comment\nnode_revision__field_blue_card_description\nnode_revision__field_blue_card_links\nnode_revision__field_blue_card_title\nnode_revision__field_bottom_left_white_card\nnode_revision__field_bottom_right_white_card\nnode_revision__field_container_external_link\nnode_revision__field_container_tags\nnode_revision__field_containers_short_summary\nnode_revision__field_description\nnode_revision__field_green_card\nnode_revision__field_grey_card\nnode_revision__field_id\nnode_revision__field_image\nnode_revision__field_orange_card\nnode_revision__field_solution_name\nnode_revision__field_solution_tag_line\nnode_revision__field_tags\nnode_revision__field_top_left_white_card\nnode_revision__field_top_right_white_card\nnode_revision__field_topic_sub_title\nqueue\nrouter\nsearch_dataset\nsearch_index\nsearch_total\nsemaphore\nsequences\nsessions\nshortcut\nshortcut_field_data\nshortcut_set_users\ntaxonomy_index\ntaxonomy_term_data\ntaxonomy_term_field_data\ntaxonomy_term_hierarchy\nurl_alias\nuser__roles\nuser__user_picture\nusers\nusers_data\nusers_field_data\nwatchdog\n"

    @process_exec.expect :exec!, tables_to_expect, ['mysql', ["--host=#{@opts['database']['host']}",
                                                             "--port=#{@opts['database']['port']}",
                                                             "--user=#{@opts['database']['username']}",
                                                             "--password=#{@opts['database']['password']}",
                                                             '--execute=show tables', "#{@opts['database']['name']}"]]
    assert @install_checker.tables_exists?
    assert @process_exec.verify
  end

  def test_tables_exists_when_false

    @process_exec.expect :exec!, '', ['mysql', ["--host=#{@opts['database']['host']}",
                                               "--port=#{@opts['database']['port']}",
                                               "--user=#{@opts['database']['username']}",
                                               "--password=#{@opts['database']['password']}",
                                               '--execute=show tables', "#{@opts['database']['name']}"]]
    refute @install_checker.tables_exists?
    assert @process_exec.verify
  end

  def test_installed_when_true

    tables_to_expect = "Tables_in_drupal\nbatch\nblock_content\nblock_content__body\nblock_content_field_data\nblock_content_field_revision\nblock_content_revision\nblock_content_revision__body\ncache_bootstrap\ncache_config\ncache_container\ncache_data\ncache_default\ncache_discovery\ncache_dynamic_page_cache\ncache_entity\ncache_menu\ncache_render\ncache_rest\ncache_toolbar\ncachetags\ncomment\ncomment__comment_body\ncomment_entity_statistics\ncomment_field_data\nconfig\nfile_managed\nfile_usage\nflood\nhistory\nkey_value\nkey_value_expire\nmenu_link_content\nmenu_link_content_data\nmenu_tree\nnode\nnode__body\nnode__comment\nnode__field_blue_card_description\nnode__field_blue_card_links\nnode__field_blue_card_title\nnode__field_bottom_left_white_card\nnode__field_bottom_right_white_card\nnode__field_container_external_link\nnode__field_container_tags\nnode__field_containers_short_summary\nnode__field_description\nnode__field_green_card\nnode__field_grey_card\nnode__field_id\nnode__field_image\nnode__field_orange_card\nnode__field_solution_name\nnode__field_solution_tag_line\nnode__field_tags\nnode__field_top_left_white_card\nnode__field_top_right_white_card\nnode__field_topic_sub_title\nnode_access\nnode_field_data\nnode_field_revision\nnode_revision\nnode_revision__body\nnode_revision__comment\nnode_revision__field_blue_card_description\nnode_revision__field_blue_card_links\nnode_revision__field_blue_card_title\nnode_revision__field_bottom_left_white_card\nnode_revision__field_bottom_right_white_card\nnode_revision__field_container_external_link\nnode_revision__field_container_tags\nnode_revision__field_containers_short_summary\nnode_revision__field_description\nnode_revision__field_green_card\nnode_revision__field_grey_card\nnode_revision__field_id\nnode_revision__field_image\nnode_revision__field_orange_card\nnode_revision__field_solution_name\nnode_revision__field_solution_tag_line\nnode_revision__field_tags\nnode_revision__field_top_left_white_card\nnode_revision__field_top_right_white_card\nnode_revision__field_topic_sub_title\nqueue\nrouter\nsearch_dataset\nsearch_index\nsearch_total\nsemaphore\nsequences\nsessions\nshortcut\nshortcut_field_data\nshortcut_set_users\ntaxonomy_index\ntaxonomy_term_data\ntaxonomy_term_field_data\ntaxonomy_term_hierarchy\nurl_alias\nuser__roles\nuser__user_picture\nusers\nusers_data\nusers_field_data\nwatchdog\n"
    @process_exec.expect :exec!, true, ['mysql', ["--host=#{@opts['database']['host']}",
                                                 "--port=#{@opts['database']['port']}",
                                                 "--user=#{@opts['database']['username']}",
                                                 "--password=#{@opts['database']['password']}",
                                                 '--connect-timeout=20', "#{@opts['database']['name']}"]]
    @process_exec.expect :exec!, tables_to_expect, ['mysql', ["--host=#{@opts['database']['host']}",
                                                   "--port=#{@opts['database']['port']}",
                                                   "--user=#{@opts['database']['username']}",
                                                   "--password=#{@opts['database']['password']}",
                                                   '--execute=show tables', "#{@opts['database']['name']}"]]

    settings_file = File.join @drupal_site, 'settings.php'
    rhd_settings_file = File.join @drupal_site, 'rhd.settings.php'

    FileUtils.touch settings_file
    FileUtils.touch rhd_settings_file

    assert @install_checker.installed?
    assert @process_exec.verify

  end

  def test_set_cron_key
    @process_exec.expect(:exec!, nil,['/var/www/drupal/vendor/bin/drupal',%w(--root=web state:override system.cron_key rhd)])
    @install_checker.set_cron_key
  end

  def test_install_theme
    @process_exec.expect(:exec!, nil,['/var/www/drupal/vendor/bin/drupal',%w(--root=web theme:install --set-default rhd)])
    @install_checker.install_theme
  end

  def test_install_modules_for_dev

    opts = yaml_opts_dev
    install_checker = DrupalInstallChecker.new(@drupal_site, @process_exec, opts)

    @process_exec.expect :exec!, nil, ['/var/www/drupal/vendor/bin/drupal', ['--root=web', 'module:install',
                                                                             'serialization', 'basic_auth',
                                                                             'basewidget', 'rest', 'layoutmanager',
                                                                             'hal', 'redhat_developers', 'syslog',
                                                                             'diff', 'entity',
                                                                             'entity_storage_migrate', 'key_value',
                                                                             'multiversion', 'token', 'metatag',
                                                                             'metatag_google_plus',
                                                                             'metatag_open_graph',
                                                                             'metatag_twitter_cards',
                                                                             'metatag_verification', 'admin_toolbar',
                                                                             'admin_toolbar_tools','simple_sitemap', 'devel', 'kint']]


    install_checker.install_modules
  end

  def test_install_modules_for_prod
    @process_exec.expect :exec!, nil, ['/var/www/drupal/vendor/bin/drupal', ['--root=web', 'module:install',
                                                                            'serialization', 'basic_auth',
                                                                            'basewidget', 'rest', 'layoutmanager',
                                                                            'hal', 'redhat_developers', 'syslog',
                                                                            'diff', 'entity',
                                                                            'entity_storage_migrate', 'key_value',
                                                                            'multiversion', 'token', 'metatag',
                                                                            'metatag_google_plus',
                                                                            'metatag_open_graph',
                                                                            'metatag_twitter_cards',
                                                                            'metatag_verification', 'admin_toolbar',
                                                                            'admin_toolbar_tools','simple_sitemap']]

    @install_checker.install_modules
  end

  def test_install_module_configuration
    @process_exec.expect(:exec!, nil,['/var/www/drupal/vendor/bin/drupal',%w(--root=web config:import:single simple_sitemap.settings /var/www/drupal/config/simple_sitemap.settings)])
    @install_checker.install_module_configuration
  end

  def test_installing_for_dev

      opts = yaml_opts_dev
      install_checker = DrupalInstallChecker.new(@drupal_site, @process_exec, opts)

      @process_exec.expect :exec!, nil, ['/var/www/drupal/vendor/bin/drupal',
                                        ['--root=web', 'site:install', 'standard', '--langcode=en', '--db-type=mysql',
                                         "--db-host=#{opts['database']['host']}", "--db-name=#{opts['database']['name']}",
                                         "--db-user=#{opts['database']['username']}", "--db-port=#{opts['database']['port']}",
                                         "--db-pass=#{opts['database']['password']}", '--account-name=admin',
                                         "--site-name='Red Hat Developers'", "--site-mail='test@example.com'",
                                         "--account-mail='admin@example.com'", '--account-pass=admin', '-n']]
      install_checker.install_drupal
  end

  def test_installing_for_prod
      @process_exec.expect :exec!, nil, ['/var/www/drupal/vendor/bin/drupal',
                                        ['--root=web','site:install', 'standard', '--langcode=en', '--db-type=mysql',
                                         "--db-host=#{@opts['database']['host']}", "--db-name=#{@opts['database']['name']}",
                                         "--db-user=#{@opts['database']['username']}", "--db-port=#{@opts['database']['port']}",
                                         "--db-pass=#{@opts['database']['password']}", '--account-name=admin',
                                         "--site-name='Red Hat Developers'", "--site-mail='test@example.com'",
                                         "--account-mail='admin@example.com'", '--account-pass=admin', '-n']]

      @install_checker.install_drupal
  end

  def test_update_db
    @process_exec.expect :exec!, nil, ['/var/www/drupal/vendor/bin/drush',
                                       %w(--root=web --entity-updates updb)]
    @process_exec.expect :exec!, nil, ['/var/www/drupal/vendor/bin/drupal',
                                       %w(--root=web cache:rebuild all)]

    @install_checker.update_db
    @process_exec.verify
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
yml
    YAML.load opts
  end

  def yaml_opts_dev
    opts = <<yml
environment: dev
database:
  host:  dev.example.com
  port: '3306'
  username: 'test'
  password: 'password'
  name: 'drupal-dev'
yml
    YAML.load opts
  end

  private :yaml_opts_prod, :yaml_opts_dev
end
