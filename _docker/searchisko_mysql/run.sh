#!/bin/bash

set -e

/etc/init.d/mysqld start
mysql -u root --password= < /init.sql
/etc/init.d/mysqld stop

exec /usr/bin/mysqld_safe
