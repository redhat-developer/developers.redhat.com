#!/bin/bash
set -e

trap "apachectl -k graceful-stop" TERM INT

cd /var/www/drupal

# This sleep seems to be required for certain Docker/OS combos as the bind mounts may not be fully ready
sleep 10

# Check if drupal is installed, install if needed
ruby drupal_install_checker.rb

# Build theme
cd /var/www/drupal/web/themes/custom/rhdp/rhd-frontend

# Go back to where we were before
cd /var/www/drupal

# Run all database migrations
ruby /var/www/drupal/phinx.rb migrate

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /opt/rh/httpd24/root/var/run/httpd/*

# Set it up so apache can write to everything
chown -R apache:apache /var/www/drupal/web/sites
chown -R apache:apache /var/www/drupal/web/config/active # just to make sure we can write changes to active

# Launch Apache as a child-process of this script so we can 'wait' on it
httpd -D FOREGROUND &

# Wait for the Apache pid file to be populated
until [ -e '/opt/rh/httpd24/root/var/run/httpd/httpd.pid' ]; do
  sleep 5
  echo "Waiting for Drupal PID file at '/opt/rh/httpd24/root/var/run/httpd/httpd.pid'"
done

# Read the pid that Apache is running as
PID=$(cat /opt/rh/httpd24/root/var/run/httpd/httpd.pid)
echo "Success: Drupal is running as PID '$PID'"

# We now wait for as long as Apache is running
wait $PID

# We've been sent an interrupt, remove our traps and make sure we wait for Apache to fully close
trap - TERM INT
wait $PID

# Exit with the status code of the Apache process
exit $?
