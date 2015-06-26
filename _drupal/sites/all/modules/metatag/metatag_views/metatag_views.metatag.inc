<?php
/**
 * @file
 * Meta tag integration for the metatag_views module.
 */

/**
 * Implements hook_metatag_config_instance_info().
 */
function metatag_views_metatag_config_instance_info() {
  $info['view'] = array('label' => t('Views'));
  return $info;
}

/**
 * Implements hook_metatag_config_default().
 */
function metatag_views_metatag_config_default() {
  $configs = array();

  $config = new stdClass();
  $config->instance = 'view';
  $config->api_version = 1;
  $config->disabled = FALSE;
  $config->config = array(
    'title' => array('value' => '[view:title] | [site:name]'),
    'description' => array('value' => '[view:description]'),
    'canonical' => array('value' => '[view:url]'),
  );
  $configs[$config->instance] = $config;

  return $configs;
}
