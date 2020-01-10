<?php

namespace Drupal\rhd_migration\Plugin\migrate\source;

use Drupal\Core\Database\Database;
use Drupal\migrate\Row;
use Drupal\migrate\Plugin\MigrationInterface\MigrateExecutableInterface;

/**
 * Extract authors
 * 
 * @MigrateSource(
 *   id = "wordpress_author",
 *   source_module = "rhd_migration"
 * )
 */
class WordpressAuthor extends WpSqlBase {

  public function query() {
    $db = Database::getConnection('default', 'wp');
    $query = $db->select('wp_users', 'users');
    $query->addField('users', 'ID');
    $query->addField('users', 'user_email', 'author_email');
    $query->addField('users', 'user_login', 'author_login');
    $group_by = ['ID', 'user_email', 'user_login'];
    $meta = [
      'author_title' => 'user_job_title',
      'author_bio' => 'description',
      'author_twitter' => 'user_twitter_handle',
      'author_youtube' => 'youtube',
      'author_linkedin' => 'user_linkedin_profile',
      'author_github' => 'user_github_profile',
      'author_facebook' => 'user_facebook_profile',
      'author_last_name' => 'last_name',
      'author_first_name' => 'first_name',
    ];
    foreach ($meta as $field => $meta_key) {
      $join_condition = 'users.ID = ' . $field . '.user_id and ' . $field . '.meta_key = \'' . $meta_key . '\'';
      $query->leftJoin('wp_usermeta', $field, $join_condition);
      $query->addField($field, 'meta_value', $field);
      $group_by[] = $field . '.meta_value';
    }
    $query->groupBy(implode(', ', $group_by));
    return $query;
  }

  public function fields() {
    return [
      'author_id' => $this->t('Author ID'),
      'author_login' => $this->t('Author Login'),
      'author_url_alias' => $this->t('Author URL Alias'),
      'author_email' => $this->t('Author Email'),
      'author_display_name' => $this->t('Author Display Name'),
      'author_first_name' => $this->t('Author First Name'),
      'author_last_name' => $this->t('Author Last Name'),
      'author_bio' => $this->t('Author Bio'),
      'author_title' => $this->t('Author Title'),
      'author_linkedin' => $this->t('Author Linkedin'),
      'author_twitter' => $this->t('Author Twitter'),
      'author_facebook' => $this->t('Author Facebook'),
      'author_stackoverflow' => $this->t('Author StackOverflow'),
      'author_youtube' => $this->t('Author YouTube'),
      'author_url' => $this->t('Author URL'),
    ];
  }

  public function prepareRow(Row $row) {
    $fname = $row->getSourceProperty('author_first_name');
    $lname = $row->getSourceProperty('author_last_name');
    $display_name = implode(' ', [$fname, $lname]);
    if (!strlen(trim($display_name))) {
      $display_name = $row->getSourceProperty('author_login');
    }
    $row->setSourceProperty('author_display_name', $display_name);
    $row->setSourceProperty('author_url_alias', '/blog/author/' . $row->getSourceProperty('author_login'));
  }

  public function getIds() {
    return [
      'ID' => [
        'type' => 'integer'
      ]
    ];
  }

}