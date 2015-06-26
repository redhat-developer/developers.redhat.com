#!/usr/bin/php
<?php

/**
 * @file
 * This script implements the DIGEST-MD5 mechanism for all protocols. Only the
 * root user should have access to this script and the database used to store
 * passwords and nonce values.
 *
 * Usage: digest_md5.php [OPTIONS]...
 *
 * Options:
 *   data=STRING         The contents of the Authentication header. A challenge
 *                       will be issued if this is missing.
 *   method=STRING       HTTP connection method. Defaults to AUTHENTICATE.
 *   uri=STRING          URI of requested resource. If this is given, the URI
 *                       value in the Authentication header must match it.
 *   realm=STRING        Realm. Defaults to hostname.
 *   fakerealm=STRING    Fake realm. Used to force browsers to re-authenticate.
 *   opaque=STRING       Opaque string. Defaults to base64 encoded nonce value.
 *   qop=STRING          Quality of protection. Defaults to auth.
 *   entity-body=STRING  Message body for encryption and integrity checking.
 */

/**
 * Output a help message.
 */
foreach (array('-h', '--help', '-help', '-?', '/?', '?') as $arg) {
  if (in_array($arg, $argv)) {
    exit('Usage: digest_md5.php [OPTIONS]...'."\n".
         "\n".
         'Options:'."\n".
         '  data=STRING         The contents of the Authentication header. A challenge'."\n".
         '                      will be issued if this is missing.'."\n".
         '  method=STRING       HTTP connection method. Defaults to AUTHENTICATE.'."\n".
         '  uri=STRING          URI of requested resource. If this is given, the URI'."\n".
         '                      value in the Authentication header must match it.'."\n".
         '  realm=STRING        Realm. Defaults to hostname.'."\n".
         '  fakerealm=STRING    Fake realm. Used to force browsers to re-authenticate.'."\n".
         '  opaque=STRING       Opaque string. Defaults to base64 encoded nonce value.'."\n".
         '  qop=STRING          Quality of protection. Defaults to auth.'."\n".
         '  entity-body=STRING  Message body for encryption and integrity checking.'."\n".
         "\n");
  }
}

/**
 * Exit status codes.
 */
define('BAD_REQUEST', 1);
define('UNKNOWN_USER', 2);
define('WRONG_PASSWORD', 3);
define('REPLAY_ATTACK', 4);
define('STALE_NONCE', 5);
define('AUTHENTICATED', 0);

/**
 * Get configuration file variables.
 */
require 'digest_md5.conf.php';

/**
 * Get command line variables.
 */
$edit = array();
array_shift($argv);
foreach ($argv as $arg) {
  list($key, $value) = explode('=', $arg, 2);
  $edit[$key] = trim($value);
}
$edit['method'] = isset($edit['method']) ? $edit['method'] : 'AUTHENTICATE';

/**
 * Open a database connection.
 */
$cwd = getcwd();
chdir($drupal);
require "./includes/bootstrap.inc";
require_once "./includes/database.inc";
db_set_active();
chdir($cwd);
_securesite_schema();

/**
 * Remove expired nonce values.
 */
$time = time();
$expire = isset($expire) ? $expire : 60;
if (!empty($expire)) {
  db_query("DELETE FROM {securesite_nonce} WHERE time < %d", $time - $expire);
}

/**
 * Respond to authentication request.
 */
if (isset($edit['data'])) {
  list($output, $status) = _digest_md5_response($edit);
  print "$output\n";
  exit($status);
}
else {
  $nonce = uniqid();
  $uname = posix_uname();
  $edit['realm'] = isset($edit['realm']) ? $edit['realm'] : $uname['nodename'];
  $edit['fakerealm'] = isset($edit['fakerealm']) ? $edit['fakerealm'] : $edit['realm'];
  $qop = isset($edit['qop']) ? $edit['qop'] : 'auth';
  $values = array('nonce' => $nonce, 'time' => $time, 'realm' => $edit['realm'], 'qop' => $qop);
  $values += isset($edit['entity-body']) ? array('hash' => md5($edit['entity-body'])) : array();
  $challenge = array('realm="'. $edit['fakerealm'] .'"', 'nonce="'. $nonce .'"', 'qop="'. $qop .'"');
  if ($method != 'AUTHENTICATE') {
    $opaque = isset($edit['opaque']) ? $edit['opaque'] : base64_encode($nonce);
    $values['opaque'] = $opaque;
    $challenge[] = 'opaque="'. $opaque .'"';
  }
  print _digest_md5_challenge(array('values' => $values, 'challenge' => $challenge, 'new' => TRUE)) ."\n";
  exit;
}

/**
 * Prepare a challenge.
 * @param $edit
 *   - values
 *   - fields
 *   - new
 * @return
 *   Digest challenge string.
 */
