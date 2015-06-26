<?php
/**
 * @file
 * Variable module integration.
 */

/**
 * Implements hook_variable_info().
 */
function securesite_variable_info() {
  $variable = array();

  $variable['securesite_enabled'] = array(
    'title' => t('Force authentication'),
    'description' => t('Choose when to force authentication.'),
    'type' => 'select',
    'options' => array(
      SECURESITE_DISABLED => t('Never'),
      SECURESITE_ALWAYS => t('Always'),
      SECURESITE_OFFLINE => t('During maintenance'),
      SECURESITE_403 => t('On restricted pages'),
    ),
    'default' => SECURESITE_DISABLED,
  );

  $variable['securesite_type'] = array(
    'title' => t('Allowed authentication types'),
    'type' => 'options',
    'options' => array(
      SECURESITE_DIGEST => t('HTTP digest'),
      SECURESITE_BASIC => t('HTTP basic'),
      SECURESITE_FORM => t('HTML log-in form'),
    ),
    'default' => array(SECURESITE_BASIC),
    'required' => TRUE,
  );
  $variable['securesite_type']['description'] = "\n<p>" .
    t('HTTP authentication requires extra configuration if PHP is not installed as an Apache module. See the !link section of the Secure Site help for details.', array('!link' => l(t('Known issues'), 'admin/help/securesite', array('fragment' => 'issues')))) . "</p>\n<p>" .
    t('Digest authentication protects a user&rsquo;s password from eavesdroppers when you are not using SSL to encrypt the connection. However, it can only be used when a copy of the password is stored on the server.') . ' ' .
    t('For security reasons, Drupal does not store passwords. You will need to configure scripts to securely save passwords and authenticate users. See the !link section of the Secure Site help for details.', array('!link' => l(t('Secure password storage'), 'admin/help/securesite', array('fragment' => 'passwords')))) . "</p>\n<p>" .
    t('When digest authentication is enabled, passwords will be saved when users log in or set their passwords. If you use digest authentication to protect your whole site, you should allow guest access or allow another authentication type until users whose passwords are not yet saved have logged in. Otherwise, <strong>you may lock yourself out of your own site.</strong>') . '</p>' . "\n";

  $variable['securesite_digest_script'] = array(
    'title' => t('Digest authentication script'),
    'description' => t('Enter the digest authentication script exactly as it should appear on the command line. Use absolute paths.'),
    'type' => 'text',
    'default' => drupal_get_path('module', 'securesite') . '/digest_md5/digest_md5.php',
  );

  $variable['securesite_password_script'] = array(
    'title' => t('Password storage script'),
    'description' => t('Enter the password storage script exactly as it should appear on the command line. Use absolute paths.'),
    'type' => 'text',
    'default' => drupal_get_path('module', 'securesite') . '/digest_md5/stored_passwords.php',
  );

  $variable['securesite_realm'] = array(
    'title' => t('Authentication realm'),
    'description' => t('Name to identify the log-in area in the HTTP authentication dialog.'),
    'default' => variable_get('site_name', 'Drupal'),
  );

  $variable['securesite_guest_name'] = array(
    'title' => t('Guest user'),
    'description' => t('Do not use the name of a registered user. Leave empty to accept any name.'),
    'default' => '',
  );

  $variable['securesite_guest_pass'] = array(
    'title' => t('Guest password'),
    'description' => t('Leave empty to accept any password.'),
    'default' => '',
  );

  $variable['securesite_login_form'] = array(
    'title' => t('Custom message for HTML log-in form'),
    'type' => 'text',
    'default' => t('Enter your user name and password:'),
  );

  $variable['securesite_reset_form'] = array(
    'title' => t('Custom message for password reset form'),
    'description' => t('Leave empty to disable Secure Site&rsquo;s password reset form.'),
    'type' => 'text',
    'default' => t('Enter your user name or e-mail address:'),
  );

  return $variable;
}
