<?php

/**
 * @file
 * Secure Site administration pages.
 */

/**
 * Module help page.
 */
function _securesite_admin_help() {
  return '<p>' . t('Secure Site allows site administrators to make a site or part of a site private. You can restrict access to the site by role. This means the site will be inaccessible to search engines and other crawlers, but you can still allow access to certain people.') . '</p>' . "\n" .
  '<p>' . t('You can also secure remote access to RSS feeds. You can keep content private and protected, but still allow users to get notification of new content and other actions via RSS with news readers that support <em>user:pass@example.com/node/feed</em> URLs, or have direct support for user name and password settings. This is especially useful when paired with the Organic Groups module or other node access systems.') . '</p>' . "\n" .
  '<h3>' . t('Configuration') . '</h3>' . "\n" .
  '<ul>' . "\n" .
  '  <li>' . t('Force authentication') . "\n" .
  '    <p>' . t('This setting controls whether users will be forced to authenticate before viewing pages. By default, authentication is never forced.') . '</p>' . "\n" .
  '    <ol>' . "\n" .
  '      <li>' . t('Never') . "\n" .
  '        <p>' . t('This setting will prevent Secure Site from hiding pages.') . '</p>' . "\n" .
  '      </li>' . "\n" .
  '      <li>' . t('Always') . "\n" .
  '        <p>' . t('This setting will hide your entire site from unauthenticated users.') . "\n" .
  '      </li>' . "\n" .
  '      <li>' . t('During maintenance') . "\n" .
  '        <p>' . t('This setting will hide your site during maintenance.') . "\n" .
  '      </li>' . "\n" .
  '      <li>' . t('On restricted pages') . "\n" .
  '        <p>' . t('This setting will hide only pages that anonymous users cannot access.') . "\n" .
  '      </li>' . "\n" .
  '    </ol>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Authentication type') . "\n" .
  '    <p>' . t('Three methods of authentication are available. Please note that HTTP authentication requires extra configuration if PHP is not installed as an Apache module. See the <a href="#issues">Known issues</a> section for details.') . "\n" .
  '    <ol>' . "\n" .
  '      <li>' . t('HTTP digest') . "\n" .
  '        <p>' . t('This will enable HTTP digest authentication. The user&rsquo;s browser will prompt for the user&rsquo;s name and password before displaying the page.') . '</p>' . "\n" .
  '        <p>' . t('Digest authentication protects a user&rsquo;s password from eavesdroppers when you are not using SSL to encrypt the connection. However, it can only be used when a copy of the password is stored on the server. For security reasons, Drupal does not store passwords. You will need to configure scripts to securely save passwords and authenticate users. See the <a href="#passwords">Secure password storage</a> section for details.') . '</p>' . "\n" .
  '        <p>' . t('When digest authentication is enabled, passwords will be saved when users log in or set their passwords. If you use digest authentication to protect your whole site, you should allow guest access or allow another authentication type until users whose passwords are not yet saved have logged in. Otherwise, you may lock yourself out of your own site.') . '</p>' . "\n" .
  '      </li>' . "\n" .
  '      <li>' . t('HTTP basic') . "\n" .
  '        <p>' . t('This will enable HTTP basic authentication. The user&rsquo;s browser will prompt for the user&rsquo;s name and password before displaying the page. Basic authentication is not secure unless you are using SSL to encrypt the connection.') . '</p>' . "\n" .
  '      </li>' . "\n" .
  '      <li>' . t('HTML log-in form') . "\n" .
  '        <p>' . t('This method uses a themeable HTML log-in form for user name and password input. This method is the most reliable as it does not rely on the browser for authentication. Like HTTP basic, it is insecure unless you are using SSL to encrypt the connection.') . '</p>' . "\n" .
  '      </li>' . "\n" .
  '    </ol>' . "\n" .
  '    <p>' . t('HTTP authentication is recommended for secure feeds, because feed readers are not likely to be able to handle forms. You can enable all three types of authentication at the same time.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Digest authentication script') . "\n" .
  '    <p>' . t('For security, HTTP digest authentication uses an external script to check passwords. Enter the digest authentication script exactly as it would appear on the command line.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Password storage script') . "\n" .
  '    <p>' . t('For security, HTTP digest authentication uses an external script to save passwords. Enter the password storage script exactly as it would appear on the command line.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Authentication realm') . "\n" .
  '    <p>' . t('You can use this field to name your log-in area. This is primarily used with HTTP Auth.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Guest user name and password') . "\n" .
  '    <p>' . t('If you give anonymous users the <em>!access</em> permission, you can set a user name and password for anonymous users. If not set, guests can use any name and password.', array('!access' => l(t('access secured pages'), 'admin/people/permissions', array('fragment' => 'module-securesite')))) . '</p>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Customize HTML forms') . "\n" .
  '    <p>' . t('<em>Custom message for log-in form</em> and <em>Custom message for password reset form</em> are used in the HTML forms when they are displayed. If the latter box is empty, Secure Site will not offer to reset passwords. Please note, the log-in form is only displayed when the HTML log-in form authentication mode is used.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '</ul>' . "\n" .
  '<h3><a name="passwords">' . t('Secure password storage') . '</a></h3>' . "\n" .
  '<p>' . t('Digest authentication avoids transmitting passwords by exchanging character strings (digests) that prove both the user and the Web server know the password. This requires passwords for all users to be stored on the server. It is very important to ensure that these passwords cannot be exposed to unauthorized users. Drupal should be able to store passwords without being able to retrieve them.') . '</p>' . "\n" .
  '<p>' . t('Secure Site provides scripts that can handle stored passwords securely when properly set up. These scripts are contained in the <em>digest_md5</em> directory. There are two scripts in this directory:') . '</p>' . "\n" .
  '<dl>' . "\n" .
  '  <dt>stored_passwords.php</dt><dd>' . t('Add, delete, and update user passwords.') . '</dd>' . "\n" .
  '  <dt>digest_md5.php</dt><dd>' . t('Perform digest authentication.') . '</dd>' . "\n" .
  '</dl>' . "\n" .
  '<p>' . t('You can get help for these scripts by typing the script name followed by <em>--help</em> on the command line. You must be able to run PHP from the command line. Some configuration is required to make the scripts work properly:') . '</p>' . "\n" .
  '<ol>' . "\n" .
  '  <li>' . t('Set up a secure database') . "\n" .
  '    <p>' . t('You can set up a password database in the same way you create a Drupal database. Your password database should have its own user. No other database users should have access to the password database.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Edit the configuration file') . "\n" .
  '    <p>' . t('Configuration settings for the scripts are in the <em>digest_md5.conf.php</em> file in the <em>digest_md5</em> directory. You must set <em>$db_url</em> to point to your password database. If you want to be able to use the scripts from the command-line, you must set <em>$drupal</em> to the absolute path of your Drupal installation. When you are done editing the configuration file, make it read-only.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Control access to the scripts') . "\n" .
  '    <p>' . t('The first thing you can do to secure the scripts is to move the <em>digest_md5</em> directory to a location that is not accessible from the Internet. The configuration file especially needs protection, because it contains information that allows access to the password database. On the Secure Site settings page, change the digest authentication script and password storage script to point to the new location. For example, if you moved the <em>digest_md5</em> directory to <em>/usr/local</em>, you would use') . '</p>' . "\n" .
  '    <pre>/usr/local/digest_md5/digest_md5.php' . "\n" .
           '/usr/local/digest_md5/stored_passwords.php</pre>' . "\n" .
  '    <p>' . t('If the <em>sudo</em> command is available on your system, you can change the file system permissions on the all the files in the <em>digest_md5</em> directory so that only adminstrators have access to them. You would then add the user your Web server runs as to the <em>sudoers</em> file. A sample <em>sudoers</em> file is provided in the <em>digest_md5</em> directory for comparison. The important lines are') . '</p>' . "\n" .
  '    <pre>Defaults:apache	!authenticate' . "\n" .
           'Defaults:apache	!lecture' . "\n" .
           'apache	ALL=/usr/local/digest_md5/stored_passwords.php [A-z]*' . "\n" .
           'apache	ALL=/usr/local/digest_md5/digest_md5.php [A-z]*</pre>' . "\n" .
  '    <p>' . t('This allows <em>apache</em> to use <em>sudo</em> only to run <em>stored_passwords.php</em> and <em>digest_md5.php</em>. Replace <em>apache</em> with the name of the Web server user on your system, and replace <em>/usr/local</em> with the directory in which you placed the <em>digest_md5</em> directory. On the Secure Site settings page, add <em>sudo</em> at the beginning of the line for the digest authentication script and the password storage script:') . '</p>' . "\n" .
  '    <pre>sudo /usr/local/digest_md5/digest_md5.php' . "\n" .
           'sudo /usr/local/digest_md5/stored_passwords.php</pre>' . "\n" .
  '    <p>' . t('If the rest of your system is secure, Drupal can now store passwords without having the ability to retrieve them.') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '</ol>' . "\n" .
  '<h3>' . t('Theming') . '</h3>' . "\n" .
  '<p>' . t('Secure Site&rsquo;s HTML output is controlled by three files:') . '</p>' . "\n" .
  '<dl>' . "\n" .
  '  <dt>securesite-page.tpl.php<dt><dd>' . t('Template for Secure Site pages. Works in the same way as page.tpl.php.') . '</dd>' . "\n" .
  '  <dt>securesite-user-login.tpl.php<dt><dd>' . t('Template for the user log-in form.') . '</dd>' . "\n" .
  '  <dt>securesite-user-pass.tpl.php<dt><dd>' . t('Template for the password reset form.') . '</dd>' . "\n" .
  '</dl>' . "\n" .
  '<p>' . t('You can theme Secure Site&rsquo;s HTML output by copying these files to your theme&rsquo;s directory. The files in your theme&rsquo;s directory will become the templates for all Secure Site HTML output.') . '</p>' . "\n" .
  '<h3>' . t('Configuring cron jobs') . '</h3>' . "\n" .
  '<p>' . t('If HTTP authentication is forced, cron jobs will need to authenticate themselves. See !link for more details on configuring cron jobs. These examples show how to add a user name and password (note: Lynx does not support digest authentication):', array('!link' => l(t('Configuring cron jobs'), 'http://drupal.org/cron'))) . '</p>' . "\n" .
  '<pre>45 * * * * /usr/bin/lynx -auth=<em>username</em>:<em>password</em> -source http://example.com/cron.php' . "\n" .
       '45 * * * * /usr/bin/wget --user=<em>username</em> --password=<em>password</em> -O - -q http://example.com/cron.php' . "\n" .
       '45 * * * * /usr/bin/curl --anyauth --user <em>username</em>:<em>password</em> --silent --compressed http://example.com/cron.php</pre>' . "\n" .
  '<h3><a name="issues">' . t('Known issues') . '</a></h3>' . "\n" .
  '<ul>' . "\n" .
  '  <li>' . t('Authentication on PHP/CGI installations') . "\n" .
  '    <p>' . t('If you are using HTTP authentication and are unable to log in, PHP could be running in CGI mode. When run in CGI mode, the normal HTTP authentication variables are not available to PHP. To work around this issue, add the following rewrite rule at the end of the .htaccess file in Drupal&rsquo;s installation directory:') . '</p>' . "\n" .
  '    <pre>RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]</pre>' . "\n" .
  '    <p>' . t('After making the suggested change in Drupal 6, the rewrite rules would look like this:') . '</p>' . "\n" .
  '    <pre># Rewrite URLs of the form \'x\' to the form \'index.php?q=x\'.' . "\n" .
           'RewriteCond %{REQUEST_FILENAME} !-f' . "\n" .
           'RewriteCond %{REQUEST_FILENAME} !-d' . "\n" .
           'RewriteCond %{REQUEST_URI} !=/favicon.ico' . "\n" .
           'RewriteRule ^(.*)$ index.php?q=$1 [L,QSA]' . "\n" .
           'RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]</pre>' . "\n" .
  '  </li>' . "\n" .
  '  <li>' . t('Authentication when running Drupal via IIS') . "\n" .
  '    <p>' . t('If you are using HTTP authentication and are unable to log in when Drupal is running on an IIS server, make sure that the PHP directive <em>cgi.rfc2616_headers</em> is set to <em>0</em> (the default value).') . '</p>' . "\n" .
  '  </li>' . "\n" .
  '</ul>' . "\n";
}

