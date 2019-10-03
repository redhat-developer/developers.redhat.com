#!/usr/bin/env bash
set -e
echo "Be patient..this will take time..."
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
DUID="$(id -u)"; export DUID

cd "$DIR" && docker-compose run --rm update-composer