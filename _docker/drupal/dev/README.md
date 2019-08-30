### Local development for Drupal

This directory provides facilities for making it easy to develop with Drupal in a way that will ensure you are compatible
with our deployment onto Managed Platform.

In particular this directory provides you with:

* A consistent way of running `composer update` to ensure that dependencies are safe for our production environments
* A quick and convenient way of getting Drupal up-and-running using SSL on your local machine using the same configuration as production
* A quick method of extracting Drupal configuration once you have made changes in your running instance that you wish to submit as a pull request

### Before you start

#### Provide registry.redhat.io login details

The local development environment requires some Docker images from registry.redhat.io. To be able to pull these images, you need to provide your
user account details for this registry.

To do that, firstly visit registry.redhat.io and ensure that you can log in (you should be able to log in with your Red Hat Developer account)

Next copy `local-config.sh.example` to `local-config.sh` and provide the values for your username and password. `local-config.sh` should not be committed
to Git and is already set to be ignored.


#### Install mkcert

You will need to install [mkcert](https://github.com/FiloSottile/mkcert) on your local machine so that we can run Drupal locally using
SSL but not receiving any certificate warnings.

Follow the instructions relevant to your operating environment.

#### Effective user of the containers

The local development environment is designed to map your current user id into the containers to ensure that any files written by Drupal or created
as part of the Drupal bootstrap process are owned by you. To do this, the wrapper scripts set the variable `DUID` to your current `id` when
you run the script.

If you wish to run containers directly using `docker-compose` commands, then you will need to set this variable manually. The most effective way of doing this
is adding the following to your `$HOME/.bashrc` file:

```shell script
export DUID=$(id -u)
```

### Running `composer update`

Ideally when we're updating the dependencies for the project through `composer`, they should be updated in an environment that matches
our production Drupal instance. This way we can ensure consistent versions of PHP, O/S and anything other dependencies that may
impact the way in which `composer update` runs.

The `run-composer-update.sh` script in this directory runs an instance of the production Drupal container to allow you to update the dependencies,
helping to ensure that the configuration will work in our production environment.

To update dependencies in `composer.json`:

* Run `bash run-composer-update.sh`
* Execute your desired `composer` commands e.g. `composer require drupal/foo:1.2.3`
* Once you're finished, simply exit the container
* Commit your changes to Git and raise a pull request.


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
* Start two instances of [memcached](https://memcached.org) on your local machine

Once the script has finished running, you can access Drupal at [https://localhost](https://localhost)

#### Running Drupal with Memcached

The local environment also has support for replacing Drupal's database cache with memcached. The database currently remains the default, but it is easy to replace this.

Once you have Drupal running simply edit the `./drupal-workspace/drupal_1/drupal/credentials/rhd.settings.php:/var/www/drupal/web/sites/default/rhd.settings.php` file and change
the value of `$config['redhat_developers']['cache']['engine']` to `memcached`.

Once you have done this, connect to the Drupal container using the `./run-drupal-connect.sh` script and execute `drush cr`. This will switch your environment to use
Memcached for the cache. This change will last until you run `./run-drupal.sh` again.

### Exporting configuration from Drupal

When you're ready to export changes from your running Drupal instance that you wish to submit in a pull request, simply
run:

```bash
bash run-config-export.sh
```

This will run `drush cex -y` to export the configuration from your local Drupal instance. The above script performs a quick check
to make sure Drupal is running as a way to verify that you've run `run-drupal.sh` before trying to perform a config export.

All configuration changes are immediately exported into `_docker/drupal/drupal-filesystem/web/config/sync`, so it's just a case
of verifying the changes are what you expect and then committing and pushing your pull request.

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

* Run `bash run-composer-update.sh` to update dependencies for Drupal
* Start Drupal using `bash run-drupal.sh`
* Access [https://localhost](https://localhost) and use the Drupal Admin interface to install a new module and configure it
* Run `bash run-config-export.sh` to export your changes into your working tree, commit and raise a pull request with your changes
* Run `bash run-clean.up` to tidy up your local development environment.


    