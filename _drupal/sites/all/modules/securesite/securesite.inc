<?php
/**
 * @file
 * Secure Site log-in functions.
 */

/**
 * Boot with selected authentication mechanism.
 */
function _securesite_boot($type) {
  global $user;
  switch ($type) {
    case SECURESITE_DIGEST:
      $edit = _securesite_parse_directives($_SERVER['PHP_AUTH_DIGEST']);
      $edit['name'] = $edit['username'];
      $edit['pass'] = NULL;
      $function = '_securesite_digest_auth';
      break;
    case SECURESITE_BASIC:
      $edit['name'] = isset($_SERVER['PHP_AUTH_USER']) ? $_SERVER['PHP_AUTH_USER'] : '';
      $edit['pass'] = isset($_SERVER['PHP_AUTH_PW']) ? $_SERVER['PHP_AUTH_PW'] : '';
      $function = '_securesite_plain_auth';
      break;
    case SECURESITE_FORM:
      if (!empty($_POST['openid_identifier'])) {
        openid_begin($_POST['openid_identifier'], $_POST['openid.return_to']);
      }
      $edit = array('name' => $_POST['name'], 'pass' => $_POST['pass']);
      $function = '_securesite_plain_auth';
      break;
  }
  // Are credentials different from current user?
  if ((!isset($user->name) || $edit['name'] !== $user->name) && (!isset($_SESSION['securesite_guest']) || $edit['name'] !== $_SESSION['securesite_guest'])) {
    $function($edit);
  }
}

/**
 * Parse digest header into an array of directives.
 */
function _securesite_parse_directives($field_value) {
  $directives = array();
  foreach (explode(',', trim($field_value)) as $directive) {
    list($directive, $value) = explode('=', trim($directive), 2);
    $directives[$directive] = trim($value, '"');
  }
  return $directives;
}

/**
 * Menu callback; handle restricted pages.
 */
function _securesite_403() {
  global $user;
  if (empty($user->uid) && !isset($_SESSION['securesite_guest']) && $_GET['q'] != 'user/logout') {
    _securesite_dialog(securesite_type_get());
  }
  else {
    $path = drupal_get_normal_path(variable_get('securesite_403', ''));
    menu_set_active_item($path);
    return menu_execute_active_handler($path);
  }
}

/**
 * Perform digest authentication.
 */
function _securesite_digest_auth($edit) {
  global $user;
  $realm = variable_get('securesite_realm', variable_get('site_name', 'Drupal'));
  $header = _securesite_digest_validate($status, array('data' => $_SERVER['PHP_AUTH_DIGEST'], 'method' => $_SERVER['REQUEST_METHOD'], 'uri' => request_uri(), 'realm' => $realm));
  $users = user_load_multiple(array(), array('name' => $edit['name'], 'status' => 1));
  $account = reset($users);
  if (empty($account->uid)) {
    // Not a registered user. See if we have guest user credentials.
    switch ($status) {
      case 1:
        drupal_add_http_header('Status', '400 Bad Request');
        _securesite_dialog(securesite_type_get());
        break;
      case 0:
        // Password is correct. Log user in.
        drupal_add_http_header($header['name'], $header['value']);
        $edit['pass'] = variable_get('securesite_guest_pass', '');
      default:
        _securesite_guest_login($edit);
        break;
    }
  }
  else {
    switch ($status) {
      case 0:
        // Password is correct. Log user in.
        drupal_add_http_header($header['name'], $header['value']);
        _securesite_user_login($edit, $account);
        break;
      case 2:
        // Password not stored. Request credentials using next most secure authentication method.
        $mechanism = _securesite_mechanism();
        $types = variable_get('securesite_type', array(SECURESITE_BASIC));
        rsort($types);
        foreach ($types as $type) {
          if ($type < $mechanism) {
            break;
          }
        }
        watchdog('user', 'Secure log-in failed for %user.', array('%user' => $edit['name']));
        drupal_set_message(t('Secure log-in failed. Please try again.'), 'error');
        _securesite_dialog($type);
        break;
      case 1:
        drupal_add_http_header('Status', '400 Bad Request');
      default:
        // Authentication failed. Request credentials using most secure authentication method.
        watchdog('user', 'Log-in attempt failed for %user.', array('%user' => $edit['name']));
        drupal_set_message(t('Unrecognized user name and/or password.'), 'error');
        _securesite_dialog(securesite_type_get());
        break;
    }
  }
}

/**
 * Get the result of digest validation.
 *
 * @param $status
 *   Will be set to the return status of the validation script
 * @param $edit
 *   An array of parameters to pass to the validation script
 * @return
 *   An HTTP header string.
 */
