<?php
/**
 * @file
 * Internationalization (i18n) hooks.
 */

/**
 * Implements hook_i18n_string_info().
 */
function metatag_i18n_string_info() {
  $groups['metatag'] = array(
    'title' => t('Metatag'),
    'description' => t('Configurable metatags.'),
    'format' => FALSE,
    'list' => FALSE,
  );
  return $groups;
}
