<?php

namespace Drupal\rhd_migration\Plugin\migrate\source;

use Drupal\Core\Database\Database;
use Drupal\migrate\Row;

/**
 * Extract authors
 * 
 * @MigrateSource(
 *   id = "wordpress_post"
 * )
 */
class WordpressPost extends WpSqlBase {

  public function query() {
    $db = Database::getConnection('default', 'wp');
    $query = $db->select('wp_posts', 'posts')
      ->fields('posts', ['ID', 'post_title', 'post_author'])
      ->condition('posts.post_type', 'post');
    return $query;
  }

  public function fields() {
    return [
      'title' => $this->t('Title'),
      'author' => $this->t('Author'),
    ];
  }

  public function getIds() {
    return [
      'post_id' => [
        'type' => 'integer'
      ]
    ];
  }

}