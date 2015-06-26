<?php

/**
 * @file
 * Metatag support for Migrate.
 */

/**
 * Basic usage of the Migrate integration.
 *
 * This example assumes the custom module's name is "example_migrate".
 * 
 * example_migrate.inc:
 * 
 * class MetatagTestMigration extends DynamicMigration {
 * 
 *   public function __construct() {
 *     parent::__construct();
 * 
 *     $this->description = t('Migrate test.');
 * 
 *     $this->map = new MigrateSQLMap(
 *       $this->machineName,
 *       array(
 *         'id' => array(
 *           'type' => 'varchar',
 *           'not null' => TRUE,
 *           'length' => 254,
 *           'description' => 'ID of record.',
 *         ),
 *       ),
 *       MigrateDestinationNode::getKeySchema()
 *     );
 * 
 *     $this->source = new MigrateSourceCSV(
 *       drupal_get_path('module', 'example_migrate') . '/sample.csv',
 *       array(),
 *       array('header_rows' => TRUE)
 *     );
 * 
 *     $this->destination = new MigrateDestinationNode('article');
 * 
 *     $this->addFieldMapping('metatag_description', 'description');
 *     $this->addFieldMapping('metatag_keywords', 'keywords');
 *   }
 * }
 * 
 * example_migrate.migrate.inc:
 * 
 * /**
 *  * Implements hook_migrate_api().
 *  * /
 * function example_migrate_migrate_api() {
 *   $api = array(
 *     'api' => 2,
 *     'migrations' => array(
 *       'MetatagTest' => array('class_name' => 'MetatagTestMigration'),
 *     ),
 *   );
 * 
 *   return $api;
 * }
 */

/**
 * Implements hook_migrate_api().
 */
function metatag_migrate_api() {
  $api = array(
    'api' => 2,
    'destination handlers' => array(
      'MigrateMetatagHandler',
    ),
  );

  return $api;
}

/**
 * Metatag destination handler.
 */
class MigrateMetatagHandler extends MigrateDestinationHandler {

  /**
   * Identify a list of supported entity types.
   */
  public function __construct() {
    $entity_types = metatag_entity_supports_metatags();
    $entity_types = array_filter($entity_types);
    $entity_types = array_keys($entity_types);

    $this->registerTypes($entity_types);
  }

  /**
   * Implements MigrateDestinationHandler::fields().
   */
  public function fields() {
    $fields = array();
    $elements = metatag_get_info();

    foreach ($elements['tags'] as $value) {
      $metatag_field = 'metatag_' . $value['name'];
      $fields[$metatag_field] = $value['description'];
    }

    return $fields;
  }

  /**
   * Implements MigrateDestinationHandler::prepare().
   */
  public function prepare($entity, stdClass $row) {
    $elements = metatag_get_info();

    foreach ($elements['tags'] as $value) {
      $metatag_field = 'metatag_' . $value['name'];
      if (isset($entity->$metatag_field)) {
        $language = isset($entity->language) ? $entity->language : LANGUAGE_NONE;
        $entity->metatags[$language][$value['name']]['value'] = $entity->$metatag_field;
        unset($entity->$metatag_field);
      }
    }
  }
}
