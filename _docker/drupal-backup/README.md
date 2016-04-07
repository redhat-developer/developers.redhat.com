# Drupal Pilot Environment - Backup

The purpose of the scripts within this directory and the Docker images built from the Dockerfiles is to create a simple, portable method of fully backing up a Postgres database and a Drupal filesystem running within a Docker environment. It also supports fully restoring a Docker based Drupal and Postgres environment from the resulting backups.

The following assumptions have been made about this implementation:

- That it is OK to take a full snapshot of the filesystem and database each time it runs
- That there exists some durable storage onto which the resulting backups can be stored
- That restoring from a backup should be as easy as creating one
- That backups and restores should be automated via a CI environment such as Jenkins

## Scripts

There are 3 scripts that make up the implementation:

- docker-entrypoint.sh
- drupal-backup.sh
- drupal-restore.sh

### docker-entrypoint.sh

As the name would suggest this script is the entry-point into the Docker images built as part of this process. It performs 3 main tasks:

- Verifying that all required environment variables are set
- Verifying that all required filesystems mounts are set
- Delegating to either drupal-backup.sh or drupal-restore.sh depending on the requested operation

The following environment variables are required:

- POSTGRES_ENV_POSTGRES_USER: The postgres user name
- POSTGRES_ENV_POSTGRES_PASSWORD: The password for the postgres user
- POSTGRES_PORT_5432_TCP_PORT: The port of the postgres instance
- POSTGRES_PORT_5432_TCP_ADDR: The IP address or hostname of the postgres instance

The following filesystems must be mounted:

- The Drupal installation filesystem (expected at /var/www/html) 
- The directory into which backups will be stored (expected at /backups)


### drupal-backup.sh

This script will take a full backup of connected Drupal and Postgres instances. It uses pg_dump to create an SQL file dump of the Postgres database and TAR to create a tarball of the Drupal filesystem.

Each run of the backup script creates a timestamped directory within /backup e.g. 2016-04-11-12-15-00. Directories are named like this so that the result of `ls -1` will show the most recent backup available to the user.

Inside the backup directory, there will be two files:

- drupal-db.sql: The SQL dump of the Drupal database from Postgres
- drupal-fs.tar.gz: The Tarball of the Drupal filesystem

### drupal-restore.sh 

This script will perform a full restore from a backup directory. The directory must be specified as a parameter to the script.

The script will verify that the directory exists and that it contains both the SQL file and Tarball in the expected named format. If yes, it will:

- Drop and recreate the Postgres database, before importing the SQL file
- Delete everything within the Drupal filesystem recreating it from the Tarball.

## Running a backup

The backup process itself is run as a Docker container. This allows Docker to all inject dependencies into the backup process making it usable in different environments and on individual developers machines.

First, you must build the backup image:

```
docker build -t developer.redhat.com/drupal-backup -f ./Dockerfile.drupal-backup .
```

and then to run the backup:

```
docker run --rm --link <your_postgres_container>:postgres --volumes-from <your_drupal_container> -v <your_backup_volume>:/backups developers.redhat.com/drupal-backup
```

So for example, lets assume in your environment your Drupal container is called `docker_drupal_1`, your Postgres container is called `docker_drupalpgsql_1` and you have a NAS mount on your machine at `/reliable-backup-storage` that you wish to store backups on, the runtime command is:

```
docker run --rm --link docker_drupalpgsql_1:postgres --volumes-from docker_drupal_1 -v /reliable-backup-storage:/backups developers.redhat.com/drupal-backup
```
## Running a restore

Running a restore is very similar to running a backup, simply changing the Docker image we are using and also specifying which backup we want to restore from.

Additionally the script will prompt you to confirm that you want to run the restore as it is a destructive action that cannot be reversed. For this very reason, it is recommended that you spin up another environment using Docker Compose and restore into that rather than trying to restore into a running environment. To run a restore again assuming that your Drupal instance is called `docker_drupal_1`, your postgres instance is called `docker_drupalpgsql_1` and backups are stored on `/reliable-backup-storage`, use the following:

```
docker run -i --rm --link docker_drupalpgsql_1:postgres --volumes-from docker_drupal_1 -v /reliable-backup-storage:/backups developers.redhat.com/drupal-restore 2016-04-07-14-17-07
```
In this case we are restoring from the backup taken on `2016-04-07-14-17-07`. The script will then prompt you if you want to continue. Simply enter 'Y' and then press enter to complete the restore.

## Jenkins integration

Jenkins integration is trivial for automation of backups.

Create a Jenkins job that has the following build steps:

- Checks out the master branch of the redhat.developers.com code
- Executes a Shell build step wrapping the docker build and docker run commands

The job can be configured to run on a timer for daily backups. It can also be initiated manually or via other jobs for point-in-time backups e.g. before a code push
