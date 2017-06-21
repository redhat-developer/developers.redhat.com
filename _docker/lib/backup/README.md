## Backup

This folder implements a simple backup solution for the developers.redhat.com project.

The code here is designed to be run each time we perform a deployment to production. It runs before any changes
are applied to the current Drupal instance ensuring that we have a full backup of the Drupal database and Drupal
filesystem before applying the latest changes from master branch of the Git repository.

The backup creates a tar.gz file of the current Drupal configuration and also a .gz of the SQL dump
of the current database. Once these files have been created, it will push them to the master branch of a Git repository.
Additionally the backup will be tagged with an identifiable deployment number.

There are two main Ruby classes that perform a backup on any developers.redhat.com environment.

* backup.rb: This script contains the actual calls to perform the backup
* git_backup_strategy.rb: Allows for the results of the backups to be stored in a Git repository

### backup.rb

This performs two tasks:

* Runs a mysqldump of a specified database. By default it will backup the database named `rhd_mysql`
* Takes a tar archive of a particular filesystem. By default it will backup the filesystem at `/drupal`

You can provide a name for the backup tag by providing a single parameter to this script e.g:

```
ruby backup.rb my-backup-name
```

If no name is provided, then the script will generate a timestamp at which the backup was taken as the tag name.

### git_backup_strategy.rb

This will simply add and commit backup files to the provided Git repository. Additionally it will create a Git tag each
time it does a push to the origin repository

### Runtime dependencies

These scripts expect dependencies at runtime to be injected via Docker. The container running the backup process
will expect the following defaults to be injected at runtime:

* /backups: The directory containing the checkout of the Git repository into which backups should be placed
* /drupal: The directory containing the Drupal filesystem that should be backed up

The backup process is designed to be run in a secure manner. Security credentials should be provided by the configuration
of the Docker container in which the backup process executes. The following security credentials are required:

* /home/awestruct/.my.cnf: A my.cnf containing database username, password and host information to connect to for backups
* /home/awestruct/.netrc:  Username/password combo for Github access to HTTPS push to the backup repository


In reality the only environment that truly supports backup is the `drupal-production` environment. As such the
`docker-compose.yml` for that environment has been configured with a `backup` service that correctly mounts all
runtime dependencies into the Docker container.

```
services:
 backup:
  build: ./awestruct
  entrypoint: ruby _docker/lib/backup/backup.rb
  volumes:
   - /credentials/my.cnf:/home/awestruct/.my.cnf
   - /credentials/netrc:/home/awestruct/.netrc
   - /data/drupal:/drupal
   - /git/backups:/backups
```

As with all sensitive environments, these files are only accessible on the physical hosts for that environment
and are not included as part of this Git repository.

## control.rb

`control.rb` has integrated support for running a backup. A backup can be taken via `control.rb` using the following: 

```
bundle exec ./control.rb -e drupal-production --backup
```

This will generate a backup with a timestamped tag

```
bundle exec ./control.rb -e drupal-production --backup my-backup-name
```

This will generate a backup tagged with the name 'my-backup-name'