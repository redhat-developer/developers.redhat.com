#!/bin/bash

set -e

cmd="$@"

attempt=0
while ! curl http://$GRID_HOST:$GRID_PORT/ && [ $attempt -le 59 ];
do
  attempt=$(( $attempt + 1 ))
  echo "$(date) - waiting for server to be up (attempt: $attempt)..."
  sleep 1
done

echo "Selenium-standalone is up - executing tests"
exec ruby /home/e2e/developers.redhat.com/_docker/lib/pull_request/exec_with_git_hub_status_wrapper.rb $cmd
