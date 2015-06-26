<?php

/**
 * Implements hook_metatag_config_default().
 */
function metatag_test_metatag_config_default() {
  $configs = array();

  $config = new stdClass();
  $config->instance = 'test';
  $config->api_version = 1;
  $config->disabled = FALSE;
  $config->config = array(
    'description' => array('value' => 'Test description'),
  );
  $configs[$config->instance] = $config;

  $config = new stdClass();
  $config->instance = 'test:foo';
  $config->api_version = 1;
  $config->disabled = FALSE;
  $config->config = array(
    'description' => array('value' => 'Test foo description'),
    'abstract' => array('value' => 'Test foo abstract'),
    'title' => array('value' => 'Test title'),
    'test:foo' => array('value' => 'foobar'),
  );
  $configs[$config->instance] = $config;

  return $configs;
}

/**
 * Implements hook_metatag_config_default_alter().
 */
function metatag_test_metatag_config_default_alter(array &$configs) {
  if (isset($configs['test:foo'])) {
    $configs['test:foo']->config['title']['value'] = 'Test altered title';
  }
}

/**
 * Implements hook_metatag_info().
 */
function metatag_test_metatag_info() {
  $info['test:foo'] = array(
    'label' => t('Foo meta tag'),
    'description' => t('Testing metatag.'),
    'class' => 'DrupalTextMetaTag',
    'group' => t('Testing'),
  );

  return $info;
}