function _digest_md5_challenge($edit) {
  if (isset($edit['values'])) {
    $types = array('qop' => "'%s'", 'nc' => '%d', 'opaque' => "'%s'", 'hash' => "'%s'", 'time' => '%d', 'nonce' => "'%s'", 'realm' => "'%s'");
    foreach ($types as $field => $type) {
      if (!isset($edit['values'][$field])) {
        unset($types[$field]);
      }
      else {
        // Ensure that values appear in the same order as types.
        $values[$field] = $edit['values'][$field];
      }
    }
    if ($edit['new']) {
      db_query("INSERT INTO {securesite_nonce} (". implode(', ', array_keys($values)) .") VALUES (". implode(', ', $types) .")", $values);
    }
    else {
      unset($types['nonce'], $types['realm']);
      $fields = array();
      foreach ($types as $field => $type) {
        $fields[] = "$field = $type";
      }
      db_query("UPDATE {securesite_nonce} SET ". implode(', ', $fields) ." WHERE nonce = '%s' AND realm = '%s'", $values);
    }
  }
  if (isset($edit['challenge'])) {
    return implode(', ', $edit['challenge']);
  }
}

/**
 * Process an authentication string.
 * @param $edit
 *   - data*
 *   - method*
 *   - uri
 *   - realm (defaults to machine name if not in data)
 *   - entity-body
 * @return
 *   Authentication info string or new challenge if authentication failed.
 */
