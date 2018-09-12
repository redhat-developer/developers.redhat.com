#!/bin/bash

# These locations should not need to change
USER=$(whoami)
GROUP=$(groups | awk '{ print $1 }')
PROJ=$(pwd)
DRUPAL="${PROJ}/_docker/drupal"
DRUPAL_FILESYSTEM="${DRUPAL}/drupal-filesystem"
WEB="${DRUPAL_FILESYSTEM}/web"
THEME="${WEB}/themes/custom/rhdp"
ENVIRON="${PROJ}/_docker/environments/drupal-dev"

# Getting the database going, because we can't really do much until this is up
docker-compose -p drupaldev -f "${ENVIRON}/docker-compose.yml" up -d drupalmysql

echo "Waiting until the database is up..."

php <<'DBCHECK'
<?php

$conn = NULL;
while ($conn === NULL) {
    try {
        $conn = new PDO('mysql:host=docker;dbname=drupal', 'drupal', 'drupal');
        $conn->query('SELECT 1;');
    } catch (PDOException $exception) {
        sleep(5);
    }
}
$conn = NULL;
DBCHECK

echo "Running composer install"

# Install Drupal
cd ${DRUPAL_FILESYSTEM}
composer install

# Symlink the rest of the files and folders needed
echo "Creating symlinks if needed"

if [ ! -f "${WEB}/sites/default/rhd.settings.php" ]
then
  sudo ln -s ${ENVIRON}/rhd.settings.php ${WEB}/sites/default/rhd.settings.php
fi

if [ ! -f "${WEB}/sites/default/rhd.settings.yml" ]
then
  sudo ln -s ${ENVIRON}/rhd.settings.yml ${WEB}/sites/default/rhd.settings.yml
fi

# ADD from docker active config, files
echo "\nAdding the active config from the prod dump"
rm -rf ${WEB}/config/active
mkdir ${WEB}/config/active

sudo docker cp drupaldev_drupal_data_1:/var/www/drupal/web/config/active ${WEB}/config
sudo chown -R ${USER}:${GROUP} ${WEB}/config/active

echo "Adding site/files"
sudo docker cp drupaldev_drupal_data_1:/var/www/drupal/web/sites/default/files ${WEB}/sites/default
sudo chown -R ${USER}:${GROUP} ${WEB}/sites/default/files

echo "Building css/js for theme"
cd ${THEME}/rhd-frontend
npm install && npm run-script build 
cd ${PROJ}

echo "Running DB Migrations"
cd ${DRUPAL_FILESYSTEM}
vendor/bin/phinx migrate
cd ${PROJ}

echo "Sanitizing the database"
${WEB}/../vendor/bin/drush --root=${WEB} sqlsan --sanitize-password=drupal --sanitize-email=user+%uid@example.com

echo "Running drush cr"
${WEB}/../vendor/bin/drush --root=${WEB} cr

# Import config and update the database
echo "Running drush updb"
${WEB}/../vendor/bin/drush --root=${WEB} -y updb --entity-updates

echo "Running drush cr"
${WEB}/../vendor/bin/drush --root=${WEB} cr

echo "Running drush update:lightning"
${WEB}/../vendor/bin/drush --root=${WEB} update:lightning --no-interaction

echo "Running drush cr"
${WEB}/../vendor/bin/drush --root=${WEB} cr

echo "Running drush cim"
${WEB}/../vendor/bin/drush --root=${WEB} -y cim

echo "Starting the server"
${WEB}/../vendor/bin/drush --root=${WEB} rs

