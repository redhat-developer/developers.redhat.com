#!/bin/bash

# Download and install drush
drush dl drupal-7.34 --destination="/tmp" --drupal-project-rename=drupal
cp -rfa /tmp/drupal/. /var/www/html
rm -rf /tmp/drupal
cd /var/www/html
mkdir -p sites/default/files
chown -R apache:apache /var/www/html

echo "Attempting to connect to mysql, waiting until it comes up if needed..."
until mysql -u drupal -p708808 -h $DRUPALMYSQL_PORT_3306_TCP_ADDR -e ";" 2>/dev/null; do
  sleep 10s
done

# Setup drupal. Ideally this would all be done in a make file or install profile, but I don't know how to do that yet
drush si -y standard --db-url=mysql://drupal:708808@$DRUPALMYSQL_PORT_3306_TCP_ADDR/drupal --account-name=admin --account-pass=admin
drush en features services ctools -y --resolve-dependencies
drush en awestruct_push -y
drush user-create awestruct --password="awestruct"
drush user-add-role awestruct awestruct

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/*
exec /usr/sbin/apachectl -DFOREGROUND
