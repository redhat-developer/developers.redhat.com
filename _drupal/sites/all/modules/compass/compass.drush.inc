<?php

/**
 * @file
 *   Compass drush command.
 */

/**
 * Implements hook_drush_command().
 */
function compass_drush_command() {
  $items = array();

  $items['compass-compile'] = array(
    'description' => "Compiles a compass theme's stylesheets.",
    'arguments' => array(
      'theme' => 'The machine name of the theme.',
    ),
    'options' => array(
    ),
    'examples' => array(
      'drush compass-compile mytheme' => 'Compile the stylesheets for mytheme',
    ),
    'aliases' => array('compass'),
    'bootstrap' => DRUSH_BOOTSTRAP_DRUPAL_FULL,
  );

  return $items;
}

/**
 * Implements hook_drush_help().
 *
 * This function is called whenever a drush user calls
 * 'drush help <name-of-your-command>'
 *
 * @param
 *   A string with the help section (prepend with 'drush:')
 *
 * @return
 *   A string with the help text for your command.
 */
function compass_drush_help($section) {
  switch ($section) {
    case 'drush:compass-compile':
      return dt("Compile a theme's Sass stylesheets.");
  }
}

/**
 * Compass drush command callback.
 */
function drush_compass_compile($theme) {
  module_load_include('inc', 'compass');
  $cmd = _compass_update($theme);
  $exec_result = drush_shell_exec(variable_get('compass_path', '/usr/bin/compass') . ' ' . $cmd);
  if ($exec_result && drush_get_context('DRUSH_VERBOSE')) {
    foreach (drush_shell_exec_output() as $line) {
      drush_print($line);
    }
  }
}

/**
 * Implements drush_COMMAND_validate().
 *
 * @see drush_compass_compile()
 */
function drush_compass_compile_validate($theme = NULL) {
  if (empty($theme)) {
    return drush_set_error('DRUSH_FRAMEWORK_ERROR', dt('You must specify a theme.'));
  }
}
