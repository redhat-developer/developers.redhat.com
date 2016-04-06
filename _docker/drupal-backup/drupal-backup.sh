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
# There is only one expected parameter for this and it is 'backup'.
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
# -----------------------------------------
#

#
# ------- Supporting functions ---------------------
#

#
# Creates the directory into which we will be conducting this backup
#
function createBackupDirectory {
	backupDirectoryName="/backups/$(/bin/date +"%Y-%m-%d-%H-%M-%S")"
	
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
#
function backupPostgresDatabase {
	pgDumpFileName="$1/drupal-db.sql"
	
	log "- Dumping database '$POSTGRES_ENV_POSTGRES_USER' on host '$POSTGRES_PORT_5432_TCP_ADDR:$POSTGRES_PORT_5432_TCP_PORT' to file '$pgDumpFileName'"
	
	export PGPASSWORD="$POSTGRES_ENV_POSTGRES_USER"
	pg_dump -f "$pgDumpFileName" -d "$POSTGRES_ENV_POSTGRES_USER" -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U "$POSTGRES_ENV_POSTGRES_USER" -w \
		|| exitAndFailWithMessage "Failed to backup postgres database."

	log "- Completed dump of database."
}

#
# Creates a backup of the Drupal filesystem as a TAR archive.
# NOTE: This currently excludes the 'themes' sub-directory as this is bind-mounted onto the Drupal
# instance, and hence we should assume that this is the canonical representation of the theme, not the
# backup
#
function backupDrupalFilesystem {
	drupalTarFileName="$1/drupal-fs.tar.gz"
	log "- Creating TAR archive of Drupal filesystem '/var/www/html' in '$drupalTarFileName"
	/bin/tar -czvf "$drupalTarFileName" -C "/var/www" --exclude "themes" "html" || exitAndFailWithMessage "Failed to create TAR archive of Drupal filesystem at '/var/www/html'"
	log "- Completed backup of Drupal filesystem to TAR archive '$drupalTarFileName'"
}

