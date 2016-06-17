#!/bin/bash

# Check if drupal is installed, install if needed
cd /var/www/drupal
ruby scripts/drupal_install_checker.rb

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/*

# Set it up so apache can write to everything
chown -R apache:apache /var/www/drupal
chmod -R 755 /var/www/drupal

exec /usr/sbin/apachectl -D FOREGROUND
