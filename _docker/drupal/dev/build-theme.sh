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
&& npm config set strict-ssl false \
&& npm config set "@fortawesome:registry" https://npm.fontawesome.com/ \
&& npm config set "//npm.fontawesome.com/:_authToken" $FONTAWESOME_LICENCE \
&& npm install \
&& npm run-script styles \
&& npm run-script build \
&& npm run-script scripts:new \
&& cp dist/css-min/rhd.min.css "${DRUPAL_THEME_DIR}"/css/ \
&& cp dist/css-min/rhd.microsites.css "${DRUPAL_THEME_DIR}"/css/ \
&& cp dist/js/@rhd/rhd.old.min.js "${DRUPAL_THEME_DIR}"/js/ \
&& cp dist/js/@rhd/rhd.min.js "${DRUPAL_THEME_DIR}"/js/ \
&& cp -r favicons "${DRUPAL_THEME_DIR}/"

cd "${DIR}" && docker-compose exec drupal /bin/bash -c "drush cr"
