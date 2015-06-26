<?php

/**
 * @file
 * Compass module admin settings.
 */

/**
 * Settings form for the toolkit.
 */
function compass_settings_form($form, &$form_state) {
  $form = array();
  $form['compass_binary'] = array(
    '#type' => 'fieldset',
    '#title' => t('Compass Binary'),
    '#collapsible' => FALSE,
    '#description' => t('Compass is a standalone Ruby script used to compile CSS from Sass stylesheets. To use it, it must be installed on your server and you need to know where it is located. If you are unsure of the exact path consult your ISP or server administrator.'),
  );
  $form['compass_binary']['version'] = array('#weight' => -1);
  $form['compass_binary']['#after_build'] = array('_compass_build_version');
  $form['compass_binary']['compass_gem_home'] = array(
    '#type' => 'textfield',
    '#title' => t('Gem home directory'),
    '#default_value' => variable_get('compass_gem_home'),
    '#description' => t('Specify the complete path to the Gem home.'),
  );
  $form['compass_binary']['compass_gem_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Gem path'),
    '#default_value' => variable_get('compass_gem_path'),
    '#description' => t('Specify any additions to the gem path.'),
  );
  $form['compass_binary']['compass_path'] = array(
    '#type' => 'textfield',
    '#title' => t('Path of "compass" executable'),
    '#default_value' => variable_get('compass_path', '/usr/bin/compass'),
    '#required' => TRUE,
    '#description' => t('Specify the complete path to the Compass binary. For example: <kbd>/usr/bin/compass</kbd>'),
    '#element_validate' => array('compass_validate_path'),
  );
  $form['compass_binary']['compass_debugging'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display debugging information'),
    '#default_value' => variable_get('compass_debugging', 0),
    '#description' => t('Checking this option will display the Compass commands and output to users with the <em>administer site configuration</em> permission.'),
    '#weight' => 2,
  );
  $form['compass_output_style'] = array(
    '#type' => 'radios',
    '#title' => 'Output Style',
    '#options' => array(
      'nested' => 'Nested',
      'expanded' => 'Expanded',
      'compact' => 'Compact',
      'compressed' => 'Compressed',
    ),
    '#default_value' => variable_get('compass_output_style', 'nested'),
  );
  $form['compass_environment'] = array(
    '#type' => 'radios',
    '#title' => 'Output Style',
    '#options' => array(
      'development' => 'Development',
      'production' => 'Production',
    ),
    '#description' => 'Use sensible defaults for your current environment.',
    '#default_value' => variable_get('compass_environment', 'production'),
  );
  $form['compass_relative_assets'] = array(
    '#type' => 'checkbox',
    '#title' => 'Relative Assets',
    '#description' => 'Indicates whether the compass helper functions should generate relative urls from the generated css to assets, or absolute urls using the http path for that asset type.',
    '#default_value' => variable_get('compass_relative_assets', FALSE),
  );
  $form['compass_cron'] = array(
    '#title' => 'Run <em>compass</em> during cron tasks',
    '#type' => 'checkbox',
    '#default_value' => variable_get('compass_cron', TRUE),
  );
  $form['compass_devel_rebuild'] = array(
    '#title' => 'Run <em>compass</em> during devel theme rebuild',
    '#type' => 'checkbox',
    '#description' => t('Requires !devel_rebuild_theme_registry to be enabled.', array('!devel_rebuild_theme_registry' => l('devel_rebuild_theme_registry', 'admin/config/devel'))),
    '#default_value' => variable_get('compass_devel_rebuild', FALSE),
  );

  $themes = list_themes();
  $options = array();
  foreach ($themes as $theme) {
    if ($theme->status && isset($theme->info['compass']['status']) && $theme->info['compass']['status'] && $theme->info['compass']['sass_dir'] == "stylesheets") {
      $options[$theme->name] = $theme->info['name'];
    }
  }
  $form['compass_load'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Additional load paths'),
    '#default_value' => variable_get('compass_load', array()),
    '#options' => $options,
    '#description' => t('Load additional theme Sass as framework/extension, e.g. load base theme Sass so it can be imported by sub-theme. Sass folder <em>must</em> be named "stylesheets". Listed are themes with compass support enabled that can be loaded.'),
  );

  return system_settings_form($form);
}

function _compass_build_version($form_element, $form_state) {
  module_load_include('inc', 'compass');
  // make sure path is set and valid before running after build.
  if ($path_errors = _compass_check_path($form_state['values']['compass_path'])) {
    // check here is primarily for pre-existing bad settings...
    // the #validate should prevent users from adding bad paths.
    $form_element['version'] = array(
      '#type' => 'markup',
      '#markup' => '<p class="error">' . implode('<br />', $path_errors) . '</p>',
    );
  }
  else {
    _compass_exec('version', $output, $errors);
    $form_element['version'] = array(
      '#type' => 'markup',
      '#title' => t('Version information'),
      '#markup' => '<pre>' . check_plain(trim($output)) . '</pre>',
      '#description' => t('The <kbd>compass</kbd> binary was located and return this version information.'),
    );
  }
  $form_element['version']['#type'] = 'item';
  $form_element['version']['#weight'] = -1;
  return $form_element;
}

/**
 * @todo Please document this function.
 * @see http://drupal.org/node/1354
 */
function compass_validate_path($element, &$form_state) {
  $errors = _compass_check_path($element['#value']);
  if ($errors) {
    form_set_error($element['#parents'][0], implode('<br />', $errors));
  }
}
