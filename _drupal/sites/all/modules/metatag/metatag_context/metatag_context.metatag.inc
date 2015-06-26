<?php
/**
 * @file
 * Metatag integration for the metatag_context module.
 */

/**
 * Implements hook_metatag_config_instance_info().
 */
function metatag_context_metatag_config_instance_info() {
  $info['context'] = array('label' => t('Context'));
  return $info;
}
