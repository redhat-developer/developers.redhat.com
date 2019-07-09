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
exec ruby /developers.redhat.com/_docker/lib/pull_request/exec_with_git_hub_status_wrapper.rb npm run e2e:ci -- --profile=$RHD_TEST_PROFILE --baseUrl=$RHD_BASE_URL --browser=$RHD_JS_DRIVER --tags=$RHD_TEST_TAGS