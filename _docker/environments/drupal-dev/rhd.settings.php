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

