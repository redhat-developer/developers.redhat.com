#!/usr/bin/env bash
RED='\033[0;31m'
NC='\033[0m'
echo "Exporting config from Drupal..."
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
DUID="$(id -u)"; export DUID

# We need to ensure we've actually booted Drupal for this to be useful. Technically Drupal doesn't need to be running, but this
# provides a reasonable sanity check for now
$(curl -sfSk -m 5 https://localhost/user/login > /dev/null);
if [ $? -ne 0 ]
then
  echo -e "${RED}ERROR: ${NC}It doesn't look like Drupal is running. Have you run run-drupal.sh?"
  exit 1
fi

docker exec dev_drupal_1 /bin/bash -c "drush cex -y"