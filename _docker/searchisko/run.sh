#!/bin/bash -e

echo "Attempting to connect to mysql, waiting until it comes up if needed..."
until mysql -u ${DB_USER} -h ${MYSQL_PORT_3306_TCP_ADDR} --password=${DB_PASSWORD} -e ";" 2>/dev/null; do
  echo Waiting...
  sleep 2
done

exec /usr/share/jbossas/bin/standalone.sh -b 0.0.0.0
