#!/bin/bash

php -f /db-check.php
while [ $? != 0 ]
do
  php -f /db-check.php
done

# Check if drupal is installed, install if needed
cd /var/www/drupal/web
ruby ../scripts/drupal_install_checker.rb

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/*

exec /usr/sbin/apachectl -D FOREGROUND
