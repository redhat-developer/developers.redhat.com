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
npm config set @fortawesome:registry ${FORTAWESOME_REGISTRY}

# Add npm proxy
if [ -z ${http_proxy+x} ]
then
  echo "No proxy config"
else
  echo "Setting npm proxy to http://${http_proxy}"
  npm config set proxy http://${http_proxy}
fi
if [ -z ${https_proxy+x} ]
then
  echo "No proxy config"
else
  echo "Setting npm https-proxy to http://${https_proxy}"
  npm config set https-proxy http://${https_proxy}
fi

npm install
npm run-script build

# Go back to where we were before
cd /var/www/drupal

# Run all database migrations
ruby /var/www/drupal/phinx.rb migrate

# Make sure we're not confused by old, incompletely-shutdown httpd
# context after restarting the container.  httpd won't start correctly
# if it thinks it is already running.
rm -rf /run/httpd/*

# Set it up so apache can write to everything
chown -R apache:apache /var/www/drupal/web/sites
chown -R apache:apache /var/www/drupal/web/config/active # just to make sure we can write changes to active

# Launch Apache as a child-process of this script so we can 'wait' on it
/usr/sbin/httpd -D FOREGROUND &

# Wait for the Apache pid file to be populated
until [ -e '/etc/httpd/run/httpd.pid' ]; do
  sleep 5
  echo "Waiting for Drupal PID file at '/etc/httpd/run/httpd.pid'"
done

# Read the pid that Apache is running as
PID=$(cat /etc/httpd/run/httpd.pid)
echo "Success: Drupal is running as PID '$PID'"

# We now wait for as long as Apache is running
wait $PID

# We've been sent an interrupt, remove our traps and make sure we wait for Apache to fully close
trap - TERM INT
wait $PID

# Exit with the status code of the Apache process
exit $?
