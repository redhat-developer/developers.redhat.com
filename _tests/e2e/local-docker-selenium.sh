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
  docker run -d --name selenium-firefox -p 4444:4444 --shm-size 2g selenium/standalone-firefox-debug
else
  echo "starting docker selenium-chrome ..."
  echo "TO DEBUG, using vnc viewer in terminal execute: open vnc://:secret@0.0.0.0:5900"
  docker run -d --name selenium-chrome -p 5900:5900 -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome-debug
fi
