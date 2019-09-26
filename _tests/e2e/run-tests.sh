#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
DUID=$(id -u)

# Initialise temporary directories
rm -rf "${DIR}/report" "${DIR}/tmp_downloads" && mkdir -p "${DIR}/report" "${DIR}/tmp_downloads"

docker-compose down -v
docker-compose build
docker-compose run --rm -e RHD_BASE_URL=https://developer-preview-3028.ext.us-west.dc.preprod.paas.redhat.com e2e_drupal
docker-compose run --rm -e RHD_BASE_URL=https://developer-preview-3028.ext.us-west.dc.preprod.paas.redhat.com e2e_desktop
docker-compose run --rm -e RHD_BASE_URL=https://developer-preview-3028.ext.us-west.dc.preprod.paas.redhat.com e2e_mobile

docker-compose down -v
rm -rf "${DIR}/tmp_downloads"