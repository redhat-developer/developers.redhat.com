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
        $conn = new PDO('mysql:host=docker;dbname=rhd_mysql', 'drupal', 'drupal');
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

# Symlink the static images directory
if [ ! -d "${WEB}/images" ]
then
  sudo ln -s ${DRUPAL_FILESYSTEM}/static/images/ ${WEB}/images
fi

# Symlink the static rhdp-apps folder
if [ ! -d "${WEB}/rhdp-apps" ]
then
  sudo ln -s ${DRUPAL_FILESYSTEM}/static/rhdp-apps/ ${WEB}/rhdp-apps
fi

# ADD from docker active config, files
echo "\nAdding the active config from the prod dump"
rm -rf ${WEB}/config/active
mkdir ${WEB}/config/active

# Get the running docker full name from partial name
runingDockerName=$(docker ps --format '{{.Names}}' --filter 'name=drupaldev_drupalmysql_' | head -n 1)

if [ $runingDockerName == "" ]
then
    echo "No Container found"
    exit 1
else
    echo "Found Container: $runingDockerName"
fi

#Test contaner found starts with correct name exit script if not
if [[ $runingDockerName == drupaldev_drupalmysql_* ]]
then
    echo "We have a container of the correct name"
    sudo docker cp $runingDockerName:/var/www/drupal/web/config/active ${WEB}/config
    sudo chown -R ${USER}:${GROUP} ${WEB}/config/active
    echo "Adding site/files"
    sudo docker cp $runingDockerName:/var/www/drupal/web/sites/default/files ${WEB}/sites/default
    sudo chown -R ${USER}:${GROUP} ${WEB}/sites/default/files
else
    echo "Cant find Docker container starting with drupaldev_drupalmysql_"
    exit 1
fi

echo "Building css/js for theme"
cd ${THEME}/rhd-frontend
npm install && npm run-script build 
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

echo "Running DB Migrations"
cd ${DRUPAL_FILESYSTEM}
vendor/bin/phinx migrate
cd ${PROJ}

echo "Starting the server"
${WEB}/../vendor/bin/drush --root=${WEB} rs

