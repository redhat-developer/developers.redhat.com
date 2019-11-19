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
    kint($row);
  }

  public function getIds() {
    return [
      'ID' => [
        'type' => 'integer'
      ]
    ];
  }

}