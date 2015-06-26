<?php
/**
 * @file
 * Metatag integration for the metatag_panels module.
 */

/**
 * Implements hook_metatag_config_instance_info().
 */
function metatag_panels_metatag_config_instance_info() {
  $info['panels'] = array('label' => t('Panels'));
  return $info;
}
