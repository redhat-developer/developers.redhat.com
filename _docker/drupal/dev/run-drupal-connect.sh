#!/usr/bin/env bash
set -e
DUID="$(id -u)"; export DUID
docker exec -u "$DUID" -it dev_drupal_1 /bin/bash