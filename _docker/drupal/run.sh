# Make sure we have the most up-to-date drupal console
drupal self-update

echo "Attempting to connect to pgsql, waiting until it comes up if needed..."

php -f /db-check.php
while [ $? != 0 ]
do
  php -f /db-check.php
done

chown -R root:root sites

drupal site:install standard --db-type=pgsql --db-host=$DRUPALPGSQL_PORT_5432_TCP_ADDR --db-port=$DRUPALPGSQL_PORT_5432_TCP_PORT --db-name=$DB_NAME --db-user=$DB_USER --db-pass=$DB_PASSWORD --account-name=admin --account-mail="admin@example.com" --site-name="Drupal 8 Testing" --site-mail="test@example.com" --account-pass=admin --langcode=en -n

# Download other modules
drupal module:download codesnippet 8.x-1.x-dev

# install the needed modules in drupal
drupal module:install redhat_developers rest hal serialization basic_auth layoutmanager basewidget codesnippet

drupal theme:install --set-default -- rhd

chown -R www-data:www-data sites

exec apache2-foreground
