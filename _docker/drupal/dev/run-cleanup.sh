#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
DUID="$(id -u)"; export DUID

cd "$DIR" && docker-compose down -v
cd "$DIR" && rm -rf ./drupal-workspace/