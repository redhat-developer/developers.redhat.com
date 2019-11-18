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
&& cp dist/css-min/rhd.min.css "${DRUPAL_THEME_DIR}"/css/ \
&& cp dist/css-min/rhd.microsites.css "${DRUPAL_THEME_DIR}"/css/ \
&& cp dist/css-min/rhd.legacy.css "${DRUPAL_THEME_DIR}"/css/ \
&& cp dist/js/@rhd/rhd.old.min.js "${DRUPAL_THEME_DIR}"/js/ \
&& cp dist/js/@rhd/rhd.min.js "${DRUPAL_THEME_DIR}"/js/ \
&& cp dist/js/@patternfly/pfelement/pfelement.umd.min.js "${DRUPAL_THEME_DIR}"/js/ \
&& cp dist/js/@patternfly/pfe-datetime/pfe-datetime.umd.min.js "${DRUPAL_THEME_DIR}"/js/ \
&& rm -rf "${DRUPAL_THEME_DIR}"/js/rhd \
&& cp -r dist/js/@rhd "${DRUPAL_THEME_DIR}"/js/rhd \
&& cp -r favicons "${DRUPAL_THEME_DIR}/" \
&& cp -r dist/fonts "${DRUPAL_THEME_DIR}/"

cd "${DIR}" && docker-compose exec drupal /bin/bash -c "drush cr"
