#!/usr/bin/env bash

# Download and install drupal console
php -r "readfile('https://drupalconsole.com/installer');" > drupal.phar && mv drupal.phar /usr/local/bin/drupal && chmod +x /usr/local/bin/drupal

# Make sure we have the most up-to-date drupal console
drupal self-update

echo "Attempting to connect to pgsql, waiting until it comes up if needed..."

php -f /db-check.php
while [ $? != 0 ]
do
  php -f /db-check.php
done

chown -R root:root sites

drupal site:install standard --db-type=pgsql --db-host=drupalpgsql --db-port=5432 --db-name=$DB_NAME --db-user=$DB_USER --db-pass=$DB_PASSWORD --account-name=admin --account-mail="admin@example.com" --site-name="Red Hat Developers" --site-mail="test@example.com" --account-pass=admin --langcode=en -n

drupal theme:install --set-default rhd

# install the needed modules in drupal, seems to be an issue where we have to install dependencies first, can't do it all at once
drupal module:install toc_api toc_filter serialization basic_auth basewidget rest layoutmanager hal redhat_developers --latest

chown -R www-data:www-data sites

exec apache2-foreground
