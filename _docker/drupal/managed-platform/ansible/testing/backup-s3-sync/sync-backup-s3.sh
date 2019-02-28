#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

cd $DIR && rm -rf drupal-workspace env.yml
cd $DIR && docker-compose down -v

cd $DIR && docker-compose build --pull
cd $DIR && sed -e "s|@@AWS_ACCESS_KEY@@|$AWS_ACCESS_KEY|g; s|@@AWS_SECRET_KEY@@|$AWS_SECRET_KEY|g" env.yml.j2 > env.yml
cd $DIR && docker-compose run --rm local_seed
cd $DIR && docker-compose run --rm bootstrap_env
cd $DIR && docker-compose run --rm backup_drupal

cd $DIR && docker-compose down -v
cd $DIR rm -rf drupal-workspace env.yml