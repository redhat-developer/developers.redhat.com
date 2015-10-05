#!/bin/bash

set -e

function setup_mac {
  DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

  if ! type "pngquant" &> /dev/null; then
    brew install pngquant
  fi

  if ! type "optipng" &> /dev/null; then
    brew install optipng
  fi
}

function commit_cdn {

  ## Commit back CDN changes
  git add _cdn/cdn.yml
  git commit -m "Update cdn.yml" || true
  # Fetch any changes made since the build changed
  git pull --rebase origin HEAD
  git push origin HEAD

}

function setup_environment {
  ## Environment setup
  # Read the ruby environment to use from the checkout
  ruby_version=`cat .ruby-version`
  ruby_gemset=`cat .ruby-gemset`

  # Load or install RVM
  if [ -s "$HOME/.rvm/scripts/rvm" ]; then
    export RVM=$HOME/.rvm/bin/rvm
  elif [ -s "/usr/local/rvm/scripts/rvm" ]; then
    export RVM="/usr/local/rvm/bin/rvm"
  else
    \curl -sSL https://get.rvm.io | bash -s stable --user-install --autolibs=read-only
    if [ -s "$HOME/.rvm/scripts/rvm" ]; then
      export RVM=$HOME/.rvm/bin/rvm
    elif [ -s "/usr/local/rvm/scripts/rvm" ]; then
      export RVM="/usr/local/rvm/bin/rvm"
    fi
  fi

  $RVM autolibs read-only

  $RVM install ${ruby_version}

  ## Ruby Setup
  # Ensure we are using the right ruby & gemset
  $RVM gemset create ${ruby_gemset}

  export RVMDO="$RVM ${ruby_version}@${ruby_gemset} do"

  # Make sure rake is installed, so we can execute rake setup
  if [ $($RVMDO gem list rake -i) != "true" ] ; then
    $RVMDO gem install rake
  fi

  #We need bundler, and we need a recent version
  $RVMDO gem install bundler

  ## Build setup
  # Configure the environment. Must run bundle install to bootstrap the env 
  $RVMDO bundle install
  $RVMDO rake setup
}

