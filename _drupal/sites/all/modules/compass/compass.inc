<?php

/**
 * @file
 *   Compass helper functions.
 */

function _compass_check_path($path) {
  $errors = array();
  if (!is_file($path)) {
    $errors[] = t('The specified Compass path %file does not exist.', array('%file' => $path));
  }
  if (!$errors && !is_executable($path)) {
    $errors[] = t('The specified Compass path %file is not executable.', array('%file' => $path));
  }
  if ($errors && $open_basedir = ini_get('open_basedir')) {
    $errors[] = t('PHP\'s <a href="!open-basedir">open_basedir</a> security restriction is set to %open-basedir, which may be interfering with attempts to locate Compass.', array('%file' => $path, '%open-basedir' => $open_basedir, '!info-link' => url('http://php.net/features.safe-mode#ini.open-basedir')));
  }
  return $errors;
}

function _compass_options($options) {
  $output = '';
  foreach ($options as $key => $value) {
    $key = str_replace('_', '-', $key);
    if (!empty($value)) {
      $output .= '--' . $key . ' ' . $value;
    }
    else {
      $output .= '--' . $key;
    }
    $output .= ' ';
  }
  return $output;
}

function _compass_update($theme) {
  $themes = list_themes();
  $theme = $themes[$theme];

  $command = 'compile ' . getcwd() . '/' . dirname($theme->filename);

  $args = array();
  $args = $theme->info['compass'];
  unset($args['status']);
  $args['boring'] = '';
  $args['output_style'] = variable_get('compass_output_style', 'nested');
  $args['environment'] = variable_get('compass_environment', 'production');
  if (variable_get('compass_relative_assets', FALSE)) {
    $args['relative_assets'] = '';
  }
  $args['load'] = getcwd() . '/' . dirname($themes[$theme->base_theme]->filename);

  drupal_alter('compass_options', $args, $op);
  return $command . ' ' . _compass_options($args);
}

// http://wiki.github.com/chriseppstein/compass/command-line-tool

function _compass_exec($command, &$output, &$errors) {
  $compass_path = variable_get('compass_path', '/usr/bin/compass');
  $errors = _compass_check_path($compass_path);
  if ($errors) {
    watchdog('compass', '!errors', array('!errors' => implode('<br />', $errors)), WATCHDOG_ERROR);
    return FALSE;
  }

  // Specify Drupal's root as the working a working directory so that relative
  // paths are interpreted correctly.
  $drupal_path = $_SERVER['DOCUMENT_ROOT'] . dirname($_SERVER['SCRIPT_NAME'] ? $_SERVER['SCRIPT_NAME'] : $_SERVER['SCRIPT_FILENAME']);

  // TODO determine whether this module has any hope of ever working on Windows
  if (strstr($_SERVER['SERVER_SOFTWARE'], 'Win32') || strstr($_SERVER['SERVER_SOFTWARE'], 'IIS')) {
    // Use Window's start command to avoid the "black window" from showing up:
    // http://us3.php.net/manual/en/function.exec.php#56599
    // Use /D to run the command from PHP's current working directory so the
    // file paths don't have to be absolute.
    $compass_path = 'start "window title" /D' . escapeshellarg($drupal_path) . ' /B ' . escapeshellarg($compass_path);
  }

  $descriptors = array(
    0 => array('pipe', 'r'), // stdin
    1 => array('pipe', 'w'), // stdout
    2 => array('pipe', 'w'), // stderr
  );

  $env = array();
  $gem_home = variable_get('compass_gem_home', NULL);
  if (!empty($gem_home)) {
    $env['GEM_HOME'] = variable_get('compass_gem_home', NULL);
  }

  $gem_path = variable_get('compass_gem_path', NULL);
  if (!empty($gem_path)) {
    $env['GEM_PATH'] = variable_get('compass_gem_path', NULL) . ':' . shell_exec('gem env GEM_PATH');
  }

  $env['HOME'] = '/';

  if ($h = proc_open($compass_path . ' ' . $command, $descriptors, $pipes, $drupal_path, $env)) {
    stream_set_blocking($pipes[1], 0);
    stream_set_blocking($pipes[2], 0);

    while (!feof($pipes[1]) || !feof($pipes[2])) {
      if (!feof($pipes[1])) {
        $output .= stream_get_contents($pipes[1]);
      }
      if (!feof($pipes[2])) {
        $errors .= stream_get_contents($pipes[2]);
      }
    }

    fclose($pipes[0]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    $return_code = proc_close($h);

    // Display debugging information to authorized users.
    if (variable_get('compass_debugging', FALSE) && user_access('administer site configuration')) {
      drupal_set_message(t('Compass command: @command', array('@command' => $compass_path . ' ' . $command)));
      drupal_set_message(t('Compass output: !output', array('!output' => '<pre>' . $output . '</pre>')));
    }

    if ($return_code != 0) {
      // If Compass returned a non-zero code, trigger a PHP error that will
      // be caught by Drupal's error handler, logged to the watchdog and
      // eventually displayed to the user if configured to do so.

      // If $errors is empty, only report the error code.
      if (empty($errors)) {
        trigger_error(t('Compass reported error code !code.', array('!code' => $return_code)), E_USER_ERROR);
      }
      // Otherwise report the error code, and the error message.
      else {
        trigger_error(t("Compass reported error code !code.\nMessage:\n!error", array('!code' => $return_code, '!error' => $errors)), E_USER_ERROR);
      }
    }

    return $return_code;
  }
  return FALSE;
}