/**
 * FAPI definition for Secure Site admin settings form
 * @ingroup forms
 * @see system_settings_form()
 * @see securesite_admin_settings_validate()
 * @see securesite_admin_settings_submit()
 */
function securesite_admin_settings() {
  $form['authentication'] = array(
    '#type' => 'fieldset',
    '#title' => t('Authentication'),
    '#description' => t('Enable Secure Site below. Users must have the <em>!access</em> permission in order to access the site if authentication is forced.', array('!access' => l(t('access secured pages'), 'admin/people/permissions', array('fragment' => 'module-securesite'))))
  );
  $form['authentication']['securesite_enabled'] = array(
    '#type' => 'radios',
    '#title' => t('Force authentication'),
    '#default_value' => variable_get('securesite_enabled', SECURESITE_DISABLED),
    '#options' => array(
      SECURESITE_DISABLED => t('Never'),
      SECURESITE_ALWAYS => t('Always'),
      SECURESITE_OFFLINE => t('During maintenance'),
      SECURESITE_403 => t('On restricted pages'),
    ),
    '#description' => t('Choose when to force authentication.'),
  );
  $form['authentication']['securesite_type'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Allowed authentication types'),
    '#default_value' => variable_get('securesite_type', array(SECURESITE_BASIC)),
    '#options' => array(
      SECURESITE_DIGEST => t('HTTP digest'),
      SECURESITE_BASIC => t('HTTP basic'),
      SECURESITE_FORM => t('HTML log-in form'),
    ),
    '#required' => TRUE,
  );
  $form['authentication']['securesite_type']['#description'] = "\n<p>" .
    t('HTTP authentication requires extra configuration if PHP is not installed as an Apache module. See the !link section of the Secure Site help for details.', array('!link' => l(t('Known issues'), 'admin/help/securesite', array('fragment' => 'issues')))) . "</p>\n<p>" .
    t('Digest authentication protects a user&rsquo;s password from eavesdroppers when you are not using SSL to encrypt the connection. However, it can only be used when a copy of the password is stored on the server.') . ' ' .
    t('For security reasons, Drupal does not store passwords. You will need to configure scripts to securely save passwords and authenticate users. See the !link section of the Secure Site help for details.', array('!link' => l(t('Secure password storage'), 'admin/help/securesite', array('fragment' => 'passwords')))) . "</p>\n<p>" .
    t('When digest authentication is enabled, passwords will be saved when users log in or set their passwords. If you use digest authentication to protect your whole site, you should allow guest access or allow another authentication type until users whose passwords are not yet saved have logged in. Otherwise, <strong>you may lock yourself out of your own site.</strong>') . '</p>' . "\n";
  $form['authentication']['securesite_digest_script'] = array(
    '#type' => 'textarea',
    '#title' => t('Digest authentication script'),
    '#default_value' => variable_get('securesite_digest_script', drupal_get_path('module', 'securesite') . '/digest_md5/digest_md5.php'),
    '#description' => t('Enter the digest authentication script exactly as it should appear on the command line. Use absolute paths.'),
    '#rows' => 2,
  );
  $form['authentication']['securesite_password_script'] = array(
    '#type' => 'textarea',
    '#title' => t('Password storage script'),
    '#default_value' => variable_get('securesite_password_script', drupal_get_path('module', 'securesite') . '/digest_md5/stored_passwords.php'),
    '#description' => t('Enter the password storage script exactly as it should appear on the command line. Use absolute paths.'),
    '#rows' => 2,
  );
  $form['authentication']['securesite_realm'] = array(
    '#type' => 'textfield',
    '#title' => t('Authentication realm'),
    '#default_value' => variable_get('securesite_realm', variable_get('site_name', 'Drupal')),
    '#length' => 30,
    '#maxlength' => 40,
    '#description' => t('Name to identify the log-in area in the HTTP authentication dialog.'),
  );
  $form['guest'] = array(
    '#type' => 'fieldset',
    '#title' => t('Guest access'),
    '#description' => t('Guest access allows anonymous users to view secure pages, though they will still be prompted for a user name and password. If you give anonymous users the <em>!access</em> permission, you can set the user name and password for anonymous users below.', array('!access' => l(t('access secured pages'), 'admin/people/permissions', array('fragment' => 'module-securesite')))),
  );
  $guest_access = !user_access('access secured pages', drupal_anonymous_user());
  $form['guest']['securesite_guest_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Guest user'),
    '#default_value' => variable_get('securesite_guest_name', ''),
    '#length' => 30,
    '#maxlength' => 40,
    '#description' => t('Do not use the name of a registered user. Leave empty to accept any name.'),
    '#disabled' => $guest_access,
  );
  $form['guest']['securesite_guest_pass'] = array(
    '#type' => 'textfield',
    '#title' => t('Guest password'),
    '#default_value' => variable_get('securesite_guest_pass', ''),
    '#length' => 30,
    '#maxlength' => 40,
    '#description' => t('Leave empty to accept any password.'),
    '#disabled' => $guest_access,
  );
  $form['login_form'] = array(
    '#type' => 'fieldset',
    '#title' => t('Customize HTML forms'),
    '#description' => t('Configure the message displayed on the HTML log-in form (if enabled) and password reset form below.')
  );
  $form['login_form']['securesite_login_form'] = array(
    '#type' => 'textarea',
    '#title' => t('Custom message for HTML log-in form'),
    '#default_value' => variable_get('securesite_login_form', t('Enter your user name and password:')),
    '#length' => 60,
    '#height' => 3,
  );
  $form['login_form']['securesite_reset_form'] = array(
    '#type' => 'textarea',
    '#title' => t('Custom message for password reset form'),
    '#default_value' => variable_get('securesite_reset_form', t('Enter your user name or e-mail address:')),
    '#length' => 60,
    '#height' => 3,
    '#description' => t('Leave empty to disable Secure Site&rsquo;s password reset form.'),
  );
  $form['#submit'][] = 'securesite_admin_settings_submit';
  return system_settings_form($form);
}

