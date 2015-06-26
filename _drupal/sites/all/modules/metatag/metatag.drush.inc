<?php
/**
 * @file
 * Drush integration for Metatag.
 */

/**
 * Implements hook_drush_cache_clear().
 */
function metatag_drush_cache_clear(&$types) {
  if (function_exists('module_exists') && module_exists('metatag')) {
    $types['metatag'] = 'drush_metatag_cache_clear_token_info';
  }
}

/**
 * Clear caches internal to Metatag module.
 */
function drush_metatag_cache_clear_token_info() {
  metatag_config_cache_clear();
}
