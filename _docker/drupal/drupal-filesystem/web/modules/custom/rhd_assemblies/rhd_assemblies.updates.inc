<?php

use Drupal\Core\Database\Connection;
use Drupal\Core\Database\Database;
use Drupal\assembly\Entity\Assembly;

/**
 * @file
 * hook_update_N()s for assemblies or related functionality.
 */

/**
 * Standardize light, dark and centered visual style class names.
 *
 * Visual styles with a light, dark or centered theme will use "light", "dark"
 * and "centered"
 */
function rhd_assemblies_update_8001() {
  // Update assembly-dark visual styles to dark.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'assembly-dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "assembly-dark" visual style to "dark".');
  }

  // Update product-hero--dark visual styles to dark.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'product-hero--dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--dark" visual style to "dark".');
  }

  // Update product-hero--light visual styles to light.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'light'])
    ->condition('visual_styles_value', 'product-hero--light', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--light" visual style to "light".');
  }

  // Update product-hero--slim visual styles to slim.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'assembly-slim'])
    ->condition('visual_styles_value', 'product-hero--slim', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--slim" visual style to "assembly-slim".');
  }

  // Update center visual styles to centered.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'centered'])
    ->condition('visual_styles_value', 'center', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "center" visual style to "centered".');
  }

  // Update assembly-center visual styles to centered.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'centered'])
    ->condition('visual_styles_value', 'assembly-center', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "assembly-center" visual style to "centered".');
  }

  // Update product-signup-hero--dark visual styles to dark.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'product-signup-hero--dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-signup-hero--dark" visual style to "dark".');
  }

  // Update events-hero--light visual styles to light.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'light'])
    ->condition('visual_styles_value', 'events-hero--light', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "events-hero--light" visual style to "light".');
  }

  // Update product-hero--dark-centered visual styles to dark and centered.
  $assembly_ids = \Drupal::entityQuery('assembly')
    ->condition('visual_styles', 'product-hero--dark-centered')
    ->execute();
  $assemblies = Assembly::loadMultiple($assembly_ids);
  foreach ($assemblies as $assembly) {
    $assembly->set('visual_styles', ['dark', 'centered']);
    $assembly->save();
  }

  // Update product-hero--light-centered visual styles to light and centered.
  $assembly_ids = \Drupal::entityQuery('assembly')
    ->condition('visual_styles', 'product-hero--light-centered')
    ->execute();
  $assemblies = Assembly::loadMultiple($assembly_ids);
  foreach ($assemblies as $assembly) {
    $assembly->set('visual_styles', ['light', 'centered']);
    $assembly->save();
  }

  //  If all updates were performed without exception, return a success message.
  return t('rhd_assemblies_update_8001 was successfully applied. Assembly visual styles implementing a dark or centered theme will now use the classes "dark" and "centered".');
}
