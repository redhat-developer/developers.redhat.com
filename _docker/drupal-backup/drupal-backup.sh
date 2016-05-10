#!/bin/bash

#
# @author - rblake@redhat.com
#
# Small script to backup both a postgres database and the Drupal filesystem
# This script is sourced by the main docker-entrypoint.sh, hence it only exposes functions
#

#
# ------- Main functions ----------------------
#


#
# Validates that this script is being called with the expected parameters. 
#
function validateScriptExecutionParameters {
	scriptArguments=("$@")
	if [ "${scriptArguments[0]}" != "backup" ]; then
		exitAndFailWithMessage "'backup' must be the first and only parameter to this script."
	fi		
}

#
# The main entrypoint function for this script.
#
function executeScript {
	backupDirectory=$(createBackupDirectory)
	log "Commencing backup into directory '$backupDirectory'..."
	backupPostgresDatabase "$backupDirectory"
	backupDrupalFilesystem "$backupDirectory"
	log "Backup is complete."
}

#
# ------- Supporting functions ---------------------
#

#
# Creates the directory into which we will be conducting this backup
#
function createBackupDirectory {
	backupDirectoryName="$BACKUP_FILESYSTEM/$(/bin/date +"%Y-%m-%d-%H-%M-%S")"
	
	if [ -d "$directoryName" ]; then
		exitAndFailWithMessage "Backup directory '$backupDirectoryName' already exists. Is there a concurrent backup running?"
	else
		/bin/mkdir -p "$backupDirectoryName" || exitAndFailWithMessage "Cannot create backup directory '$backupDirectoryName'. Please check filesystem permissions and free space."
	fi
	echo "$backupDirectoryName"
}

#
# Takes a pg_dump of the connected Postgres database and stores the resulting .sql file 
# in the backup directory for this run
# @param - The backup directory name
#
function backupPostgresDatabase {
	pgDumpFileName="$1/$POSTGRES_DATABASE_SQL_DUMP_NAME"
	
	log "- Dumping database '$POSTGRES_ENV_POSTGRES_USER' on host '$POSTGRES_PORT_5432_TCP_ADDR:$POSTGRES_PORT_5432_TCP_PORT' to file '$pgDumpFileName'"
	
	export PGPASSWORD="$POSTGRES_ENV_POSTGRES_PASSWORD"
	pg_dump -f "$pgDumpFileName" -d "$POSTGRES_ENV_POSTGRES_USER" -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U "$POSTGRES_ENV_POSTGRES_USER" -w \
		|| exitAndFailWithMessage "Failed to backup postgres database."

	log "- Completed dump of database."
}

#
# Creates a backup of the Drupal filesystem as a TAR archive.
# @param - The backup directory name
#
function backupDrupalFilesystem {
	drupalTarFileName="$1/$DRUPAL_FILESYSTEM_TAR_NAME"
	log "- Creating TAR archive of Drupal filesystem '$DRUPAL_FILESYSTEM' in '$drupalTarFileName"
	/bin/tar -czf "$drupalTarFileName" -C "$DRUPAL_FILESYSTEM_PREFIX" "$DRUPAL_FILESYSTEM_SLUG" || exitAndFailWithMessage "Failed to create TAR archive of Drupal filesystem at '$DRUPAL_FILESYSTEM'"
	log "- Completed backup of Drupal filesystem to TAR archive '$drupalTarFileName'"
}