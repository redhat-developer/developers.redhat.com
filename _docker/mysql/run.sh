#!/bin/bash

set -e

INIT_SCRIPT="CREATE database ${DB_NAME}; \
             GRANT ALL ON ${DB_NAME}.* TO ${DB_USER}@'%' IDENTIFIED BY '${DB_PASSWORD}';"

# Start the MySQL service. This triggers initialisation on first boot. This initialisation is too complex to reproduce here.
/etc/init.d/mysqld start
# Whilst the service is running, create an application user and database
echo $INIT_SCRIPT | mysql -u root --password=
# Stop MySQL, The docker container will not stay up if MySQL is started this way
/etc/init.d/mysqld stop

# Now start MySQL in the foreground. This ensures that the Docker container stays running.
exec /usr/bin/mysqld_safe
