#!/bin/bash

build=false
restart=false

function show_help() {
  echo "
Shortcuts to control Docker containers\n
    -b      Build the containers
    -r      Restart the containers
    -h / -? Show this help message
"
}

OPTIND=1         # Reset in case getopts has been used previously in the shell.
while getopts "h?br" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    b)  build=true
        ;;
    r)  restart=true
        ;;
    esac
done

shift $((OPTIND-1))

if [ $build = true ]; then
  docker-compose build
fi

if [ $restart = true ]; then
  docker-compose kill 
  docker-compose up -d
fi

