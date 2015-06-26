<?php
/**
 * @file
 * awestruct_push.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function awestruct_push_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "services" && $api == "services") {
    return array("version" => "3");
  }
}

/**
 * Implements hook_views_api().
 */
function awestruct_push_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function awestruct_push_node_info() {
  $items = array(
    'awestruct_page' => array(
      'name' => t('awestruct-page'),
      'base' => 'node_content',
      'description' => t('Page from Awestruct'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
