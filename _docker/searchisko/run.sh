#!/bin/bash

set -e

env


echo "Attempting to connect to mysql, waiting until it comes up if needed..."
until mysql -u searchisko -h $MYSQL_PORT_3306_TCP_ADDR --password=$MYSQL_ROOT_PASSWORD -e ";" 2>/dev/null; do
  echo Waiting...
  sleep 2
done

echo "========= Importing DCP data into MySQL ========"
mysql -u searchisko -h $MYSQL_PORT_3306_TCP_ADDR --password=$MYSQL_ROOT_PASSWORD searchisko < /searchisko.sql
mysql -u searchisko -h $MYSQL_PORT_3306_TCP_ADDR --password=$MYSQL_ROOT_PASSWORD searchisko < /remove_user.sql
echo "Import done"



sed -i.bak "s/localhost/$ELASTICSEARCH_PORT_9300_TCP_ADDR/g" /services/searchisko/searchisko-api.war/WEB-INF/classes/search_client_connections.properties
sed -i.bak "s/MYSQL_IP/$MYSQL_PORT_3306_TCP_ADDR/g" /etc/jbossas/standalone/standalone.xml

exec /usr/share/jbossas/bin/standalone.sh -b 0.0.0.0
