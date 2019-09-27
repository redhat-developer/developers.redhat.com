<?php

use Drupal\Core\Database\Connection;
use Drupal\Core\Database\Database;

/**
 * @file
 * hook_update_N()s for assemblies or related functionality.
 */

/**
 * Assemblies using the 'assembly-dark' visual style will change to 'dark'.
 */
function rhd_assemblies_update_8001() {
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'dark',])
    ->condition('visual_styles_value', 'assembly-dark', '=')
    ->execute();

  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply');
  }
  else {
    return t('rhd_assemblies_update_8001 was applied. Assemblies previously using the "assembly-dark" visual style now use "dark".');
  }
}
