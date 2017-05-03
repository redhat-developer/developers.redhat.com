# Composer template for Drupal projects

[![Build Status](https://travis-ci.org/drupal-composer/drupal-project.svg?branch=8.x)](https://travis-ci.org/drupal-composer/drupal-project)

This project template should provide a kickstart for managing your site
dependencies with [Composer](https://getcomposer.org/).

If you want to know how to use it as replacement for
[Drush Make](https://github.com/drush-ops/drush/blob/master/docs/make.md) visit
the [Documentation on drupal.org](https://www.drupal.org/node/2471553).

## Usage

First you need to [install composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx).

> Note: The instructions below refer to the [global composer installation](https://getcomposer.org/doc/00-intro.md#globally).
You might need to replace `composer` with `php composer.phar` (or similar) 
for your setup.

After that you can create the project:

```
composer create-project drupal-composer/drupal-project:8.x-dev some-dir --stability dev --no-interaction
```

With `composer require ...` you can download new dependencies to your 
installation.

```
cd some-dir
composer require drupal/devel:8.*
```

The `composer create-project` command passes ownership of all files to the 
project that is created. You should create a new git repository, and commit 
all files not excluded by the .gitignore file.

## Restoring content to Drupal

If something goes wrong and you need to restore the drupal environment from a backup the steps are pretty easy:

1. Obtain the backup. This will include an sql file an a tar.gz file.
2. Extract the tar.gz file into `_docker/drupal/web`.
3. Execute `control.rb -e drupal-dev --run-the-stack`.
4. Copy the sql file into the drupalmysql container using `docker cp /path/to/drupal-db.sql drupaldev_drupalmysql_1:/drupal-db.sql`
5. Obtain a shell for the drupalmysql docker container using: `docker exec -it drupaldev_drupalmysql_1 /bin/bash`
6. Restore the database using the `mysql` command: `mysql -u drupal -p drupal < /drupal-db.sql`, you'll be asked to enter the password.

You should now have a drupal environment up and running with everything from the backup.

NOTE: These instructions are tailored for a development environment. If you need to use a different environment please change step 3 to reference the correct environment and the container names in steps 4 and 5 will also need changing.

## What does the template do?

When installing the given `composer.json` some tasks are taken care of:

* Drupal will be installed in the `web`-directory.
* Autoloader is implemented to use the generated composer autoloader in `vendor/autoload.php`,
  instead of the one provided by Drupal (`web/vendor/autoload.php`).
* Modules (packages of type `drupal-module`) will be placed in `web/modules/contrib/`
* Theme (packages of type `drupal-theme`) will be placed in `web/themes/contrib/`
* Profiles (packages of type `drupal-profile`) will be placed in `web/profiles/contrib/`
* Creates default writable versions of `settings.php` and `services.yml`.
* Creates `sites/default/files`-directory.
* Latest version of drush is installed locally for use at `vendor/bin/drush`.
* Latest version of DrupalConsole is installed locally for use at `vendor/bin/drupal`.

## Updating Drupal Core

This project will attempt to keep all of your Drupal Core files up-to-date; the 
project [drupal-composer/drupal-scaffold](https://github.com/drupal-composer/drupal-scaffold) 
is used to ensure that your scaffold files are updated every time drupal/core is 
updated. If you customize any of the "scaffolding" files (commonly .htaccess), 
you may need to merge conflicts if any of your modfied files are updated in a 
new release of Drupal core.

Follow the steps below to update your core files.

1. Run `composer update drupal/core`.
1. Run `git diff` to determine if any of the scaffolding files have changed. 
   Review the files for any changes and restore any customizations to 
  `.htaccess` or `robots.txt`.
1. Commit everything all together in a single commit, so `web` will remain in
   sync with the `core` when checking out branches or running `git bisect`.
1. In the event that there are non-trivial conflicts in step 2, you may wish 
   to perform these steps on a branch, and use `git merge` to combine the 
   updated core files with your customized files. This facilitates the use 
   of a [three-way merge tool such as kdiff3](http://www.gitshah.com/2010/12/how-to-setup-kdiff-as-diff-tool-for-git.html). This setup is not necessary if your changes are simple; 
   keeping all of your modifications at the beginning or end of the file is a 
   good strategy to keep merges easy.

## Generate composer.json from existing project

With using [the "Composer Generate" drush extension](https://www.drupal.org/project/composer_generate)
you can now generate a basic `composer.json` file from an existing project. Note
that the generated `composer.json` might differ from this project's file.


## FAQ

### Should I commit the contrib modules I download

Composer recommends **no**. They provide [argumentation against but also 
workrounds if a project decides to do it anyway](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md).

### How can I apply patches to downloaded modules?

If you need to apply patches (depending on the project being modified, a pull 
request is often a better solution), you can do so with the 
[composer-patches](https://github.com/cweagans/composer-patches) plugin.

To add a patch to drupal module foobar insert the patches section in the extra 
section of composer.json:
```json
"extra": {
    "patches": {
        "drupal/foobar": {
            "Patch description": "URL to patch"
        }
    }
}
```

### Updating Global Metadata

Currently, we are unable to update global metadata with yaml configurations. You will need to manually alter this in the metatag module.

### Viewing diffs for new revisions in Drupal

To view diffs in a content node, navigate to the node that you would like to edit.

> Note: This will only work for content added through the 'Content' user interface. You will not be able to edit or view revisions for statically generated content.

1. Save and publish any changes.
2. Return to the edit content page and select the tab labeled 'Revisions'
3. Use the radio buttons to select the revisions to compare.
4. Select compare and observe changes.


## Making changes to the Drupal database

There may be occasions when you need/want to make changes to the Drupal database through a mechanism other than Drupals
interface. In this scenario, we use [Phinx](https://phinx.org) to create and apply your database changes. Changes are not
applied to the databases by hand.

To use phinx in your local development environment, you will need to run `composer install` from the `_docker/drupal/drupal-filesystem`
directory. This will install the phinx binary into `_docker/drupal/drupal-filesystem/vendor/bin/phinx`

### Writing database changes with Phinx

Changes to the database managed by Phinx are called migrations. Each time you want to make a change to the database, you
 should create a new migration. As part of the Drupal boot sequence, we instruct Phinx to apply all migrations within
 the `_docker/drupal/drupal-filesystem/db-migrations` directory against the database for the current environment.

To create a new migration, do the following:

```bash
cd _docker/drupal/drupal-filesystem
vendor/bin/phinx create <Name_Of_Your_Migration>
```

This will generate a PHP class in the `_docker/drupal/drupal-filesystem/db-migrations` directory. The PHP class is an
abstract Phinx class that provides basic methods and an API to write the changes to want to make to the database in
PHP code. Phinx has good documentation [here](http://docs.phinx.org/en/latest/migrations.html) on how to use the PHP 
migration classes to perform changes to the database.

Ideally your migration should support rolling back your change. Phinx can automatically rollback some changes 
(see the documentation for which changes it can automatically rollback). However if Phinx is not capable of automatically
rolling back your change, then ideally you should provide implementations of the `up` method to make your change and the
`down` method to roll it back.

You should commit your change as part of your pull-request so that it can be reviewed by other members of the team. 

Phinx will only ever apply a change to a database once. It will apply the changes in the timestamp order of their class
name. Once a change has been applied, Phinx will write an entry into the `phinxlog` table in the database. 

### Manually testing a migration in your local development environment

To manually test your migration, you will first need to have the database running on your local machine. The easiest way
to do this is to use the following:

```bash
cd _docker/environments/drupal-dev
docker pull redhatdeveloper/drupal-data-lite:latest
docker-compose up -d drupalmysql
```

Once the database has booted, you should verify that you can connect to it using the following:

```bash
mysql -h 0.0.0.0 -u root -p
```

When prompted, the password is `superdupersecret`.

Once you have verified you can connect to the local database, you can test your migration with the following:

```bash
cd _docker/drupal/drupal-filesystem
vendor/bin/phinx migrate
```
Phinx will then run all migrations in the `_docker/drupal/drupal-filesystem/db-migrations` against the local database.
Phinx provides pretty good output as to the status of your migration and whether it was successful or not.

It is important to note that Phinx only ever applies a migration once. Therefore if you change a migration after it has
been applied, Phinx will not attempt to apply your changes in that migration. Migrations that have already been applied
should not be altered, instead you should create a new migration.


### Seeing what migrations have been applied to the database in your local development environment

To see what migrations have been applied to your local database you can use the following:

```bash
cd _docker/drupal/drupal-filesystem
vendor/bin/phinx status
```

This will show you the name of the migrations that Phinx knows about and whether or not they have been applied to your
database. Migrations that have been applied have a `Status` of `up`. Migrations that have not been applied are `down`.

You can rollback changes that have been applied using the `phinx rollback` command. It is documented more fully [here](http://docs.phinx.org/en/latest/commands.html#the-rollback-command). 
You should be careful to note that Phinx cannot automatically rollback all changes unless you have specifically written
`up` and `down` methods on your migration.

You can manually remove the list of changes that Phinx believes it has applied by deleting all entries within the
`phinxlog` table of the database:

```bash
mysql -u root -h 0.0.0.0 -p -e "delete from phinxlog" drupal 
```

### Running phinx commands in pull-request/staging/production environments

Phinx allows you to define different environments within the `phinx.yml` configuration file. This is stored within the
`_docker/drupal/drupal-filesystem` directory. You will notice that we have an environment called `automated` that has
the following definition:

```yaml
automated:
 adapter: mysql
 host: %%PHINX_DB_HOST%%
 name: %%PHINX_DB_NAME%%
 user: %%PHINX_DB_USER%%
 pass: %%PHINX_DB_PASSWORD%%
 port: 3306
 charset: utf8
```

All of the connection details are set to be read from environment variables. This is so that we do not have to commit
production database credentials to this Git repository. The `automated` environment is used as part of the Drupal
boot sequence for running Phinx migrations. We have a small ruby wrapper script that will allow you to easily using
Phinx commands without having to set the environment variables by hand. Therefore to run phinx commands in the
pull-request, staging or production environments:

```bash
# Get a bash shell on the drupal container in your environment
docker exec -it <drupal_container> /bin/bash
cd /var/www/drupal

# Use the phinx wrapper to run your command:
ruby phinx.rb status
```

This will automatically read and set the correct environmental variables for you allowing you to see the status of Phinx
migrations in your chosen environment.