## Staging Sync

The purpose of the code within this directory is to aid in the automation of  the synchronisation of the
developers.stage.redhat.com Drupal instance with the developers.redhat.com instance. Synchronisation of two Drupal
instances is performed by:

* Ensuring that both instances have the same database content
* Ensuring that both instances have the same active configuration
* Ensuring that both instances have the same images and other assets uploaded by content creators

The synchronisation code here aids with ensuring that the staging database contains the same content as the production
database. It therefore:

* Takes a backup of the existing database in staging
* Drops and re-creates the existing database
* Imports the latest production database into the newly created staging database

### Execution of the synchronisation

The synchronisation code is executed by the Production_Sync Jenkins job in the RHDP Jenkins instance. The job calls this
code and additionally:

* Ensures that the staging Drupal instance is cleanly terminated before beginning the synchronisation
* Ensures that the latest redhatdeveloper/drupal-data Docker image has been pulled from Docker Hub before starting the synchronisation
* Initiates the Drupal deployment pipeline in the staging environment once the database has been imported
