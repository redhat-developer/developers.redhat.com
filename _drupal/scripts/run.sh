#!/bin/bash

# Download and install drush
drush dl drupal-7.34 --destination="/tmp" --drupal-project-rename=drupal
cp -rfa /tmp/drupal/. /var/www/html
rm -rf /tmp/drupal
cd /var/www/html
mkdir -p sites/default/files
chown -R apache:apache /var/www/html

echo "Attempting to connect to mysql, waiting until it comes up if needed..."
until mysql -u $DB_USER -p$DB_PASSWORD -h $DRUPALMYSQL_PORT_3306_TCP_ADDR -e ";" 2>/dev/null; do
  sleep 5s
done

# Setup drupal. Ideally this would all be done in a make file or install profile, but I don't know how to do that yet
drush si -y standard --db-url=mysql://$DB_USER:$DB_PASSWORD@$DRUPALMYSQL_PORT_3306_TCP_ADDR/$DB_NAME --account-name=admin --account-pass=admin
drush en features services ctools libraries token metatag compass securesite -y --resolve-dependencies
drush en awestruct_push -y
# Add Drupal functional modules
# Disable the drush update manager, we will manage updates from here
drush pm-disable update -y
drush user-create awestruct --password="awestruct"
drush user-add-role awestruct awestruct


# Switch to HTTP Basic for authentication to restricted pages
drush vset --exact securesite_enabled 3

# Enable and set the Drupal default theme
drush en rhd
#drush vset theme_default rhd

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/*
exec /usr/sbin/apachectl -DFOREGROUND
