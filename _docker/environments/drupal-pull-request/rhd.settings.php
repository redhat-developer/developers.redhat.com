<?php
use Symfony\Component\Yaml\Yaml;

if (file_exists(__DIR__ . '/rhd.settings.yml')) {
  $yml_settings = Yaml::parse(file_get_contents(__DIR__ . "/rhd.settings.yml")); 
  $config['redhat_developers'] = $yml_settings;
}

$config['automated_cron.settings']['interval'] = 0;
$settings['hash_salt'] = 'xuAWpK0fmrZ6UGofFcP3lBkcmdpdumWMLqvCbnYjFY85OgRXYvEKPItJDH66vs4UpeYORQXLHQ';
$config_directories['sync'] = 'sites/default/files/config_BbPlfGDu86LJqlRwhA9RbCf38VZMDijNF-owvfhuzVL73hk7BtWwy3kfIlqKLXeiSgTA-MHeVw/sync';

$databases['default']['default'] = array (
  'database' => 'rhd_mysql',
  'username' => 'drupal',
  'password' => 'drupal',
  'prefix' => 'lightning_',
  'host' => 'drupalmysql',
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);

/* Increase default memory settings for Drupal to 256 meg. Taken from: https://www.drupal.org/docs/7/managing-site-performance-and-scalability/changing-php-memory-limits */
ini_set('memory_limit', '256M');

// Get the specific config object, as an array, that we will use to set the
// OpenID Config object.
$content_editor_sso_config = $config["redhat_developers"]["keycloak"]["content_editor_sso"];

// Ensure that all of the necessary SSO config is available.
if ((isset($content_editor_sso_config["redirect_url"]) && !empty($content_editor_sso_config["redirect_url"]))
    && (isset($content_editor_sso_config["client_id"]) && !empty($content_editor_sso_config["client_id"]))
    && (isset($content_editor_sso_config["client_secret"]) && !empty($content_editor_sso_config["client_secret"]))
    && (isset($content_editor_sso_config["keycloak_base"]) && !empty($content_editor_sso_config["keycloak_base"]))
    && (isset($content_editor_sso_config["keycloak_realm"]) && !empty($content_editor_sso_config["keycloak_realm"]))
    && (isset($content_editor_sso_config["authorization_endpoint_kc"]) && !empty($content_editor_sso_config["authorization_endpoint_kc"]))
    && (isset($content_editor_sso_config["token_endpoint_kc"]) && !empty($content_editor_sso_config["token_endpoint_kc"]))
    && (isset($content_editor_sso_config["userinfo_endpoint_kc"]) && !empty($content_editor_sso_config["userinfo_endpoint_kc"]))) {

    // Set the OpenID config object using data from our redhat_developers config.
    $config["openid_connect.settings.keycloak"]["settings"]["redirect_url"] = $content_editor_sso_config["redirect_url"];
    $config["openid_connect.settings.keycloak"]["settings"]["client_id"] = $content_editor_sso_config["client_id"];
    $config["openid_connect.settings.keycloak"]["settings"]["client_secret"] = $content_editor_sso_config["client_secret"];
    $config["openid_connect.settings.keycloak"]["settings"]["keycloak_base"] = $content_editor_sso_config["keycloak_base"];
    $config["openid_connect.settings.keycloak"]["settings"]["keycloak_realm"] = $content_editor_sso_config["keycloak_realm"];
    $config["openid_connect.settings.keycloak"]["settings"]["authorization_endpoint_kc"] = $content_editor_sso_config["authorization_endpoint_kc"];
    $config["openid_connect.settings.keycloak"]["settings"]["token_endpoint_kc"] = $content_editor_sso_config["token_endpoint_kc"];
    $config["openid_connect.settings.keycloak"]["settings"]["userinfo_endpoint_kc"] = $content_editor_sso_config["userinfo_endpoint_kc"];
}
else {
    // The array keys of the SSO config variables.
    $sso_array_keys = [
        'redirect_url',
        'client_id',
        'client_secret',
        'keycloak_base',
        'keycloak_realm',
        'authorization_endpoint_kc',
        'token_endpoint_kc',
        'userinfo_endpoint_kc'
    ];
    // Will hold a list of the SSO config variables keys had no value (or an empty value).
    $unset_array_keys = [];

    foreach ($sso_array_keys as $key) {
        if (!isset($content_editor_sso_config[$key]) || empty($content_editor_sso_config[$key])) {
            $unset_array_keys[] = $key;
        }
    }

    // Log a notice that denotes any unset, but required, SSO config variable(s).
    \Drupal::logger('content_editor_sso')->error(
        'Skipping SSO configuration as the following required variables are not set: @unset_variables.', [
            '@unset_variables' => implode(', ', $unset_array_keys)
        ]
    );
}

#
# Set the Akamai network that purge requests should go to
#
$config['akamai.settings']['domain']['production'] = false;
$config['akamai.settings']['domain']['staging'] = true;