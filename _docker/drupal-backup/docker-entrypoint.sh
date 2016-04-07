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

#
# Drupal filesystem prefix
#
DRUPAL_FILESYSTEM_PREFIX="/var/www"

#
# Drupal filesystem slug
#
DRUPAL_FILESYSTEM_SLUG="html"

#
# Drupal filesystem
#
DRUPAL_FILESYSTEM="$DRUPAL_FILESYSTEM_PREFIX/$DRUPAL_FILESYSTEM_SLUG"

#
# Expected backup filesystem location
#
BACKUP_FILESYSTEM="/backups"

#
# Default name of Drupal database SQL dump
#
POSTGRES_DATABASE_SQL_DUMP_NAME="drupal-db.sql"

#
# Default name of Drupal filesystem TAR file
#
DRUPAL_FILESYSTEM_TAR_NAME="drupal-fs.tar.gz"

#
# The required filesystems that must be mounted for this script and the backup and restore scripts to execute correctly.
#
REQUIRED_FILESYSTEMS=("$DRUPAL_FILESYSTEM" "$BACKUP_FILESYSTEM")

#
# Simple log function
#
function log {
	echo "INFO: $1"
}

#
# Logs a message with ERROR prefix and then exits with status code '1'
#
function exitAndFailWithMessage {
     echo "ERROR: $1" && exit 1;
}

#
# Checks that all required environment variables are set
#
function checkRequiredEnvironmentVariables {
	log "Checking all required environment variables are set..."
	for envVariable in ${REQUIRED_ENVIRONMENT_VARIABLES[@]}; do
		checkRequiredEnvironmentVariable "$envVariable"
	done;
	log "All required environment variables are set."
}


#
# Checks that a specific environment variable is set
#
function checkRequiredEnvironmentVariable {
	if [ -z "${!1}" ]; then
    	exitAndFailWithMessage "- Required environment variable '$1' is not set."
    else
    	log "- Required environment variable '$1' is set."
    fi
}

#
# Checks that all required filesystem mounts are indeed mounted
#
function checkFileSystemMounts {
	log "Checking all required filesystems are correctly mounted..."
	for fileSystem in ${REQUIRED_FILESYSTEMS[@]}; do
		checkFileSystemIsMounted "$fileSystem"
	done
	log "All required filesystems are correctly mounted."
}

#
# Checks that a particular filesystem is mounted
#
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
exit 0