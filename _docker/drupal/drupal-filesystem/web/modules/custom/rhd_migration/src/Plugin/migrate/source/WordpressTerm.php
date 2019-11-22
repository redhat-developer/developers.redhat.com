<?php

namespace Drupal\rhd_migration\Plugin\migrate\source;

use Drupal\Core\Database\Database;
use Drupal\migrate\Row;
use Drupal\migrate\MigrateSkipRowException;

/**
 * Extract terms (category and post_tag taxonomies only)
 * 
 * @MigrateSource(
 *   id = "wordpress_term",
 *   source_module = "rhd_migration"
 * )
 */
class WordpressTerm extends WpSqlBase {

  public function query() {
    $db = Database::getConnection('default', 'wp');
    $query = $db->select('wp_terms', 'terms');
    $query->addField('terms', 'term_id');
    $query->addField('terms', 'name', 'term_name');
    $query->addField('terms', 'slug', 'term_slug');
    $query->leftJoin('wp_term_taxonomy', 'taxonomy', 'taxonomy.term_id = terms.term_id');
    $query->condition('taxonomy.taxonomy', ['category', 'post_tag'], 'in');
    $query->addField('taxonomy', 'taxonomy', 'term_vocab');
    return $query;
  }

  public function fields() {
    return [
      'term_id' => $this->t('Term ID'),
      'term_name' => $this->t('Term Name'),
      'term_slug' => $this->t('Term Slug'),
      'term_url_alias' => $this->t('Term URL Alias'),
      'term_vocab' => $this->t('Term Vocabulary')
    ];
  }

  public function prepareRow(Row $row) {
    $vocab = $row->getSourceProperty('term_vocab');
    switch ($vocab) {
      case 'category':
        $row->setSourceProperty('term_vocab', 'topics');
        break;
      case 'post_tag':
        $row->setSourceProperty('term_vocab', 'tags');
        break;
    }
  }

  public function getIds() {
    return [
      'term_id' => [
        'type' => 'integer',
        'alias' => 'terms'
      ]
    ];
  }

}