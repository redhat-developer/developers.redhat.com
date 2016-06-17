<?php
use Symfony\Component\Yaml\Yaml;

if (file_exists(__DIR__ . '/rhd.settings.yml')) {
  $yml_settings = Yaml::parse(file_get_contents(__DIR__ . "/rhd.settings.yml")); 
  $config['redhat_developers'] = $yml_settings;
}

