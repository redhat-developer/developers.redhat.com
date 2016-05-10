#!/bin/bash

#
# @author - rblake@redhat.com
#
# Small script to restore both a postgres database and the Drupal filesystem
# This script is sourced by the main docker-entrypoint.sh, hence it only exposes functions
#

#
# Validates that this script is being called with the expected parameters. 
#
function validateScriptExecutionParameters {
	scriptArguments=("$@")
	if [ "${scriptArguments[0]}" != "restore" ]; then
		exitAndFailWithMessage "'restore' must be the first parameter to this script."
	fi

	#
	# Verify that the caller has specified the backup that they want to use for the restore
	#
	if [ "${scriptArguments[1]}" == "" ]; then
		exitAndFailWithMessage "Please specify a backup directory that you wish to restore from e.g. 2016-04-07-11-44-00"
	fi

	#
	# Sanity check that the directory the user has specified is what we expect it to be
	#
	checkAllRequiredBackupFilesExist "${scriptArguments[1]}"
}

#
# Main script entry point
#
function executeScript {
	scriptArguments=("$@")
	backupDirectory="$BACKUP_FILESYSTEM/${scriptArguments[1]}"
	areYouSure "$backupDirectory"
	
	log "Beginning restore from backup '$backupDirectory'..."
	restoreDrupalFileSystem "$backupDirectory"
	restorePostgresDatabase "$backupDirectory"
	log "Restore from directory '$backupDirectory' complete."
}

#
# ------- Supporting functions ---------------------
#

#
# Returns the absolute path to a file within the requested 
#
function getRestoreFileAbsoluteLocation {
	echo "$BACKUP_FILESYSTEM/$1/$2"
}

#
# Checks that all required backup files exist within the requested backup directory
# @param - The directory to be restored from
#
function checkAllRequiredBackupFilesExist {
	log "Verifying content of requested backup directory '$1'"
	backupDirectory="$BACKUP_FILESYSTEM/$1"
	if [ ! -d "$backupDirectory" ]; then
		exitAndFailWithMessage "Cannot restore from directory '$backupDirectory' as it does not exist."
	fi

	postgresSqlFile=$(getRestoreFileAbsoluteLocation "$1" "$POSTGRES_DATABASE_SQL_DUMP_NAME")
	checkFileExistsAndIsReadable "$postgresSqlFile"

	drupalFileSystemTarFile=$(getRestoreFileAbsoluteLocation "$1" "$DRUPAL_FILESYSTEM_TAR_NAME")
	checkFileExistsAndIsReadable "$drupalFileSystemTarFile"
	log "Verifed contents of requsted backup directory"
}

#
# Checks that the given file exists and can be read by this process
# @param  - The file to check that exists and is readable
#
function checkFileExistsAndIsReadable {
	if [ ! -e "$1" ] || [ ! -r "$1" ]; then
		exitAndFailWithMessage "Cannot proceed with restore as required file '$1' does not exist or is not readable."
	fi
}

#
# Restores the linked Drupal filesystem
# @param - The directory to restore from
#
function restoreDrupalFileSystem {
	tarArchive="$1/$DRUPAL_FILESYSTEM_TAR_NAME"
	log "- Restoring Drupal filesystem '$DRUPAL_FILESYSTEM' from TAR archive '$tarArchive'"
	
	/bin/rm -rf "$DRUPAL_FILESYSTEM/*" || exitAndFailWithMessage "Cannot completely remove contents of '$DRUPAL_FILESYSTEM'. Please verify filesystem permissions."
	/bin/tar zxf "$tarArchive" -C "$DRUPAL_FILESYSTEM_PREFIX" || exitAndFailWithMessage "Failed to extract TAR archive '$tarArchive' into Drupal filesystem at '$DRUPAL_FILESYSTEM'."

	log "- Restore of Drupal filesystem complete."
}

#
# Restores the linked Postgres database
# @param - The directory to restore from
#
function restorePostgresDatabase {
	
	dbHost="$POSTGRES_PORT_5432_TCP_ADDR:$POSTGRES_PORT_5432_TCP_PORT"
	log "- Restoring Postgres database '$POSTGRES_ENV_POSTGRES_USER' on host '$dbHost'"
	
	postgresSqlFile="$1/$POSTGRES_DATABASE_SQL_DUMP_NAME"
	export PGPASSWORD="$POSTGRES_ENV_POSTGRES_PASSWORD"

	dropdb --if-exists -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U "$POSTGRES_ENV_POSTGRES_USER" -w "$POSTGRES_ENV_POSTGRES_USER" \
		|| exitAndFailWithMessage "Failed to drop database '$POSTGRES_ENV_POSTGRES_USER' on '$dbHost'"
	
	createdb -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U "$POSTGRES_ENV_POSTGRES_USER" -w "$POSTGRES_ENV_POSTGRES_USER" \
		|| exitAndFailWithMessage "Failed to re-create database '$POSTGRES_ENV_POSTGRES_USER' on '$dbHost'"
	
	psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U "$POSTGRES_ENV_POSTGRES_USER" -w -d "$POSTGRES_ENV_POSTGRES_USER" < "$postgresSqlFile" > /dev/null \
		|| exitAndFailWithMessage "Failed to import '$postgresSqlFile' into database '$POSTGRES_ENV_POSTGRES_USER' on '$dbHost'"

	log "- Postgres database '$POSTGRES_ENV_POSTGRES_USER' successfully restored."
}

#
# The restore process is destructive for the linked database and filesystem. Lets give people a chance to
# double check this is actually what they want to do.
# @param - The folder location requested to restore from
#
function areYouSure {
	log "Are you absolutely sure you want to restore the database and file system from directory '$1' (Y/N)?:"
	read answer

	if [ "$answer" != "Y" ]; then
		exitAndFailWithMessage "User aborted restore from backup '$1'."
	fi
}