## Backup

This folder contains two Ruby classes that perform a backup on any developers.redhat.com environment.

* backup.rb -> This script contains the actual calls to perform the backup
* git_backup_strategy.rb -> Allows for the results of the backups to be stored in a Git repository

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

This will simply add and commit backup files to the provided Git repository. Additionally it will create a Git tag each time
it does a push to the origin repository

### Runtime dependencies

These scripts expect dependencies at runtime to be injected via Docker. The following are the expected defaults:

* /backups -> A checkout of the Git repository into which backups should be placed
* /drupal -> The volume containing the Drupal filesystem that should be backed up

In addition the following security credentials are required:

* /home/awestruct/.my.cnf -> The my.cnf containing username, password and host information to connect to for backups
* /home/awestruct/.netrc -> Username/password combo for Github access to HTTPS push to the backup repository

To provide the above, simply ensure that your docker run statement bind mounts all required dependencies:

For example:

```
docker run --rm -v /data/drupal:/drupal -v /git/backups:/backups -v /credentials/my.cnf:/home/awestruct/.my.cnf -v /credentials/netrc:/home/awestruct/.netrc backup
```

Alternatively (and the recommended approach), specify all of the above in a docker-compose file for your environment:

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

## control.rb

control.rb has been updated to support running of backups. The following are now supported:

```
bundle exec ./control.rb --backup
```

This will generate a backup with a timestamped tag

```
bundle exec ./control.rb --backup my-backup-name
```

This will generate a backup tagged with the name 'my-backup-name'