## developers.redhat.com Environments

In this directory you will find Docker Compose definitions for all of the environments supported by the
developers.redhat.com project.

The environments supported by the RHDP project are as follows:

* drupal-dev: The local development environment for running Awestruct and Drupal combined
* drupal-dev-local-dcp: The local development environment that additionally runs a local instance of the DCP server
* drupal-pull-request: The new pull request environment that will support both Awestruct and Drupal
* drupal-staging: The new staging environment for Drupal version of developers.redhat.com
* drupal-production: The new production environment for Drupal version of developers.redhat.com

### Per-environment docker-compose.yml

Each environment has its own docker-compose.yml file. The service definitions within these files may vary depending on
the operations supported by that environment. The purpos of having a per-environment docker-compose.yml file is:

* Remove any templating logic from the docker-compose.yml file
* Remove any unnecessary services from each environment
* Allow environment changes to be tested independently
* Provide clarity of what is actually running in each environment

All changes to environment definitions should be made through the typical pull request mechanism and reviewed by another
team member before being merged.


### I see rhd.settings.php in the folder for some Drupal environments but not others?

`rhd.settings.php` is a PHP file that allows us to provide Drupal with environment properties and database connection
details. 

For sensitive environments i.e. staging and production, this file is not checked in to Git. Instead
it is deployed within the environment. This means that production database settings etc are only accessible to those
with the correct credentials for the production environment.

For the drupal-dev environment, rhd.settings.php is checked-in because that environment only runs on your machine. There
is no security risk and it is actually desirable for you to know the database user and password to help with
your development.

#### drupal-pull-request/rhd.settings.yml.erb

For the `drupal-pull-request` environment, rhd.settings.yml has to be templated. Templating is required because we run
multiple instances of Drupal on the same Jenkins slave and would run into port conflicts if we hard-coded it within
within the docker-compose.yml.  

The port Drupal runs on is required as part of the Awestruct process that pushes content into Drupal, but we do not know
it until we start the Drupal container. Therefore it is necessary to create the `drupal-pull-request/rhd.settings.yml` 
file each time we run a build in the `drupal-pull-request` environment.

For this very reason, `drupal-pull-request/rhd.settings.yml` should not be checked in to Git. A .gitignore directive in the `drupal-pull-request` directory should prevent this.