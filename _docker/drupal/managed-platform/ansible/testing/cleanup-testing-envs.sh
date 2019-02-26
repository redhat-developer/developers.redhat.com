#!/usr/bin/env bash
set -e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/backup-drupal && docker-compose down -v && rm -rf $DIR/backup-drupal/drupal-workspace
cd $DIR/bootstrap-env && docker-compose down -v && rm -rf $DIR/bootstrap-env/drupal-workspace
cd $DIR/bootstrap-drupal && docker-compose down -v && rm -rf $DIR/bootstrap-drupal/drupal-workspace
cd $DIR/cleanup-env && docker-compose down -v && rm -rf $DIR/cleanup-env/drupal-workspace
