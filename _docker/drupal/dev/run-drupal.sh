#!/usr/bin/env bash
set -e
RED='\033[0;31m'
NC='\033[0m'
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
DUID="$(id -u)"; export DUID
MKCERT="$(command -v mkcert)"

if [[ "${MKCERT}" == "" ]]; then
  echo "You must install 'mkcert' before using this script."
  exit 1
fi

if [[ ! -e ${DIR}/local-config.sh ]]; then
    echo -e "${RED}ERROR: ${NC}Please create ${DIR}/local-config.sh before proceeding to allow logins to registry.redhat.io"
    exit 1;
fi

set -a
source "${DIR}"/local-config.sh
set +a

# Login to required registries and pull required images
if [[ $REGISTRY_REDHAT_IO_SKIP_LOGIN != true ]]; then
  docker login registry.redhat.io -u "${REGISTRY_REDHAT_IO_USERNAME}" -p "${REGISTRY_REDHAT_IO_PASSWORD}"
fi
docker pull docker-registry.upshift.redhat.com/developers/drupal-data:latest
docker pull images.paas.redhat.com/rhdp/developer-base:rhel-76.4

cd "${DIR}" && docker-compose down -v
cd "${DIR}" && rm -rf $DIR/drupal-workspace
cd "${DIR}" && docker-compose build
cd "${DIR}" && docker-compose up -d mysql memcached-0 memcached-1
cd "${DIR}" && mkcert localhost
cd "${DIR}" && mkdir -p drupal-workspace
cd "${DIR}" && docker-compose run --rm seed_env
cd "${DIR}" && docker-compose run --rm bootstrap_env
cd "${DIR}" && docker-compose run --rm bootstrap_drupal
cd "${DIR}" && chmod -R 777 ./drupal-workspace/drupal_1/drupal/sites/default/files && chown -R "${DUID}" "${DIR}"/drupal-workspace
cd "${DIR}" && docker-compose up -d drupal
cd "${DIR}" && docker-compose exec -u root drupal /bin/bash -c "chown -R ${DUID}:0 /var/www/drupal/web/modules/contrib"

# Build the rhdp2 theme
cd "${DIR}" && ./build-rhdp2-theme.sh

cd "${DIR}" && docker-compose logs -f drupal
