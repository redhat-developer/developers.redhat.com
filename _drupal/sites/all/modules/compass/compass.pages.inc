<?php

/**
 * @file
 * Compass module page settings.
 */

/**
 * Page callback shows compass output through a form for easy redirect
 */
function compass_process($form, $form_state) {
  global $theme;
  module_load_include('inc', 'compass');

  drupal_theme_initialize();
  $themes = list_themes();

  $options = array();
  foreach ($themes as $key => $value) {
    if (isset($value->info['compass']) && $value->info['compass']['status']) {
      $options[$key] = $value->info['name'];
    }
  }

  $sass_theme = FALSE;
  if (isset($form_state['values']['theme'])) {
    $sass_theme = $form_state['values']['theme'];
  }
  else if (isset($options[$theme])) {
    $sass_theme = $theme;
  }

  drupal_set_title(t('Compass'));
  if ($sass_theme) {
    $cmd = _compass_update($sass_theme);
    _compass_exec($cmd, $output, $errors);
    drupal_clear_css_cache();
  }
  else {

    // TODO: Improve this message. It appears on first build when the current
    // theme (often the admin theme) is not compass enabled.
    $output = 'Compass is not enabled for this theme.';
  }
  $form['#attributes'] = array(
    'class' => 'container-inline',
  );
  $form['theme'] = array(
    '#title' => 'Theme',
    '#type' => 'select',
    '#options' => $options,
    '#default_value' => $sass_theme,
  );
  $form['compile'] = array(
    '#type' => 'submit',
    '#value' => t('Compile'),
  );
  $form['return'] = array(
    '#type' => 'submit',
    '#value' => t('Return'),
  );
  $form['compass_output'] = array(
    '#prefix' => '<pre>',
    '#type' => 'markup',
    '#markup' => $output,
    '#suffix' => '</pre>',
  );
  return $form;
}

/**
 * Submit function
 */
function compass_process_submit($form, &$form_state) {
  if ($form_state['clicked_button']['#value'] == t('Compile')) {
    $form_state['rebuild'] = TRUE;
  }
}
