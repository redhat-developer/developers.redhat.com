
The Secure Site module allows site administrators to make a site or part of a
site private. You can restrict access to the site by role. This means the site
will be inaccessible to search engines and other crawlers, but you can still
allow access to certain people.

You can also secure remote access to RSS feeds. You can keep content private and
protected, but still allow users to get notification of new content and other
actions via RSS with news readers that support user:pass@example.com/node/feed
URLs, or have direct support for user name and password settings. This is
especially useful when paired with the Organic Groups module or other node
access systems.


Installation
------------

  1. Place the entire securesite directory into your sites/all/modules
     directory.

  2. Enable the Secure Site module by navigating to:

     Administer >> Site building >> Modules

  3. Configure the Secure Site permissions:

     Administer >> User management >> Permissions

     Set the user roles that are allowed to access secured pages by giving those
     roles the "access secured pages" permission.

  4. Configure the Secure Site module:

     Administer >> Site configuration >> Secure Site


Configuration
-------------

  - Force authentication

    This setting controls whether users will be forced to authenticate before
    viewing pages. By default, authentication is never forced.

    1. Never

       This setting will prevent Secure Site from hiding pages.

    2. Always

       This setting will hide your entire site from unauthenticated users.

    3. During maintenance

       This setting will hide your site during maintenance.

    4. On restricted pages

       This setting will hide only pages that anonymous users cannot access.

  - Authentication type

    Three methods of authentication are available. Please note that HTTP
    authentication requires extra configuration if PHP is not installed as an
    Apache module. See the Known issues section of this file for details.

    1. HTTP digest

       This will enable HTTP digest authentication. The user's browser will
       prompt for the user's name and password before displaying the page.

       Digest authentication protects a user's password from eavesdroppers when
       you are not using SSL to encrypt the connection. However, it can only be
       used when a copy of the password is stored on the server. For security
       reasons, Drupal does not store passwords. You will need to configure
       scripts to securely save passwords and authenticate users. See README.txt
       in the digest_md5 directory for details.

       When digest authentication is enabled, passwords will be saved when users
       log in or set their passwords. If you use digest authentication to
       protect your whole site, you should allow guest access or allow another
       authentication type until users whose passwords are not yet saved have
       logged in. Otherwise, you may lock yourself out of your own site.

    1. HTTP basic

       This will enable HTTP basic authentication. The user's browser will
       prompt for the user's name and password before displaying the page.
       Basic authentication is not secure unless you are using SSL to encrypt
       the connection.

    2. Use HTML log-in form

       This method uses a themeable HTML log-in form for user name and password
       input. This method is the most reliable as it does not rely on the
       browser for authentication. Like HTTP basic, it is insecure unless you
       are using SSL to encrypt the connection.

    HTTP authentication is recommended for secure feeds, because feed readers
    are not likely to be able to handle forms. You can enable all three types of
    authentication at the same time.

  - Digest authentication script

    For security, HTTP digest authentication uses an external script to check
    passwords. Enter the digest authentication script exactly as it would appear
    on the command line.

  - Password storage script

    For security, HTTP digest authentication uses an external script to save
    passwords. Enter the password storage script exactly as it would appear on
    the command line.

  - Authentication realm

    You can use this field to name your login area. This is primarily used with
    HTTP Auth.

  - Guest user name and password

    If you give anonymous users the "access secured pages" permission, you can
    set a user name and password for anonymous users. If not set, guests can use
    any name and password.

  - Customize HTML forms

    "Custom message for login form" and "Custom message for password reset form"
    are used in the HTML forms when they are displayed. If the latter box is
    empty, Secure Site will not offer to reset passwords. Please note, the login
    form is only displayed when the HTML login form authentication mode is used.


Theming
-------

Secure Site's HTML output is controlled by three files:

- securesite-page.tpl.php: Template for Secure Site pages. Works in the same way
  as page.tpl.php.

- securesite-user-login.tpl.php: Template for the user log-in form.

- securesite-user-pass.tpl.php: Template for the password reset form.

You can theme Secure Site's HTML output by copying these files to your theme's
directory. The files in your theme's directory will become the templates for all
Secure Site HTML output.


Configuring cron jobs
---------------------

If HTTP authentication is forced, cron jobs will need to authenticate
themselves. See http://drupal.org/cron for more details on configuring cron
jobs. These examples show how to add a user name and password (note: Lynx does
not support digest authentication):

45 * * * * /usr/bin/lynx -auth=username:password -source http://example.com/cron.php
45 * * * * /usr/bin/wget --user=username --password=password -O - -q http://example.com/cron.php
45 * * * * /usr/bin/curl --anyauth --user username:password --silent --compressed http://example.com/cron.php


Known issues
------------

  - Authentication on PHP/CGI installations

    If you are using HTTP Auth and are unable to login, PHP could be running in
    CGI mode. When run in CGI mode, the normal HTTP Auth login variables are not
    available to PHP. To work-around this issue, add the following rewrite rule
    at the end of the .htaccess file in Drupal's root installation directory:

    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]

    After making the suggested change in Drupal 6, the rewrite rules would
    look like this:

    # Rewrite URLs of the form 'x' to the form 'index.php?q=x'.
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !=/favicon.ico
    RewriteRule ^(.*)$ index.php?q=$1 [L,QSA]
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]

  - Authentication when running Drupal via IIS

    If you are using HTTP Auth and are unable to login when Drupal is running on
    an IIS server, make sure that the PHP directive cgi.rfc2616_headers is set
    to 0 (the default value).
