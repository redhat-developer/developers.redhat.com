## Backup Reset

This directory contains a small utility script that is executed once-per-week by the RHDP Jenkins instance.

The backup process for the RHDP project uses Git LFS for backup storage. Each time a backup is taken, a new tag is created
before being pushed to GitHub. Over time this gradually uses up all of the available disk space on the Jenkins slave
that runs the backup process.

This utility script therefore:

* Deletes the existing Git checkout of the backup repository to reclaim disk space
* Clones the backup repository using Git LFS ensuring only to pull master branch

The script is designed to run within the `backup` Docker container within the `drupal-production` environment. When the
script executes, the `docker-compose.yml` definition for the `drupal-production` environment ensures that it has the
correct credentials to pull the backup repository from GitHub and also ensures that the repository is cloned with the
correct user permissions.
