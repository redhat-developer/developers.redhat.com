<?php

namespace Drupal\rhd_migration\Plugin\migrate\source;

use Drupal\Core\Database\Database;
use Drupal\migrate\Row;

/**
 * Extract posts
 * 
 * @MigrateSource(
 *   id = "wordpress_post",
 *   source_module = "rhd_migration"
 * )
 */
class WordpressPost extends WpSqlBase {

  public function query() {
    $db = Database::getConnection('default', 'wp');
    $query = $db->select('wp_posts', 'posts');
    $query->condition('posts.post_type', 'post');
    $query->condition('posts.post_title', '', '!=');
    $query->addField('posts', 'ID');
    $query->addField('posts', 'post_author');
    $query->addField('posts', 'post_date', 'post_created');
    $query->addField('posts', 'post_modified', 'post_changed');
    $query->addField('posts', 'post_status');
    $query->addField('posts', 'post_name', 'post_url_fragment');
    $query->addField('posts', 'post_content');
    $query->addField('posts', 'post_title');

    $meta = [
      'post_short_desc' => '_yoast_wpseo_metadesc',
    ];
    foreach ($meta as $field => $meta_key) {
      $join_condition = 'posts.ID = ' . $field . '.post_id and ' . $field . '.meta_key = \'' . $meta_key . '\'';
      $query->leftJoin('wp_postmeta', $field, $join_condition);
      $query->addField($field, 'meta_value', $field);
    }

    return $query;
  }

  public function fields() {
    return [
      'post_id' => $this->t('Post ID'),
      'post_author' => $this->t('Post Author'),
      'post_created' => $this->t('Created'),
      'post_changed' => $this->t('Changed'),
      'post_status' => $this->t('Status'),
      'post_content' => $this->t('Content'),
      'post_title' => $this->t('Title'),
      'post_url' => $this->t('URL'),
      'post_tags' => $this->t('Post Tags'),
      'post_topics' => $this->t('Post Topics'),
      'post_short_desc' => $this->t('Post Short Description')
    ];
  }

  public function prepareRow(Row $row) {
    $url[] = '/blog';
    $url[] = date('Y', strtotime($row->getSourceProperty('post_created')));
    $url[] = date('m', strtotime($row->getSourceProperty('post_created')));
    $url[] = date('d', strtotime($row->getSourceProperty('post_created')));
    $url[] = $row->getSourceProperty('post_url_fragment');
    $row->setSourceProperty('post_url', implode('/', $url));

    $status = $row->getSourceProperty('post_status');
    switch ($status) {
      case 'publish':
        $row->setSourceProperty('post_status', 'published');
        break;
      case 'pending-review':
      case 'pending':
      case 'future':
        $row->setSourceProperty('post_status', 'needs_review');
        break;
      case 'auto-draft':
      case 'trash':
      case 'private':
        $row->setSourceProperty('post_status', 'archived');
        break;
      default:
        $row->setSourceProperty('post_status', 'draft');
        break;
    }

    // Get terms and tags. Easier to do here than messing with
    // subqueries and expressions in query().
    $db = Database::getConnection('default', 'wp');
    $query = $db->select('wp_posts', 'wpp');
    $query->leftJoin('wp_term_relationships', 'wptr', 'wpp.ID = wptr.object_id');
    $query->leftJoin('wp_terms', 'wpt', 'wptr.term_taxonomy_id = wpt.term_id');
    $query->leftJoin('wp_term_taxonomy', 'wptt', 'wpt.term_id = wptt.term_taxonomy_id');
    $query->addField('wpt', 'name');
    $query->condition('wptt.taxonomy', 'post_tag');
    $query->condition('wpp.ID', $row->getSourceProperty('ID'));
    $results = $query->execute();
    $terms = [];
    foreach ($results as $result){
      $terms[] = $result->name;  
    }
    $terms = implode(',', $terms);
    $row->setSourceProperty('post_tags', 'tags|' . $terms);

    $query = $db->select('wp_posts', 'wpp');
    $query->leftJoin('wp_term_relationships', 'wptr', 'wpp.ID = wptr.object_id');
    $query->leftJoin('wp_terms', 'wpt', 'wptr.term_taxonomy_id = wpt.term_id');
    $query->leftJoin('wp_term_taxonomy', 'wptt', 'wpt.term_id = wptt.term_taxonomy_id');
    $query->addField('wpt', 'name');
    $query->condition('wptt.taxonomy', 'category');
    $query->condition('wpp.ID', $row->getSourceProperty('ID'));
    $results = $query->execute();
    $terms = [];
    foreach ($results as $result){
      $terms[] = $result->name;  
    }
    $terms = implode(',', $terms);
    $row->setSourceProperty('post_topics', 'topics|' . $terms);
  }

  public function getIds() {
    return [
      'ID' => [
        'type' => 'integer'
      ]
    ];
  }

}