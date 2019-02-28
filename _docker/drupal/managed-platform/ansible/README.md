### Developer Drupal Ansible Playbooks

This directory contains a number of Ansible playbooks that control the bootstrap and deployment process for the Developer Drupal instance.

The playbooks currently in this directory and designed to run Drupal on Managed Platform, but also locally on your machine as a developer. The playbooks
here currently are:

* `bootstrap-env.yml` - Bootstraps the environment for Drupal to run in
* `bootstrap-drupal.yml` - Runs a number of [drush](https://www.drush.org/) commands to import the most recent configuration into Drupal
* `backup-drupal.yml` - Runs a backup of Drupal and optionally pushes the content to Amazon S3
* `run-cron.yml` - A playbook that invokes Drupals cron facility
* `cleanup-env.yml` - A playbook that cleans up a deployment of Drupal (this is typically only used on Managed Platform)

The playbooks have been designed to be run in a certain order as independent steps of bringing Drupal online. How these playbooks are invoked in the correct
order is completely a decision of the environment that you're running Drupal in:

* For local development, `docker-compose` will ensure that this happens
* For Managed Platform, the correct order of playbooks is handled via Kubernetes InitContainers.


#### Supporting different environments in Ansible

The playbooks in this directory expect to be passed environment specific configuration via the file `/credentials/ansible/env.yml`. Again how this file
is created is completely up to the environment in which you are running:

* For local development, this will be a file on your machine mounted into the playbook container in `docker-compose`
* For Managed Platform, this will be a Kubernetes secret mounted into the Pod

You can see an example of [env.yml](testing/env.yml)

In addition to the `env.yml`, there are a number of directories within the [templates](templates) directory that map onto specific environments. The
directory from the templates directory that will be used by the playbooks is controlled by the `rhdp_environment` variable in `env.yml`. So for example:

If I wanted to use the templates from the `templates/dev` directory, I would ensure that the `env.yml` file available to the playbooks has the following in it:

`rhdp_environment: dev` 

Any templates that are common between all environments can be placed into the [common](templates/common) directory and referenced in the playbooks.

The list of currently supported environments are:

* `local` -> Local development on your machine 
* `dev` -> developers.dev.redhat.com
* `stage` -> developers.stage.redhat.com
* `prod` -> developers.redhat.com


#### Testing playbooks

The [testing](testing) directory has been provided to test each of the playbooks. There is a `README.md` within each testing sub-directory that explains
how to use the `docker-compose` environment locally to test the playbook.

The testing directory also provides [cleanup-testing-envs.sh](testing/cleanup-testing-envs.sh) which is useful for ensuring that your local testing environment is clean.
  
