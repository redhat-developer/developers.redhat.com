<?php

namespace Drupal\rhd_migration\Plugin\migrate\process;

use Drupal\Core\Database\Database;
use Drupal\migrate\Row;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;

/**
 * Find taxonomy terms by name and vocab
 *
 * @MigrateProcessPlugin(
 *   id = "find_terms",
 *   source_module = "rhd_migration"
 * )
 * 
 * Usage:
 * @code
 * field_tags:
 *   plugin: find_terms
 *   source: source_terms
 * @endcode
 */
class FindTerms extends ProcessPluginBase {
  public function transform($value, MigrateExecutableInterface $migrate_executeable, Row $row, $destination_property){
    $value = explode('|', $value);
    $vocab = $value[0];
    $terms = explode(',', $value[1]);
    $target = [];
    foreach ($terms as $term_name) {
      $db = Database::getConnection();
      $query = $db->select('taxonomy_term_field_data', 'terms');
      $query->addField('terms', 'tid');
      $query->condition('terms.vid', $vocab);
      $query->condition('terms.name', $term_name);
      $results = $query->execute();
      foreach ($results as $result) {
        $target[] = ['target_id' => $result->tid];
      }
    }
    return $target;
  }
 }