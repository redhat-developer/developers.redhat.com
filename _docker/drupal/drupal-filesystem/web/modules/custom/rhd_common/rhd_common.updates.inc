<?php

/**
 * @file
 * Database updates.
 */

use Drupal\Core\Database;

/**
 * Drops the laravel_cache table.
 *
 * This will be committed alongside a config change to uninstall the
 * rhd_guzzle_throttle custom module and replace the caching functionality of
 * that module with Drupal caching.
 */
function rhd_common_update_8001() {
  $schema = Database::getConnection()->schema();
  $table_name = 'laravel_cache';
  // TRUE if transaction was successful or FALSE if the table doesn't exist.
  $isSuccess = $schema->dropTable($table_name);

  if ($isSuccess) {
    return t('Successfully dropped laravel_cache table.');
  }
  else {
    throw new DrupalUpdateException('Failed to drop laravel_cache table.');
  }
}
