#!/bin/sh
trap "exit" INT
while ! curl -s $HOST_TO_TEST > /dev/null
do
  echo "still trying host:${HOST_TO_TEST}, is the server up?"
  sleep 5
done
echo "connected successfully"
echo "Executing tests using:${RHD_SELENIUM_DRIVER} browser"
echo "Executing tests with parallel mode set to:${PARALLEL_TEST}"

bundle exec rake features RHD_SELENIUM_DRIVER=$RHD_SELENIUM_DRIVER PARALLEL_TEST=$PARALLEL_TEST
