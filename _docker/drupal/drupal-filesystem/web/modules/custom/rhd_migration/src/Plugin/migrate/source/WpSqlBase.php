<?php

namespace Drupal\rhd_migration\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SqlBase;
use Drupal\Core\Database\Database;
use Drupal\migrate\Row;

abstract class WpSqlBase extends SqlBase {
  public function query() {
    // $db = Database::getConnection('wp');
    // return $db->select('table', 'table_alias');
  }

  public function prepareRow(Row $row) {
    // $row->setSourceProperty('some_property', 'some_value');
  }
}