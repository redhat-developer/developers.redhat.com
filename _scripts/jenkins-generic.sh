#!/bin/bash

## Environment setup
# Read the ruby environment to use from the checkout
ruby_version=`cat .ruby-version`
ruby_gemset=`cat .ruby-gemset`

# Load RVM
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"

## Ruby Setup
# Ensure we are using the right ruby & gemset
rvm_install_on_use_flag=1 rvm --create use ${ruby_version}@${ruby_gemset}

# Make sure rake is installed, so we can execute rake setup
rvm ${ruby_version}@${ruby_gemset} do gem install rake --no-document

## Build setup
# Configure the environment. Must run bundle install to bootstrap the env 
bundle install
rake setup 

## Build execution
# Run the build
rake deploy[staging]

## Commit back CDN changes
git add _cdn/cdn.yml
git commit -m "Update cdn.yml"
git push origin HEAD