function _securesite_digest_validate(&$status, $edit = array()) {
  static $header;
  if (!empty($edit)) {
    $args = array();
    foreach ($edit as $key => $value) {
      $args[] = "$key=" . escapeshellarg($value);
    }
    $script = variable_get('securesite_digest_script', drupal_get_path('module', 'securesite') . '/digest_md5/digest_md5.php');
    $response = exec($script . ' ' . implode(' ', $args), $output, $status);

    // drupal_set_header() is now drupal_add_http_header() and requires headers passed as name, value in an array.
    // The script returns a string, so we shall break it up as best we can. The existing code doesn't seem
    // to worry about correct data to append to 'WWW-Authenticate: ' etc so I won't add any for the D7 conversion.
    $response = explode('=', $response);
    $name = array_shift($response);
    $value = implode('=', $response);

    if (isset($edit['data']) && empty($status)) {
      $header = array('name' => "Authentication-Info: " . $name, 'value' => $value);
    }
    else {
      $header = array('name' => "WWW-Authenticate: Digest " . $name, 'value' => $value);
    }
  }
  return $header;
}

/**
 * Perform plain authentication.
 */
function _securesite_plain_auth($edit) {
  // We cant set username to be a required field so we check here if it is empty
  if (empty($edit['name'])) {
    drupal_set_message(t('Unrecognized user name and/or password.'), 'error');
    _securesite_dialog(securesite_type_get());
  }

  $users = user_load_multiple(array(), array('name' => $edit['name'], 'status' => 1));
  $account = reset($users);
  if (empty($account->uid)) {
    // Not a registered user.
    // If we have correct LDAP credentials, register this new user.
    if (module_exists('ldapauth') && _ldapauth_auth($edit['name'], $edit['pass'], TRUE) !== FALSE) {
      $users = user_load_multiple(array(), array('name' => $edit['name'], 'status' => 1));
      $account = reset($users);
      // System should be setup correctly now, perform log-in.
      _securesite_user_login($edit, $account);
    }
    else {
      // See if we have guest user credentials.
      _securesite_guest_login($edit);
    }
  }
  else {
    require_once DRUPAL_ROOT . '/' . variable_get('password_inc', 'includes/password.inc');
    if (user_check_password($edit['pass'], $account) || module_exists('ldapauth') && _ldapauth_auth($edit['name'], $edit['pass']) !== FALSE) {
      // Password is correct. Perform log-in.
      _securesite_user_login($edit, $account);
    }
    else {
      // Request credentials using most secure authentication method.
      watchdog('user', 'Log-in attempt failed for %user.', array('%user' => $edit['name']));
      drupal_set_message(t('Unrecognized user name and/or password.'), 'error');
      _securesite_dialog(securesite_type_get());
    }
  }
}

/**
 * Log in authenticated user.
 */
function _securesite_user_login($edit, $account) {
  if (user_access('access secured pages', $account)) {
    global $user;
    $user = $account;
    user_login_finalize($edit);
    
    // Mark the session so Secure Site will be triggered on log-out.
    $_SESSION['securesite_login'] = TRUE;
    
    // Unset the session variable set by securesite_denied().
    unset($_SESSION['securesite_denied']);
    // Unset messages from previous log-in attempts.
    unset($_SESSION['messages']);
    // Clear the guest session.
    unset($_SESSION['securesite_guest']);
    
    // Always redirect to prevent access denied errors
    $path = $_GET['q'];
    // Prevent a log-in/log-out loop by redirecting off the log-out page.
    if ($_GET['q'] == 'user/logout') {
      $path = '';
    }
    drupal_goto($path);
  }
  else {
    _securesite_denied(t('You have not been authorized to log in to secured pages.'));
  }
}

/**
 * Log in guest user.
 */
function _securesite_guest_login($edit) {
  $guest_name = variable_get('securesite_guest_name', '');
  $guest_pass = variable_get('securesite_guest_pass', '');
  // Check anonymous user permission and credentials.
  if (user_access('access secured pages') && (empty($guest_name) || $edit['name'] == $guest_name) && (empty($guest_pass) || $edit['pass'] == $guest_pass)) {
    // Unset the session variable set by securesite_denied().
    if(isset($_SESSION['securesite_denied'])){
      unset($_SESSION['securesite_denied']);
    }
    // Mark this session to prevent re-login (note: guests can't log out).
    $_SESSION['securesite_guest'] = $edit['name'];
    $_SESSION['securesite_login'] = TRUE;
    // Prevent a 403 error by redirecting off the logout page.
    if ($_GET['q'] == 'user/logout') {
      drupal_goto();
    }
  }
  else {
    if (empty($edit['name'])) {
      watchdog('user', 'Log-in attempt failed for <em>anonymous</em> user.');
      _securesite_denied(t('Anonymous users are not allowed to log in to secured pages.'));
    }
    else {
      watchdog('user', 'Log-in attempt failed for %user.', array('%user' => $edit['name']));
      drupal_set_message(t('Unrecognized user name and/or password.'), 'error');
      _securesite_dialog(securesite_type_get());
    }
  }
}

