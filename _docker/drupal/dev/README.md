### Local development for Drupal

This directory provides facilities for making it easy to develop with Drupal in a way that will ensure you are compatible
with our deployment onto Managed Platform.

In particular this directory provides you with:

* A consistent way of running `composer update` to ensure that dependencies are safe for our production environments
* A quick and convenient way of getting Drupal up-and-running using SSL on your local machine using the same configuration as production
* A quick method of extracting Drupal configuration once you have made changes in your running instance that you wish to submit as a pull request

### Before you start

You will need to install [mkcert](https://github.com/FiloSottile/mkcert) on your local machine so that we can run Drupal locally using
SSL but not receiving any certificate warnings.

Follow the instructions relevant to your operating environment.

### Running `composer update`

Ideally when we're updating the dependencies for the project through `composer`, they should be updated in an environment that matches
our production Drupal instance. This way we can ensure consistent versions of PHP, O/S and anything other dependencies that may
impact the way in which `composer update` runs.

The `run-composer-update.sh` script in this directory runs an instance of the production Drupal container to update the dependencies,
helping to ensure that the configuration will work in our production environment.

To update dependencies in `composer.json`:

* Make your version updates and additions to `composer.json` in your IDE
* Run `bash run-composer-update.sh`
  * This will take a bit of time to complete
* Once the process completes, a `git status` will show you that `composer.json` and `composer.lock` have changes to them and can be submitted as
a pull request to the project

It also has the benefit that your local filesystem is not cluttered with loads of dependencies by composer.

### Running Drupal

To run Drupal, simply execute:

```bash
bash run-drupal.sh
```      

This will:

* Pull the latest copy of the production Drupal configuration
* Start a MariaDB database on your local machine, bound to port `3306` with the root credentials set to:
    * username: root
    * password: password
* Generate a set of SSL certificates on for your local machine
* Start Drupal on port `443` on your local machine

Once the script has finished running, you can access Drupal at [https://localhost](https://localhost)

### Exporting configuration from Drupal

When you're ready to export changes from your running Drupal instance that you wish to submit in a pull request, simply
run:

```bash
bash run-config-export.sh
```

This will connect to the Drupal Docker container and run `drush cex -y` to export the configuration from your running Drupal
instance.

The configuration is also immediately copied into the `_docker/drupal/drupal-filesystem/web/config/sync`, so it's just a case
of verifying the changes and then committing and pushing your pull request.

### Working with Drupal

The best way to work with Drupal is to use `drush` to inspect settings etc. `drush` is installed into the Drupal container
and configured to work out-of-the-box with the running Drupal instance.

To connect to Drupal, simply use the following:

```bash
bash run-drupal-connect.sh
```

You're now attached to the Drupal container and can run all of the `drush` commands.

So for example to inspect the settings for the `openid_connect` module:

```bash
bash run-drupal-connect.sh
drush cget openid_connect.settings.keycloak --include-overridden
```

When you've finished working with Drupal, simply type `exit` to leave the container.

### Tidying up

Once you've finished and want to completely tidy up your workspace, simply run:

```bash
bash run-cleanup.sh
```

This will delete all resources running on your local machine.


### A typical work-flow:

* Update `composer.json` and then run `bash run-composer-update.sh` to update dependencies for Drupal
* Start Drupal using `bash run-drupal.sh`
* Access [https://localhost](https://localhost) and use the Drupal Admin interface to install a new module and configure it
* Run `bash run-config-export.sh` to export your changes into your working tree, commit and raise a pull request with your changes
* Run `bash run-clean.up` to tidy up your local development environment.


    