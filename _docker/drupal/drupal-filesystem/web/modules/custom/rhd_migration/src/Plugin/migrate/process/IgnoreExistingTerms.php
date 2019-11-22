<?php

namespace Drupal\rhd_migration\Plugin\migrate\process;

use Drupal\Core\Database\Database;
use Drupal\migrate\Row;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\MigrateSkipRowException;

/**
 * Find taxonomy terms by name and vocab
 *
 * @MigrateProcessPlugin(
 *   id = "ignore_existing_terms",
 *   source_module = "rhd_migration"
 * )
 * 
 * Usage:
 * @code
 * field_tags:
 *   plugin: ignore_existing_terms
 * @endcode
 */
class IgnoreExistingTerms extends ProcessPluginBase {
  public function transform($value, MigrateExecutableInterface $migrate_executeable, Row $row, $destination_property){
    $db = Database::getConnection();
    $query = $db->select('taxonomy_term_field_data', 't');
    $query->condition('t.name', $row->getSourceProperty('term_name'));
    $query->condition('t.vid', $row->getSourceProperty('term_vocab'));
    $query->addField('t', 'tid');
    $results = $query->execute();
    foreach ($results as $result) {
      throw new MigrateSkipRowException("Term already exists", true);
    }
    return $value;
  }
 }