#!/bin/bash
set -e

# --
# author: rblake@redhat.com
#
# This script acts as a docker entrypoint and a controller for the backup and restore process.
#
# It performs some sanity checking that general environment variables are set and that all required
# directories are mounted. If sanity checks pass, it then sources the actual script to be executed and
# calls the execute function from that script, passing in all command line arguments
# --

# 
# The required environment variables that must be set for this script and the backup or restore scripts to execute correctly.
#
REQUIRED_ENVIRONMENT_VARIABLES=("POSTGRES_ENV_POSTGRES_USER" "POSTGRES_ENV_POSTGRES_PASSWORD" "POSTGRES_PORT_5432_TCP_PORT" "POSTGRES_PORT_5432_TCP_ADDR")

DRUPAL_FILESYSTEM="/var/www/html"
BACKUP_FILESYSTEM="/backups"

#
# The required filesystems that must be mounted for this script and the backup and restore scripts to execute correctly.
#
REQUIRED_FILESYSTEMS=("$DRUPAL_FILESYSTEM" "$BACKUP_FILESYSTEM")

function log {
	echo "INFO: $1"
}

function exitAndFailWithMessage {
     echo "ERROR: $1" && exit 1;
}


function checkRequiredEnvironmentVariables {
	log "Checking all required environment variables are set..."
	for envVariable in ${REQUIRED_ENVIRONMENT_VARIABLES[@]}; do
		checkRequiredEnvironmentVariable "$envVariable"
	done;
	log "All required environment variables are set."
}

function checkRequiredEnvironmentVariable {
	if [ -z "${!1}" ]; then
    	exitAndFailWithMessage "- Required environment variable '$1' is not set."
    else
    	log "- Required environment variable '$1' is set."
    fi
}

function checkFileSystemMounts {
	log "Checking all required filesystems are correctly mounted..."
	for fileSystem in ${REQUIRED_FILESYSTEMS[@]}; do
		checkFileSystemIsMounted "$fileSystem"
	done
	log "All required filesystems are correctly mounted."
}

function checkFileSystemIsMounted {
     
     if [ ! -d "$1" ]; then
     	exitAndFailWithMessage "- '$1' is not mounted or is not a directory. Please ensure this is correctly mounted using either the -v or --volumes-from argument to docker run."
     else
     	log "- '$1' is correctly mounted."
    fi
}

#
# Begin Script Execution
#

checkFileSystemMounts
checkRequiredEnvironmentVariables

source "./drupal-$1.sh" || exitAndFailWithMessage "'$1' is not supported as the first argument to this script."
validateScriptExecutionParameters "$@"
executeScript "$@"
