#!/bin/bash

set -e

cmd="$@"

attempt=0
while ! curl http://$GRID_HOST:$GRID_PORT/ && [ $attempt -le 59 ];
do
  attempt=$(( $attempt + 1 ))
  echo "$(date) - waiting for Selenium server to be up (attempt: $attempt)..."
  sleep 1
done

echo "Selenium server is up - executing tests"
exec $cmd