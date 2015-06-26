
Digest authentication avoids transmitting passwords by exchanging character
strings (digests) that prove both the user and the Web server know the password.
This requires passwords for all users to be stored on the server. It is very
important to ensure that these passwords cannot be exposed to unauthorized
users. Web pages should be able to store passwords without being able to
retrieve them.

The scripts in this directory can handle stored passwords securely when properly
set up. There are two scripts in this directory:

stored_passwords.php: Add, delete, and update user passwords.
digest_md5.php: Perform digest authentication.

You can get help for these scripts by typing the script name followed by
"--help" on the command line. You must be able to run PHP from the command line.
Some configuration is required to make the scripts work properly:

1. Set up a secure database
---------------------------

You can set up a password database in the same way you create a Drupal database.
Your password database should have its own user. No other database users should
have access to the password database.

2. Edit the configuration file
------------------------------

Configuration settings for the scripts are in digest_md5.conf.php. You must set
$db_url to point to your password database. If you want to be able to use the
scripts from the command-line or non-Drupal Web pages, you must set $drupal to
the absolute path of your Drupal installation. When you are done editing the
configuration file, make it read-only.

3. Control access to the scripts
--------------------------------

The first thing you can do secure the scripts is to move this directory to a
location that is not accessible from the Internet. The configuration file
especially needs protection, because it contains information that allows access
to the password database.

If the sudo command is available on your system, you can change the file system
permissions on the all the files in the digest_md5 directory so that only
adminstrators have access to them. You would then add the user your Web server
runs as to the sudoers file. A sample sudoers file is provided in this directory
for comparison. The important lines are

  Defaults:apache	!authenticate
  Defaults:apache	!lecture
  apache	ALL=/usr/local/digest_md5/stored_passwords.php [A-z]*
  apache	ALL=/usr/local/digest_md5/digest_md5.php [A-z]*

This allows apache to use sudo only to run stored_passwords.php and
digest_md5.php. Replace apache with the name of the Web server user on your
system, and replace /usr/local/digest_md5 with the directory in which this file
is located.

If the rest of your system is secure, Web pages can now store passwords without
having the ability to retrieve them.