function securesite_admin_settings_validate($form, &$form_state) {
  foreach ($form_state['values']['securesite_type'] as $type => $value) {
    if (empty($value)) {
      unset($form_state['values']['securesite_type'][$type]);
    }
  }
  sort($form_state['values']['securesite_type']);

  $name = $form_state['values']['securesite_guest_name'];
  if ($name && db_query_range("SELECT name FROM {users} WHERE name = :name", 0, 1, array(':name' => $name))->fetchField() == $name) {
    form_set_error('securesite_guest_name', t('The name %name belongs to a registered user.', array('%name' => $name)));
  }
}

/**
 * Configure access denied page and manage stored guest password.
 */
function securesite_admin_settings_submit($form, &$form_state) {
  $values = $form_state['values'];
  if ($values['securesite_enabled'] != SECURESITE_403 || isset($values['op']) && $values['op'] == t('Reset to defaults')) {
    variable_set('site_403', variable_get('securesite_403', variable_get('site_403', '')));
    variable_del('securesite_403');
  }
  else {
    variable_set('securesite_403', variable_get('site_403', ''));
    variable_set('site_403', 'securesite_403');
  }
  $script = variable_get('securesite_password_script', drupal_get_path('module', 'securesite') . '/digest_md5/stored_passwords.php');
  $realm = variable_get('securesite_realm', variable_get('site_name', 'Drupal'));
  if (in_array(SECURESITE_DIGEST, variable_get('securesite_type', array(SECURESITE_BASIC)))) {
    // If digest authentication was enabled, we may need to do some clean-up.
    $securesite_guest_name = variable_get('securesite_guest_name', '');
    if (
      isset($values['op']) && $values['op'] == t('Reset to defaults') || // Values are being reset to defaults.
      !in_array(SECURESITE_DIGEST, $values['securesite_type']) || // Digest authentication is being disabled.
      $realm != $values['securesite_realm'] // Realm has changed.
    ) {
      // Delete all stored passwords.
      exec("$script realm=" . escapeshellarg($realm) . ' op=delete');
    }
    elseif ($values['securesite_guest_name'] != $securesite_guest_name) {
      // Guest user name has changed. Delete old guest user password.
      exec("$script username=" . escapeshellarg($securesite_guest_name) . ' realm=' . escapeshellarg($realm) . ' op=delete');
    }
  }
  if (in_array(SECURESITE_DIGEST, $values['securesite_type']) && (!isset($values['op']) || $values['op'] != t('Reset to defaults'))) {
    // If digest authentication is enabled, update guest user password.
    $args = array(
      'username=' . escapeshellarg($values['securesite_guest_name']),
      'pass=' . escapeshellarg($values['securesite_guest_pass']),
      'realm=' . escapeshellarg($realm),
      'op=create',
    );
    exec($script . ' ' . implode(' ', $args));
  }
}
