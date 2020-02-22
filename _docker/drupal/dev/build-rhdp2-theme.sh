#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
FE_THEME_DIR="${DIR}/../drupal-filesystem/web/themes/custom/rhdp2/rhd-frontend"
DRUPAL_THEME_DIR="${DIR}/../drupal-filesystem/web/themes/custom/rhdp2"

mkdir -p "${DRUPAL_THEME_DIR}/css"
mkdir -p "${DRUPAL_THEME_DIR}/js"

set -a
source "${DIR}"/local-config.sh
set +a

cd "${FE_THEME_DIR}" \
&& npm config set "registry" https://repository.engineering.redhat.com/nexus/repository/registry.npmjs.org/ \
&& npm install \
&& npm run build \
&& cp -r favicons "${DRUPAL_THEME_DIR}/" \
&& cp -r dist/fonts "${DRUPAL_THEME_DIR}/"

cd "${DIR}" && docker-compose exec drupal /bin/bash -c "drush cr"
