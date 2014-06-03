#!/bin/bash

DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

if ! type "pngquant" > /dev/null; then
  brew install pngquant
fi

if ! type "optipng" > /dev/null; then
  brew install optipng
fi

curl http://curl.haxx.se/ca/cacert.pem > cacert.pem

