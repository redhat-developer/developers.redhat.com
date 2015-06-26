<?php

/**
 * Implements hook_drush_command().
 */
function metatag_importer_drush_command() {
  $items['metatag-import'] = array(
    'description' => dt('Import data into Metatag.'),
    'arguments' => array(),
  );
  
  return $items;
}

/**
 * Callback to convert all Nodewords data.
 */
function drush_metatag_importer_metatag_import() {
  // Offload all of the logic to the code contained in the admin file.
  include('metatag_importer.admin.inc');

  // Start the import.
  // @todo This isn't working.
  _metatag_importer_import();

  drush_print("Import complete");
}
