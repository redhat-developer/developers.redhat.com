#!/bin/bash

# These locations should not need to change
USER=$(whoami)
GROUP=$(groups | awk '{ print $1 }')
PROJ=$(pwd)
DRUPAL="${PROJ}/_docker/drupal"
DRUPAL_FILESYSTEM="${DRUPAL}/drupal-filesystem"
WEB="${DRUPAL_FILESYSTEM}/web"
ENVIRON="${PROJ}/_docker/environments/drupal-dev"

echo "Resetting workspace"
sudo git reset --hard HEAD

echo "Removing untracked files"
sudo git clean -dfi
rm -rf _docker/drupal/drupal-filesystem/web/modules/contrib
