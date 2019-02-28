#!/usr/bin/env bash
set -e
echo "Exporting config from Drupal..."
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR && docker exec dev_drupal_1 /bin/bash -c "drush -y cex"
cd $DIR && docker cp dev_drupal_1:/var/www/drupal/web/config/sync/. ../drupal-filesystem/web/config/sync