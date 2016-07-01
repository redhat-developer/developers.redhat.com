<?php
use Symfony\Component\Yaml\Yaml;

$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

$settings['extension_discovery_scan_tests'] = TRUE;

if (file_exists(__DIR__ . '/rhd.settings.yml')) {
  $yml_settings = Yaml::parse(file_get_contents(__DIR__ . "/rhd.settings.yml"));
  $config['redhat_developers'] = $yml_settings;
}

$settings['hash_salt'] = 'xuAWpK0fmrZ6UGofFcP3lBkcmdpdumWMLqvCbnYjFY85OgRXYvEKPItJDH66vs4UpeYORQXLHQ';
$settings['install_profile'] = 'standard';
$config_directories['sync'] = 'sites/default/files/config_BbPlfGDu86LJqlRwhA9RbCf38VZMDijNF-owvfhuzVL73hk7BtWwy3kfIlqKLXeiSgTA-MHeVw/sync';

