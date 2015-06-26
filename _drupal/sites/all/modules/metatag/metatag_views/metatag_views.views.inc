<?php
/**
 * @file
 * Views integration for the metatag module.
 */

/**
 * Implements hook_views_plugins().
 */
function metatag_views_views_plugins() {
  $plugins = array();
  $plugins['display_extender']['metatags'] = array(
    'title' => t('Meta tags'),
    'help' => t('Provides meta tags for views.'),
    'handler' => 'metatag_views_plugin_display_extender_metatags',
    'enabled' => TRUE,
    'path' => drupal_get_path('module', 'metatag_views'),
  );

  return $plugins;
}
