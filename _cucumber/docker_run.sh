#!/bin/sh
trap "exit" INT
echo "host to test was:${HOST_TO_TEST}"

while ! curl -s $HOST_TO_TEST > /dev/null
do
  echo "still trying host:${HOST_TO_TEST}, is the server up?"
  sleep 5
done
echo "connected successfully"
bundle exec rake features HOST_TO_TEST=$HOST_TO_TEST RHD_JS_DRIVER=$RHD_DOCKER_DRIVER RHD_DEFAULT_DRIVER=$RHD_DEFAULT_DRIVER
