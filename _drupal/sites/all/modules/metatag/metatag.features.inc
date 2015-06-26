<?php
/**
 * @file
 * Features integration for the Metatag module.
 */

/**
 * Implements hook_features_export().
 */
function metatag_features_export($data, &$export, $module_name = '', $type = 'metatag') {
  $pipe = array();

  foreach ($data as $name) {
    if (metatag_config_load($name)) {
      $export['features'][$type][$name] = $name;
    }
  }

  $export['dependencies']['metatag'] = 'metatag';

  return $pipe;
}

/**
 * Implements hook_features_export_render().
 */
function metatag_features_export_render($module_name, $data, $export = NULL) {
  $code = array();
  $code[] = '  $config = array();';
  $code[] = '';

  foreach ($data as $key => $name) {
    if (is_object($name)) {
      $name = $name->instance;
    }
    if ($config = metatag_config_load($name)) {
      $export = new stdClass();
      $export->instance = $config->instance;
      if (isset($config->disabled)) {
        $export->disabled = $config->disabled;
      }
      $export->config = $config->config;
      $export = features_var_export($export, '  ');
      $key = features_var_export($name);
      $code[] = "  // Exported Metatag config instance: {$name}.";
      $code[] = "  \$config[{$key}] = {$export};";
      $code[] = "";
    }
  }
  $code[] = '  return $config;';
  $code = implode("\n", $code);
  return array('metatag_export_default' => $code);
}

/**
 * Implements hook_features_revert().
 */
function metatag_features_revert($module) {
  if ($feature_conf = features_get_default('metatag', $module)) {
    foreach (array_keys($feature_conf) as $config) {
      if ($conf = metatag_config_load($config)) {
        db_delete('metatag_config')->condition('instance', $config)->execute();
      }
      unset($feature_conf[$config]['cid']);
      $object = new stdClass();
      $object->cid = NULL;
      $object->instance = $config;
      $object->config = $feature_conf[$config]['config'];
      metatag_config_save($object);
    }
  }
}

/**
 * Implements hook_features_export_options().
 */
function metatag_features_export_options() {
  $instances = metatag_config_instance_info();
  foreach ($instances as $key => $instance) {
    $options[$key] = $key;
  };
  return $options;
}

/**
 * Implements hook_features_rebuild().
 */
function metatag_features_rebuild($module) {
  metatag_features_revert($module);
}
