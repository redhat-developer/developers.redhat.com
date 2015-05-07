#!/bin/bash

build=false
restart=false

function show_help() {
  echo "
Shortcuts to control Docker containers

    -d      Override boot2docker DNS config to force use of Red Hat DNS servers
    -b      Build the containers
    -r      Restart the containers
    -h / -? Show this help message
"
}

OPTIND=1         # Reset in case getopts has been used previously in the shell.
while getopts "h?bdr" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    b)  build=true
        ;;
    r)  restart=true
        ;;
    d)
      boot2docker up
      boot2docker ssh "echo $'EXTRA_ARGS=\"--dns=10.5.30.160 --dns=10.11.5.19 --dns=8.8.8.8\"' | sudo tee -a /var/lib/boot2docker/profile && sudo /etc/init.d/docker restart"
      exit 0
      ;;
    esac
done

shift $((OPTIND-1))

if [ $build = true ]; then
  docker build --tag developer.redhat.com/base ./base
  docker build --tag developer.redhat.com/java ./java
  docker-compose build
fi

if [ $restart = true ]; then
  docker-compose kill 
  docker-compose up -d
fi

