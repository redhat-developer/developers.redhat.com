#!/bin/sh
trap "exit" INT
while ! curl -s $HOST_TO_TEST > /dev/null
do
  echo "still trying host:${HOST_TO_TEST}, is the server up?"
  sleep 5
done
echo "connected successfully"
bundle exec rake features
