#!/bin/bash -e

echo "Attempting to connect to mysql, waiting until it comes up if needed..."
until mysql -u ${DB_USER} -h mysql --password=${DB_PASSWORD} -e "SHOW DATABASES;" 2>/dev/null; do
  echo Waiting for mysql to startup ...
  sleep 2
done

exec /usr/share/jbossas/bin/standalone.sh -b 0.0.0.0
