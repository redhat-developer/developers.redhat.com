<?php

namespace Drupal\rhd_migration\Plugin\migrate\source;

use Drupal\Core\Database\Database;
use Drupal\migrate\Row;

/**
 * Extract authors
 * 
 * @MigrateSource(
 *   id = "wordpress_author"
 * )
 */
class WordpressAuthor extends WpSqlBase {

  public function query() {
    // Database::setActiveConnection('wp');
    $db = Database::getConnection('default', 'wp');
    $query = $db->select('wp_users', 'users')
      ->fields('users', ['ID', 'user_login', 'user_email']);
    // Database::setActiveConnection();
    return $query;
  }

  public function fields() {
    return [
      'author_login' => $this->t('Author Login'),
      'author_email' => $this->t('Author Email'),
      'author_display_name' => $this->t('Author Display Name'),
      'author_first_name' => $this->t('Author First Name'),
      'author_last_name' => $this->t('Author Last Name')
    ];
  }

  public function getIds() {
    return [
      'user_id' => [
        'type' => 'integer'
      ]
    ];
  }

}