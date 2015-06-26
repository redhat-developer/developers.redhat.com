<?php

/**
 * @file
 * Configuration for digest authentication. Only the root user should have
 * access to this file.
 */

/**
 * Path to your Drupal installation. We need this so that we can reuse some
 * Drupal code.
 */
$drupal = '.';

/**
 * Database settings:
 *
 * Note that the $db_url variable gets parsed using PHP's built-in URL parser
 * (i.e. using the "parse_url()" function) so make sure not to confuse the
 * parser. If your username, password or database name contain characters used
 * to delineate $db_url parts, you can escape them via URI hex encodings:
 *
 *   : = %3a   / = %2f   @ = %40
 *   + = %2b   ( = %28   ) = %29
 *   ? = %3f   = = %3d   & = %26
 *
 * Database URL format:
 *   $db_url = 'mysql://username:password@localhost/databasename';
 *   $db_url = 'mysqli://username:password@localhost/databasename';
 *   $db_url = 'pgsql://username:password@localhost/databasename';
 *
 * Only the root user should have access to the database used to
 * to store passwords.
 */
$db_url = 'mysql://username:password@localhost/databasename';

/**
 * Nonce values will expire 60 seconds after they are last used. Uncomment the
 * line below to change the expiration period.
 */
# $expire = 60;

/**
 * Nonce values may be used an unlimited number of times. Uncomment the line
 * below if you would like to set a limit.
 */
# $max_nc = 1;

/**
 * Set up password and nonce storage.
 */
function _securesite_schema() {
  global $db_url, $db_type;
  $schema['securesite_passwords'] = array(
    'module' => 'securesite',
    'name' => 'securesite_passwords',
    'description' => 'Stores user passwords.',
    'fields' => array(
      'name' => array(
        'type' => 'varchar',
        'length' => 60,
        'not null' => TRUE,
        'default' => '',
        'description' => "User's {users}.name.",
      ),
      'realm' => array(
        'type' => 'text',
        'description' => "User's realm.",
      ),
      'pass' => array(
        'type' => 'varchar',
        'length' => 32,
        'not null' => TRUE,
        'default' => '',
        'description' => "User's password (plain text).",
      ),
    ),
    'primary key' => array('name, realm'),
    'indexes' => array(
      'name' => array('name'),
      'realm' => array('realm'),
    ),
  );
  $schema['securesite_nonce'] = array(
    'module' => 'securesite',
    'name' => 'securesite_nonce',
    'description' => 'Stores nonce values.',
    'fields' => array(
      'nonce' => array(
        'type' => 'text',
        'not null' => TRUE,
        'default' => '',
        'description' => 'Nonce value.',
      ),
      'qop' => array(
        'type' => 'text',
        'description' => 'Quality of protection.',
      ),
      'nc' => array(
        'type' => 'int',
        'not null' => TRUE,
        'default' => 0,
        'description' => 'Number of times nonce has been used.',
      ),
      'opaque' => array(
        'type' => 'text',
        'description' => 'Opaque value.',
      ),
      'hash' => array(
        'type' => 'text',
        'description' => 'Hashed entity body to see if message was tampered with.',
      ),
      'time' => array(
        'type' => 'int',
        'description' => 'Last use timestamp.',
      ),
      'realm' => array(
        'type' => 'text',
        'description' => "Nonce realm.",
      ),
    ),
    'primary key' => array('nonce, realm'),
    'indexes' => array(
      'nonce' => array('nonce'),
      'opaque' => array('opaque'),
      'realm' => array('realm'),
    ),
  );
  $ret = array();
  foreach ($schema as $name => $table) {
    $url = parse_url(is_array($db_url) ? $db_url['default'] : $db_url);
    $database = substr($url['path'], 1);
    switch ($db_type) {
      case 'mysql':
      case 'mysqli':
        $sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '%s' AND table_name = '%s'";
        break;
      case 'pgsql':
        $sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_catalog = '%s' AND table_schema = 'public' AND table_name = '%s'";
        break;
    }
    if (db_result(db_query($sql, $database, $name)) == 0) {
      db_create_table($ret, $name, $table);
    }
  }
  return $ret;
}
