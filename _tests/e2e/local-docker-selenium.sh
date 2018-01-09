#!/usr/bin/env bash

if [ -n "selenium-chrome" ]; then
docker kill selenium-chrome || true
docker rm -v selenium-chrome || true
fi

if [ -n "selenium-firefox" ]; then
docker kill selenium-firefox || true
docker rm -v selenium-firefox || true
fi

if [ "${RHD_JS_DRIVER}" = "firefox" ]; then
  echo "starting docker selenium-firefox ..."
  docker run -d --name selenium-firefox -p 4444:4444 --shm-size 2g selenium/standalone-firefox:3.8.1-aluminum
else
  echo "starting docker selenium-chrome ..."
  docker run -d --name selenium-chrome -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome:3.8.1-aluminum
fi
