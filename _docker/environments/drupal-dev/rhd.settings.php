<?php

use Symfony\Component\Yaml\Yaml;

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

$settings['twig_debug'] = TRUE;
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$config['automated_cron.settings']['interval'] = 0;

$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

$settings['extension_discovery_scan_tests'] = TRUE;

if (file_exists(__DIR__ . '/rhd.settings.yml')) {
  $yml_settings = Yaml::parse(file_get_contents(__DIR__ . "/rhd.settings.yml"));
  $config['redhat_developers'] = $yml_settings;
}

$databases['default']['default'] = array (
  'database' => 'rhd_mysql',
  'username' => 'drupal',
  'password' => 'drupal',
  'prefix' => 'lightning_',
  'host' => 'docker',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);

$settings['hash_salt'] = 'xuAWpK0fmrZ6UGofFcP3lBkcmdpdumWMLqvCbnYjFY85OgRXYvEKPItJDH66vs4UpeYORQXLHQ';
$config_directories['sync'] = 'config/sync';
$settings['install_profile'] = 'lightning';

/* Increase default memory settings for Drupal to 256 meg. Taken from: https://www.drupal.org/docs/7/managing-site-performance-and-scalability/changing-php-memory-limits */
ini_set('memory_limit', '256M');

// Get the specific config object, as an array, that we will use to set the
// OpenID Config object.
$content_editor_sso_config = $config["redhat_developers"]["keycloak"]["content_editor_sso"];

// Set the OpenID config object using data from our redhat_developers config.
$config["openid_connect"]["settings"]["keycloak"]["settings"]["redirect_url"] = $content_editor_sso_config["redirect_url"];
$config["openid_connect"]["settings"]["keycloak"]["settings"]["client_id"] = $content_editor_sso_config["client_id"];
$config["openid_connect"]["settings"]["keycloak"]["settings"]["client_secret"] = $content_editor_sso_config["client_secret"];
$config["openid_connect"]["settings"]["keycloak"]["settings"]["keycloak_base"] = $content_editor_sso_config["keycloak_base"];
$config["openid_connect"]["settings"]["keycloak"]["settings"]["keycloak_realm"] = $content_editor_sso_config["keycloak_realm"];
$config["openid_connect"]["settings"]["keycloak"]["settings"]["authorization_endpoint_kc"] = $content_editor_sso_config["authorization_endpoint_kc"];
$config["openid_connect"]["settings"]["keycloak"]["settings"]["token_endpoint_kc"] = $content_editor_sso_config["token_endpoint_kc"];
$config["openid_connect"]["settings"]["keycloak"]["settings"]["userinfo_endpoint_kc"] = $content_editor_sso_config["userinfo_endpoint_kc"];
