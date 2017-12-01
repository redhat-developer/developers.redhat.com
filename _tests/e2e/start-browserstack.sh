#!/usr/bin/env bash

if [ -e BrowserStackLocal ]; then
      echo "Browserstack local binary exists, starting . . . "
      ./BrowserStackLocal --key ${RHD_BS_AUTHKEY} --force &
else
   if [ "$(uname)" == "Darwin" ]; then
      echo "Downloading binary for Mac  . . . "
      wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-darwin-x64.zip
      unzip BrowserStackLocal-darwin-x64.zip
      rm -rf BrowserStackLocal-darwin-x64.zip
   else
       echo "Downloading binary for Centos  . . . "
       wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
       unzip BrowserStackLocal-linux-x64.zip
       rm -rf BrowserStackLocal-linux-x64.zip
     fi
    echo "starting Local Browserstack"
   ./BrowserStackLocal --key ${RHD_BS_AUTHKEY} --force &
fi