/**
 * Deny access to users who are not authorized to access secured pages.
 */
function _securesite_denied($message) {
  if (empty($_SESSION['securesite_denied'])) {
    // Unset messages from previous log-in attempts.
    if (isset($_SESSION['messages'])) {
      unset($_SESSION['messages']);
    }
    // Set a session variable so that the log-in dialog will be displayed when the page is reloaded.
    $_SESSION['securesite_denied'] = TRUE;
    drupal_add_http_header('Status', '403 Forbidden');
    drupal_set_title(t('Access denied'));
    drupal_set_message(filter_xss($message), 'error');
    
    // Theme and display output
    $content = _securesite_dialog_page();
    print theme('securesite_page', array('content' => $content));
    
    // Exit
    module_invoke_all('exit');
    exit();
  }
  else {
    unset($_SESSION['securesite_denied']);
    // Safari will attempt to use old credentials before requesting new credentials
    // from the user. Logging out requires that the WWW-Authenticate header be sent
    // twice.
    $user_agent = (isset($_SERVER['HTTP_USER_AGENT']) ? drupal_strtolower($_SERVER['HTTP_USER_AGENT']) : '');
    if ($user_agent != str_replace('safari', '', $user_agent)) {
      $_SESSION['securesite_repeat'] = TRUE;
    }
    $types = variable_get('securesite_type', array(SECURESITE_BASIC));
    if (in_array(SECURESITE_DIGEST, $types)) {
      // Reset the digest header.
      $realm = variable_get('securesite_realm', variable_get('site_name', 'Drupal'));
      _securesite_digest_validate($status, array('realm' => $realm, 'fakerealm' => _securesite_fake_realm()));
    }
    _securesite_dialog(securesite_type_get());
  }
}

/**
 * Determine if Secure Site authentication should be forced.
 */
function _securesite_forced() {
  global $base_path;
  // Do we require credentials to display this page?
  if (php_sapi_name() == 'cli' || $_GET['q'] == 'admin/reports/request-test') {
    return FALSE;
  }
  else {
    switch (variable_get('securesite_enabled', SECURESITE_DISABLED)) {
      case SECURESITE_ALWAYS:
        return TRUE;
      case SECURESITE_OFFLINE:
        return variable_get('site_offline', FALSE);
      default:
        return FALSE;
    }
  }
}

/**
 * Display authentication dialog and send password reset mails.
 *
 * @param $type
 *   The type of authentication dialog to display.
 */
function _securesite_dialog($type) {
  global $base_path, $language;
  // Has the password reset form been submitted?
  if (isset($_POST['form_id']) && $_POST['form_id'] == 'securesite_user_pass') {
    // Get form messages, but do not display form.
    drupal_get_form('securesite_user_pass');
    $content = '';
  }
  // Are we on a password reset page?
  elseif (strpos($_GET['q'], 'user/reset/') === 0 || module_exists('locale') && $language->enabled && strpos($_GET['q'], $language->prefix . '/user/reset/') === 0) {
    $args = explode('/', $_GET['q']);
    if (module_exists('locale') && $language->enabled && $language->prefix != '') {
      // Remove the language argument.
      array_shift($args);
    }
    // The password reset function doesn't work well if it doesn't have all the
    // required parameters or if the UID parameter isn't valid
    if (count($args) < 5 || count(user_load_multiple(array(), array('uid' => $args[2], 'status' => 1))) == 0) {
      $error = t('You have tried to use an invalid one-time log-in link.');
      $reset = variable_get('securesite_reset_form', t('Enter your user name or e-mail address.'));
      if (empty($reset)) {
        drupal_set_message($error, 'error');
        $content = '';
      }
      else {
        $error .= ' ' . t('Please request a new one using the form below.');
        drupal_set_message($error, 'error');
        $content = drupal_get_form('securesite_user_pass');
      }
    }
  }
  // Allow OpenID log-in page to bypass dialog.
  elseif (!module_exists('openid') || $_GET['q'] != 'openid/authenticate') {
    // Display log-in dialog.
    switch ($type) {
      case SECURESITE_DIGEST:
        $header = _securesite_digest_validate($status);
        if (empty($header)) {
          $realm = variable_get('securesite_realm', variable_get('site_name', 'Drupal'));
          $header = _securesite_digest_validate($status, array('realm' => $realm, 'fakerealm' => _securesite_fake_realm()));
        }
        if (strpos($header, 'WWW-Authenticate') === 0) {
          drupal_add_http_header('Status', '401 Unauthorized');
        }
        else {
          drupal_add_http_header($header['name'], $header['value']);
        }
        break;
      case SECURESITE_BASIC:
        drupal_add_http_header('WWW-Authenticate', 'Basic realm="' . _securesite_fake_realm() . '"');
        drupal_add_http_header('Status', '401 Unauthorized');
        break;
      case SECURESITE_FORM:
        drupal_add_http_header('Status', '200 OK');
        break;
    }
    // Form authentication doesn't work for cron, so allow cron.php to run
    // without authenticating when no other authentication type is enabled.
    if (request_uri() != $base_path . 'cron.php' || variable_get('securesite_type', array(SECURESITE_BASIC)) != array(SECURESITE_FORM)) {
      drupal_set_title(t('Authentication required'));
      $content = _securesite_dialog_page();
    }
  }
  if (isset($content)) {
    // Theme and display output
    print theme('securesite_page', array('content' => $content));
    
    // Exit page
    module_invoke_all('exit');
    exit();
  }
}

