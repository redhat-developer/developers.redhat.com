<?php


/**
    Setup environment specific host and service configuration. This configuration used to live in rhd.settings.yml, but
    has now been moved into here directly to avoid having to parse YAML on a per-request basis. We still need to determine
    if all of this configuration is actually still needed.
 */

$config['redhat_developers']['environment'] = 'dev';
$config['redhat_developers']['broker'] = 'https://broker.staging.redhat.com/partner/drc/userMapping?redirect=';
$config['redhat_developers']['sentry_track'] = false;
$config['redhat_developers']['sentry_script'] = 'https://cdn.ravenjs.com/3.24.0/raven.min.js';
$config['redhat_developers']['sentry_code'] = 'https://cc00364690f241ffb2fcb39254d7f23f@sentry.io/115436';
$config['redhat_developers']['rhd_base_url'] = 'docker';
$config['redhat_developers']['rhd_final_base_url'] = 'docker';
$config['redhat_developers']['downloadManager']['baseUrl'] = 'https://developers.stage.redhat.com';
$config['redhat_developers']['downloadManager']['fileBaseUrl'] = '//developers.stage.redhat.com/download-manager/file/';
$config['redhat_developers']['keycloak']['accountUrl'] = 'https://developers.stage.redhat.com/auth/realms/rhd/account/';
$config['redhat_developers']['keycloak']['authUrl'] = 'https://developers.stage.redhat.com/auth/';
$config['redhat_developers']['drupal']['host'] = 'http://docker';
$config['redhat_developers']['searchisko']['protocol'] = 'https';
$config['redhat_developers']['searchisko']['host'] = 'dcp.stage.jboss.org';
$config['redhat_developers']['searchisko']['port'] = '443';
$config['redhat_developers']['searchisko']['baseProtocolRelativeUrl'] = 'dcp.stage.jboss.org:443';

/**
    SSO Integration for Content Editor Authentication
 */
$config["openid_connect.settings.keycloak"]["settings"]["redirect_url"] = 'http://localhost/openid-connect/keycloak';
$config["openid_connect.settings.keycloak"]["settings"]["client_id"] = 'rhd-web-cms-localdev';
$config["openid_connect.settings.keycloak"]["settings"]["client_secret"] = 'not-a-secret';
$config["openid_connect.settings.keycloak"]["settings"]["keycloak_base"] = 'https://developers.stage.redhat.com/auth';
$config["openid_connect.settings.keycloak"]["settings"]["keycloak_realm"] = 'rhd';
$config["openid_connect.settings.keycloak"]["settings"]["authorization_endpoint_kc"] = 'https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/auth';
$config["openid_connect.settings.keycloak"]["settings"]["token_endpoint_kc"] = 'https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/token';
$config["openid_connect.settings.keycloak"]["settings"]["userinfo_endpoint_kc"] = 'https://developers.stage.redhat.com/auth/realms/rhd/protocol/openid-connect/userinfo';

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

$settings['twig_debug'] = TRUE;
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$config['automated_cron.settings']['interval'] = 0;

$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

$settings['extension_discovery_scan_tests'] = TRUE;

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

/* Increase default memory settings for Drupal to 256 meg. Taken from: https://www.drupal.org/docs/7/managing-site-performance-and-scalability/changing-php-memory-limits */
ini_set('memory_limit', '256M');

#
# Set the Akamai network that purge requests should go to
#
$config['akamai.settings']['domain']['production'] = false;
$config['akamai.settings']['domain']['staging'] = true;


# DEVELOPER-5877: Added disqus settings to support emails to content author on new comments
$config['rhd_disqus.disqussettings']['rhd_disqus_secret_key'] = '';
$config['rhd_disqus.disqussettings']['rhd_disqus_api_key'] = '';
$config['rhd_disqus.disqussettings']['rhd_disqus_shortname'] = 'red-hat-developers-localhost';
$config['rhd_disqus.disqussettings']['rhd_disqus_email_author_enabled'] = false;
$config['rhd_disqus.disqussettings']['rhd_disqus_email_author_debug'] = true;    