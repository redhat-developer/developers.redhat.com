<?php

/**
 * @file
 * Hook_update_N()s for assemblies or related functionality.
 */

use Drupal\assembly\Entity\Assembly;

/**
 * Standardize light, dark and centered visual style class names.
 *
 * Visual styles with a light, dark or centered theme will use "light", "dark"
 * and "centered"
 */
function rhd_assemblies_update_8001() {
  // Update assembly-dark visual styles to dark in assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'assembly-dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "assembly-dark" visual style to "dark" in assembly__visual_styles.');
  }

  // Update assembly-dark visual styles to dark in
  // assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'assembly-dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "assembly-dark" visual style to "dark" in assembly_revision__visual_styles.');
  }

  // Update product-hero--dark visual styles to dark in assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'product-hero--dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--dark" visual style to "dark" in assembly__visual_styles.');
  }

  // Update product-hero--dark visual styles to dark in
  // assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'product-hero--dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--dark" visual style to "dark" in assembly_revision__visual_styles.');
  }

  // Update product-hero--light visual styles to light in
  // assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'light'])
    ->condition('visual_styles_value', 'product-hero--light', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--light" visual style to "light" in assembly__visual_styles.');
  }

  // Update product-hero--light visual styles to light in
  // assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'light'])
    ->condition('visual_styles_value', 'product-hero--light', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--light" visual style to "light" in assembly_revision__visual_styles.');
  }

  // Update product-hero--slim visual styles to slim in assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'assembly-slim'])
    ->condition('visual_styles_value', 'product-hero--slim', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--slim" visual style to "assembly-slim" in assembly__visual_styles.');
  }

  // Update product-hero--slim visual styles to slim in
  // assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'assembly-slim'])
    ->condition('visual_styles_value', 'product-hero--slim', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-hero--slim" visual style to "assembly-slim" in assembly_revision__visual_styles.');
  }

  // Update center visual styles to centered in assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'centered'])
    ->condition('visual_styles_value', 'center', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "center" visual style to "centered" in assembly__visual_styles.');
  }

  // Update center visual styles to centered in assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'centered'])
    ->condition('visual_styles_value', 'center', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "center" visual style to "centered" in assembly_revision__visual_styles.');
  }

  // Update assembly-center visual styles to centered in assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'centered'])
    ->condition('visual_styles_value', 'assembly-center', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "assembly-center" visual style to "centered" in assembly__visual_styles.');
  }

  // Update assembly-center visual styles to centered in
  // assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'centered'])
    ->condition('visual_styles_value', 'assembly-center', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "assembly-center" visual style to "centered" in assembly_revision__visual_styles.');
  }

  // Update product-signup-hero--dark visual styles to dark in
  // assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'product-signup-hero--dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-signup-hero--dark" visual style to "dark" in assembly__visual_styles.');
  }

  // Update product-signup-hero--dark visual styles to dark in
  // assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'dark'])
    ->condition('visual_styles_value', 'product-signup-hero--dark', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "product-signup-hero--dark" visual style to "dark" in assembly_revision__visual_styles.');
  }

  // Update events-hero--light visual styles to light in assembly__visual_style.
  $query = \Drupal::database()
    ->update('assembly__visual_styles')
    ->fields(['visual_styles_value' => 'light'])
    ->condition('visual_styles_value', 'events-hero--light', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "events-hero--light" visual style to "light" in assembly__visual_styles.');
  }

  // Update events-hero--light visual styles to light in
  // assembly_revision__visual_style.
  $query = \Drupal::database()
    ->update('assembly_revision__visual_styles')
    ->fields(['visual_styles_value' => 'light'])
    ->condition('visual_styles_value', 'events-hero--light', '=')
    ->execute();
  if ($query === NULL) {
    throw new DrupalUpdateException('rhd_assemblies_update_8001 failed to apply. Could not update "events-hero--light" visual style to "light" in assembly_revision__visual_styles.');
  }

  // Update product-hero--dark-centered visual styles to dark and centered.
  $deprecated_class = 'product-hero--dark-centered';
  $assembly_ids = \Drupal::entityQuery('assembly')
    ->condition('visual_styles', $deprecated_class)
    ->execute();
  $assemblies = Assembly::loadMultiple($assembly_ids);
  foreach ($assemblies as $assembly) {
    $visual_styles = $assembly->get('visual_styles')->getValue();
    // Remove the 'product-hero--dark-centered' visual style/class if it exists.
    foreach ($visual_styles as $key => $visual_style) {
      if ($deprecated_class === $visual_style['value']) {
        unset($visual_styles[$key]);
      }
    }
    // Add in the 'dark' and 'centered' visual styles/classes.
    $visual_styles[] = ['value' => 'dark'];
    $visual_styles[] = ['value' => 'centered'];
    // Update the visual_styles field value.
    $assembly->get('visual_styles')->setValue($visual_styles);
    $assembly->save();
  }

  // Update product-hero--light-centered visual styles to light and centered.
  $deprecated_class = 'product-hero--light-centered';
  $assembly_ids = \Drupal::entityQuery('assembly')
    ->condition('visual_styles', $deprecated_class)
    ->execute();
  $assemblies = Assembly::loadMultiple($assembly_ids);
  foreach ($assemblies as $assembly) {
    $visual_styles = $assembly->get('visual_styles')->getValue();
    // Remove the 'product-hero--dark-centered' visual style/class if it exists.
    foreach ($visual_styles as $key => $visual_style) {
      if ($deprecated_class === $visual_style['value']) {
        unset($visual_styles[$key]);
      }
    }
    // Add in the 'dark' and 'centered' visual styles/classes.
    $visual_styles[] = ['value' => 'light'];
    $visual_styles[] = ['value' => 'centered'];
    // Update the visual_styles field value.
    $assembly->get('visual_styles')->setValue($visual_styles);
    $assembly->save();
  }

  // If all updates were performed without exception, return a success message.
  return t('rhd_assemblies_update_8001 was successfully applied. Assembly visual styles implementing a dark or centered theme will now use the classes "dark" and "centered".');
}

/**
 * Drops the laravel_cache table.
 *
 * This will be committed alongside a config change to uninstall the
 * rhd_guzzle_throttle custom module and replace the caching functionality of
 * that module with Drupal caching.
 */
function rhd_assemblies_update_8002() {
  $schema = \Drupal::database()->schema();
  $table = 'laravel_cache';

  if ($schema->tableExists($table)) {
    // TRUE if transaction was successful or FALSE if the table doesn't exist.
    $isSuccess = $schema->dropTable($table);

    if ($isSuccess) {
      return t('Successfully dropped laravel_cache table.');
    }
  }
}