/**
 * Opera and Internet Explorer save credentials indefinitely and will keep
 * attempting to use them even when they have failed multiple times. We add a
 * random string to the realm to allow users to log out.
 */
function _securesite_fake_realm() {
  $realm = variable_get('securesite_realm', variable_get('site_name', 'Drupal'));
  $user_agent = (isset($_SERVER['HTTP_USER_AGENT']) ? drupal_strtolower($_SERVER['HTTP_USER_AGENT']) : '');
  if ($user_agent != str_replace(array('msie', 'opera'), '', $user_agent)) {
    $realm .= ' - ' . mt_rand(10, 999);
  }
  return $realm;
}

/**
 * Display fall-back HTML for HTTP authentication dialogs. Safari will not load
 * this. Opera will not load this after log-out unless the page has been
 * reloaded and the authentication dialog has been displayed twice.
 */
function _securesite_dialog_page() {
  $reset = variable_get('securesite_reset_form', t('Enter your user name or e-mail address.'));
  if (in_array(SECURESITE_FORM, variable_get('securesite_type', array(SECURESITE_BASIC)))) {
    $user_login = drupal_get_form('securesite_user_login_form');
    $output = render($user_login);
    if (!empty($reset)) {
      $user_pass = drupal_get_form('securesite_user_pass');
      $output .= "<hr />\n" . render($user_pass);
    }
  }
  else {
    if (!empty($reset)) {
      $user_pass = drupal_get_form('securesite_user_pass');
      $output = render($user_pass);
    }
    else {
      $output = '<p>' . t('Reload the page to try logging in again.') . '</p>';
    }
  }
  return $output;
}

/**
 * We use our own version of the log-in form for theming. We do not use the
 * default validate and submit functions because we may allow anonymous users.
 *
 * @ingroup forms
 * @see user_login()
 */
function securesite_user_login_form($form, &$form_state) {
  $form['name'] = array(
    '#type' => 'textfield',
    '#title' => t('User name'),
    '#maxlength' => USERNAME_MAX_LENGTH,
    '#size' => 15,
  );
  $form['pass'] = array(
    '#type' => 'password',
    '#title' => t('Password'),
    '#maxlength' => 60,
    '#size' => 15,
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Log in'),
    '#weight' => 2,
  );
  if (module_exists('openid')) {
    global $base_path;
    $style = '<style type="text/css" media="all">' . "\n" .
             '#securesite-user-login li.openid-link {' . "\n" .
             '  background:transparent url(' . $base_path . drupal_get_path('module', 'openid') . '/login-bg.png) no-repeat scroll 1px 0.35em;' . "\n" .
             '}' . "\n" .
             '</style>';
    drupal_set_html_head($style);
  }

  // drupal_alter takes this variable by reference so can't be a literal.
  $form_id = 'user_login';
  drupal_alter('form', $form, $form_state, $form_id);
  return $form;
}

/**
 * We use our own version of the password reset form for theming.
 *
 * @ingroup forms
 * @see user_pass_validate()
 * @see user_pass_submit()
 */
function securesite_user_pass($form, &$form_state) {
  module_load_include('inc', 'user', 'user.pages');
  $form = user_pass();
  $form['name']['#title'] = t('User name or e-mail address');
  $form_id = 'user_pass';
  drupal_alter('form', $form, $form_state, $form_id);
  $form['#redirect'] = FALSE;
  $form['#validate'][] = 'user_pass_validate';
  $form['#submit'][] = 'user_pass_submit';
  return $form;
}

function securesite_type_get() {
  $securesite_type = variable_get('securesite_type', array(SECURESITE_BASIC));
  return array_pop($securesite_type);
}
