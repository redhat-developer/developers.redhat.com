#!/bin/bash

# Modify these for your system and setup
USER="jporter"
GROUP=$USER
PROJ="/home/${USER}/projects/developers.redhat.com"

# These locations should not need to change
DRUPAL="${PROJ}/_docker/drupal"
DRUPAL_FILESYSTEM="${DRUPAL}/drupal-filesystem"
WEB="${DRUPAL_FILESYSTEM}/web"
ENVIRON="${PROJ}/_docker/environments/drupal-dev"

echo "Resetting workspace"
sudo git reset --hard HEAD

ecoh "Removing untracked files"
sudo git clean -dfi
rm -rf _docker/drupal/drupal-filesystem/web/modules/contrib
