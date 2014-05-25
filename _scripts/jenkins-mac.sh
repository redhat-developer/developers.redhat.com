#!/bin/bash

DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

if ! type "pngquant" > /dev/null; then
  # Needs replacing with non-platform specific step!
  brew install pngquant
fi

if ! type "optipng" > /dev/null; then
  # Needs replacing with non-platform specific step!
  brew install optipng
fi

