#!/bin/bash

set -e

env


echo "Attempting to connect to mysql, waiting until it comes up if needed..."
until mysql -u ${DB_USER} -h ${MYSQL_PORT_3306_TCP_ADDR} --password=${DB_PASSWORD} -e ";" 2>/dev/null; do
  echo Waiting...
  sleep 2
done

echo "========= Importing DCP data into MySQL ========"
mysql -u ${DB_USER} -h $MYSQL_PORT_3306_TCP_ADDR --password=${DB_PASSWORD} ${DB_NAME} < /searchisko.sql
mysql -u ${DB_USER} -h $MYSQL_PORT_3306_TCP_ADDR --password=${DB_PASSWORD} ${DB_NAME} < /remove_user.sql
echo "Import done"

echo "${ELASTICSEARCH_PORT_9300_TCP_ADDR}=9300" > /services/searchisko/searchisko-api.war/WEB-INF/classes/search_client_connections.properties

exec /usr/share/jbossas/bin/standalone.sh -b 0.0.0.0