function _digest_md5_response($edit) {
  global $time, $max_nc;
  // Get status.
  $fields = array();
  foreach (explode(',', trim($edit['data'])) as $part) {
    if (!empty($part)) {
      list($key, $value) = explode('=', trim($part), 2);
      $fields[$key] = trim($value, '"');
    }
  }
  $required = array('username', 'realm', 'nonce', 'uri', 'response');
  if (isset($fields['qop'])) {
    $required[] = 'cnonce';
    if ($edit['method'] != 'AUTHENTICATE') {
      $required[] = 'opaque';
    }
    $required[] = 'nc';
  }
  $uri = isset($edit['uri']) ? parse_url($edit['uri']) : NULL;
  $field_uri = isset($fields['uri']) ? parse_url($fields['uri']) : NULL;
  if (array_diff($required, array_keys($fields)) == array() && (!isset($edit['uri']) || $uri['path'] == $field_uri['path'])) {
    // Required fields are present and URI matches.
    $edit['realm'] = isset($edit['realm']) ? $edit['realm'] : $fields['realm'];
    $sn = db_fetch_array(db_query("SELECT qop, nc, opaque, hash FROM {securesite_nonce} WHERE nonce = '%s' AND realm = '%s'", $fields['nonce'], $edit['realm']));
    $pass = db_result(db_query("SELECT pass FROM {securesite_passwords} WHERE name = '%s' AND realm = '%s'", $fields['username'], $edit['realm']));
    if ($pass !== FALSE) {
      // Password exists for this user.
      $ha1 = md5("$fields[username]:$fields[realm]:$pass");
      if (isset($fields['qop'])) {
        // Generate digest with quality of protection.
        switch ($fields['qop']) {
          case 'auth-int':
            $ha2 = md5("$edit[method]:$fields[uri]:$sn[hash]");
            break;
          case 'auth':
            $ha2 = md5("$edit[method]:$fields[uri]");
            break;
        }
        $digest = md5("$ha1:$fields[nonce]:$fields[nc]:$fields[cnonce]:$fields[qop]:$ha2");
      }
      else {
        // Generate digest without quality of protection.
        $ha2 = md5("$edit[method]:$fields[uri]");
        $digest = md5("$ha1:$fields[nonce]:$ha2");
      }
      if ($digest == $fields['response']) {
        // Response is valid.
        if ($sn === FALSE) {
          // Stale nonce; send new challenge with stale notice.
          $status = STALE_NONCE;
          $fields['nonce'] = uniqid();
        }
        else {
          if (isset($fields['qop']) && in_array($fields['qop'], explode(',', $sn['qop'])) && $fields['opaque'] == $sn['opaque'] || !isset($fields['qop']) && !isset($fields['nc'])) {
            $dec_nc = isset($fields['qop']) ? hexdec($fields['nc']) : $sn['nc'] + 1;
            $max_nc = isset($max_nc) ? $max_nc : $dec_nc + 1;
            if ($dec_nc <= $sn['nc']) {
              // Replay attack; re-send challenge.
              $status = REPLAY_ATTACK;
            }
            elseif ($dec_nc > $max_nc) {
              // Stale nonce; send new challenge with stale notice.
              $status = STALE_NONCE;
              db_query("DELETE FROM {securesite_nonce} WHERE nonce = '%s' AND realm = '%s'", $fields['nonce'], $edit['realm']);
              $fields['nonce'] = uniqid();
            }
            else {
              // User authenticated; send response.
              $status = AUTHENTICATED;
            }
          }
          else {
            // Bad request; re-send challenge.
            $status = BAD_REQUEST;
          }
        }
      }
      else {
        // Response is invalid; re-send challenge.
        $status = WRONG_PASSWORD;
      }
    }
    else {
      // Unknown user; re-send challenge.
      $status = UNKNOWN_USER;
    }
  }
  else {
    // Bad request; re-send challenge.
    $status = BAD_REQUEST;
    if (!isset($edit['realm']) && !isset($fields['realm'])) {
      $uname = posix_uname();
      $edit['realm'] = $fields['realm'] = $uname['nodename'];
    }
    elseif (!isset($edit['realm']) && isset($fields['realm'])) {
      $edit['realm'] = $fields['realm'];
    }
    elseif (isset($edit['realm']) && !isset($fields['realm'])) {
      $fields['realm'] = $edit['realm'];
    }
    if (isset($fields['nonce'])) {
      $sn = db_fetch_array(db_query("SELECT qop, nc, opaque, hash FROM {securesite_nonce} WHERE nonce = '%s' AND realm = '%s'", $fields['nonce'], $edit['realm']));
    }
    else {
      $fields['nonce'] = uniqid();
    }
  }
  // Create output.
  switch ($status) {
    case BAD_REQUEST:
    case UNKNOWN_USER:
    case WRONG_PASSWORD:
    case REPLAY_ATTACK:
    case STALE_NONCE:
      if (isset($sn) && $sn !== FALSE) {
        $fields['opaque'] = $sn['opaque'];
        $fields['qop'] = $sn['qop'];
      }
      else {
        $fields['opaque'] = isset($fields['opaque']) ? $fields['opaque'] : base64_encode($fields['nonce']);
        $qop = isset($edit['entity-body']) ? 'auth,auth-int' : 'auth';
        $fields['qop'] = isset($fields['qop']) ? $fields['qop'] : $qop;
      }
      $challenge = array('realm="'. $fields['realm'] .'"', 'nonce="'. $fields['nonce'] .'"', 'qop="'. $fields['qop'] .'"', 'opaque="'. $fields['opaque'] .'"');
      if ($status == 'stale') {
        $challenge[] = 'stale=true';
      }
      if (!isset($sn) || $sn === FALSE) {
        $values = array('nonce' => $fields['nonce'], 'opaque' => $fields['opaque'], 'time' => $time, 'realm' => $edit['realm'], 'qop' => $fields['qop']);
        $values += isset($edit['entity-body']) ? array('hash' => md5($edit['entity-body'])) : array();
        $output = _digest_md5_challenge(array('values' => $values, 'challenge' => $challenge, 'new' => TRUE));
      }
      else {
        $output = _digest_md5_challenge(array('challenge' => $challenge, 'new' => FALSE));
      }
      break;
    case AUTHENTICATED:
      $response = array();
      if ($dec_nc < $max_nc) {
        $values = array('nonce' => $fields['nonce'], 'time' => $time, 'realm' => $edit['realm']);
        $values += isset($edit['entity-body']) ? array('hash' => md5($edit['entity-body'])) : array();
        $values += isset($fields['qop']) ? array('nc' => $dec_nc) : array();
        _digest_md5_challenge(array('values' => $values, 'new' => FALSE));
      }
      else {
        db_query("DELETE FROM {securesite_nonce} WHERE nonce = '%s' AND realm = '%s'", $fields['nonce'], $edit['realm']);
        $nextnonce = uniqid();
        $values = array('nonce' => $nextnonce, 'opaque' => $fields['opaque'], 'time' => $time, 'realm' => $edit['realm'], 'qop' => $fields['qop']);
        $values += isset($edit['entity-body']) ? array('hash' => md5($edit['entity-body'])) : array();
        _digest_md5_challenge(array('values' => $values, 'new' => TRUE));
        $response[] = 'nextnonce="'. $nextnonce .'"';
      }
      if (isset($fields['qop'])) {
        $response[] = 'qop='. $fields['qop'];
        switch ($fields['qop']) {
          case 'auth-int':
            $response[] = 'cnonce="'. $fields['cnonce'] .'"';
            $response[] = 'nc="'. $fields['nc'] .'"';
            $ha2 = md5(":$fields[uri]:$hash");
            break;
          case 'auth':
            $response[] = 'cnonce="'. $fields['cnonce'] .'"';
            $response[] = 'nc='. $fields['nc'];
            $ha2 = md5(":$fields[uri]");
            break;
          default:
            $ha2 = md5(":$fields[uri]");
            break;
        }
        $digest = md5("$ha1:$fields[nonce]:$fields[nc]:$fields[cnonce]:$fields[qop]:$ha2");
      }
      else {
        $digest = md5("$ha1:$fields[nonce]:". md5(":$fields[uri]"));
      }
      $response[] = 'rspauth="'. $digest .'"';
      $output = implode(', ', $response);
      break;
  }
  return array($output, $status);
}
