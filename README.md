# Red Hat Developers Site

Powering the [Red Hat Developers site](https://developers.redhat.com/).

This document provides a developer with the instructions needed to setup and use the development environment.
It is ordered chronologically.
It starts by describing how to do first time setup of the environment and then moves onto instructions for day-to-day development tasks, such as testing and changing of code.
Towards the end some miscellaneous topics are covered.

## First time Environment Setup
Docker is recommended in development, though it isn't fully necessary.
If you are not using docker, there will be no support.
This works best on Linux, but we do have Mac users that are developing successfully in this environment.
The following sections cover the steps you need to do in order to setup your environment and get the site running for the first time.

There are some [Common Issues](#CommonIssues) you may encounter, check them out before seeking help.

### Utilities
You should be running a bash shell (Linux or Mac) and you will require: git and curl.

### Brew (Mac only)
If you are on a mac then brew is required to install some dependant packages.
Brew is like apt-get or yum for mac.
[Follow their instructions](http://brew.sh/) and make sure that `brew doctor` completes without error.

### Docker

For Linux, follow these instructions to install the latest docker for your system [here] (https://docs.docker.com/installation/).

The native 'Docker for Mac' is now recommended for those working on macOS. If you are using Docker for Mac, allocate 4GB of RAM to Docker in the Docker for Mac Preferences > Advanced. Be sure to Apply & Restart after making this change. Also, you will need to add the following entry to your `/etc/hosts` file:

```
0.0.0.0 docker
```

to make the docker host available.

No one has tried development on Windows, so it is currently not known what needs to be done.

The scripts assume you can run the `docker` command WITHOUT sudo.

**NOTE:** We are using features that require you to have at least docker 1.10 and docker-compose 1.6 installed.

### Docker Compose
Mac: Docker compose will have been installed as part of the Docker for Mac install.
Linux: Follow the instructions to install the latest docker-compose [here] (https://github.com/docker/compose/releases)

### Request Access to the Project Data Images

The project uses private Docker repositories for certain images and to access these you will need to ask a RHDP team member with sufficient
privileges to add your account. 

Please read the [following documentation](https://mojo.redhat.com/docs/DOC-1192810-developersredhatcom-giving-a-dev-team-member-access-to-data-images) on the steps required to get
access to the internal data image repositories for this project.

### Sanity test
At this point you must be able to run the following commands without error:

      docker run hello-world
      docker-compose version

If you have trouble running either of these commands please refer back to docker installation instructions.
At this point no project specific steps have been taken, so docker is the reference point for fixing issues.
If there is anything missing in this guide please submit a PR.

### Install and Setup

There are some requirements for running Drupal locally: php, and some extensions, composer, and optionally mysql/mariadb. 
If you install mysql v8.0 or greater you will need to modify the my.cnf to avoid a connection error.

You need to add this line:-
default-authentication-plugin = mysql_native_password

And comment out the bind-address line.

##### Mac

Please install the full mysql from Oracle so you can get access to the commandline tools.

      brew install php70 php70-xdebug composer

##### Linux

All the required dependencies should be able to be installed using your package manager (yum, dnf, apt-get, etc).
On a Fedora/CentOS machine you will need the following dependencies:

      php70
      php_gd
      php_pdo
      php_mysql
      php_xdebug
      php_xml
      php_mbstring
      composer
      mariadb-client

### Project checkout
Fork the project, then clone your fork and add the upstream repository (Please ensure you have current version of git installed).

      git clone git@github.com:YOUR_USER_NAME/developers.redhat.com.git
      cd developers.redhat.com
      git remote add -f upstream git@github.com:redhat-developer/developers.redhat.com.git

### Node.js install

_NOTE:_ Node.js and npm both need to be installed on the host machine, not in the docker container.

1. Please follow https://nodejs.org/en/ for downloads and install of node and npm. Everything should work on nodejs versions > 0.10
2. Execute the following command to get the node environment setup:

    npm install
3. Run `$(npm bin)/gulp` in the root of the project to generate the JS and CSS files.

You will need to ask a co-worker for the Fort Awesome npm config setting. You will enter an `npm config set` command so that this config value is available during the setup script.

### Start Drupal
Run the following script:

      bash ./setup_local_drupal.sh

This will fetch the database backup for Drupal, run composer and start Drupal.
Assuming there were no errors you should be able to access Drupal at 127.0.0.1:8888.

### Running Drupal after the initial setup

After the initial setup, once you have terminated the PHP built-in server and when you need to run the Drupal server again, you can do so by running `drush runserver`, or `drush rs` for short. To do so, you will need to be in the follow directory:

```
_docker/drupal/drupal-filesystem/web
```

and then you can run:

```
../../vendor/bin/drush rs
```

## Drupal Page Layout Changes (fast)
If you are just making a change to the layout file of a Drupal page, follow these steps:

1. Make your change(s) to the layout file(s) (*.twig files).
2. Direct your web browser at a page affected by the change.
3. Observe that the change has been made.

## JavaScript and CSS Changes (fast)
If you need to make a change to a JavaScript or CSS file, you just need to re-run Gulp (takes ~2secs) and then observe your change.
To do this:

1. Make your required changes.
2. Run `gulp` in the root of the project.
3. Direct your web browser at a page affected by the change.
4. Observe that the change has been made.

## Older Setup, required to run unit tests locally

The following is the older development setup.
You'll need to follow it for running Unit Tests locally, testing a site export, or working on Searchisko.

### Basic Ruby install
In this project docker and docker-compose are managed through the ruby script found at `_docker/control.rb`.
In order to run this you will require ruby 2.1 or greater.
The following instructions install ruby via 'rbenv'.
You can use other methods, but your mileage may vary and it may make it harder for us to support you.
If you already have RVM installed you'll need to [remove it to use rbenv](http://stackoverflow.com/a/3558763/2012130).

#### Pre-requisites for Ruby installation
Mac:

      brew install openssl libyaml libffi

Ubuntu/Debian/Mint:

      apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev

Centos/Fedora:

      yum install -y gcc openssl-devel bzip2 libyaml-devel libffi-devel readline-devel zlib-devel gdbm-devel ncurses-devel

#### Installation of rbenv
Mac: 

      git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
      echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
      echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
      source ~/.bash_profile

Linux:

      git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
      echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
      echo 'eval "$(rbenv init -)"' >> ~/.bashrc
      source ~/.bashrc

#### Installation of rbenv-build

      git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

#### Install and Setup ruby

      rbenv install 2.1.2
      rbenv global 2.1.2
      gem update --system
      gem install bundler
      rbenv rehash

### Secrets File Access
In order to build the site you must request access to the secrets file (`_config/secrets.yaml.gpg`).
This is needed so that you can access the various API keys needed to call services used in the site build.
The secrets file is checked into git (so always contains an up-to-date version of all keys, passwords and usernames).
The file is encrypted using GPG.

To gain access to the secrets file:

Mac:

1. Install GPGSuite from [here](https://gpgtools.org/gpgsuite.html)
2. Create a new key-pair in GPGSuite.
3. Upload the public-key to the key server so that people can access it.
4. Notify someone on the Red Hat Developers Engineering team that you want your key adding to the vault. Be sure to let them know the email address you associated with the key.
5. Wait for a Pull Request to be created (by the engineering team) for the secrets file update.
6. Review the secrets file update by copying the `secrets.yaml.gpg` file from the Pull Request into the `_config/secrets.yaml.gpg` location of your code checkout.
7. Proceed with the following instructions and comment on the Pull Request when you have confirmed that you can build the site, and thus the secret file update was successful.

Linux and Windows:

Please contact Paul Robinson.
There are people who have done this, I just don't have the documentation yet.

### Set up

Request access to the production data dumps first.
This allows you to have a production-like environment in development.
To request access, send the Red Hat Developers Engineering team your GitHub ID and request access to the `searchisko-docker` repo in the `redhat-developer` organization.
Once you have access:

Download the [MySQL data dump](https://github.com/redhat-developer/searchisko-docker/raw/master/searchisko/searchisko_mysql_data.tar.gz) and copy to `_docker/mysql/searchisko_mysql_data.tar.gz`.

Download the [ElasticSearch data dump](https://github.com/redhat-developer/searchisko-docker/raw/master/searchisko/searchisko_es_data.tar.gz) and copy to `_docker/searchisko/searchisko_es_data.tar.gz`.

Add the host `docker` to your `/etc/hosts` file.
If you are building on Linux, set the IP address to `127.0.0.1`.
If you are on a Mac and thus using Docker-machine, you will need to set the IP address to that of your Boot2Docker image.
You can discover this IP address by running `docker-machine ip default`

Run `bundle install` from within the `_docker` directory to download the necessary ruby gems.

### Running the Unit Tests
Run the unit tests (also available using `guard` locally).

      bundle exec ./control.rb -e drupal-dev -t
      
### To run the frontend unit-tests
In the root of the project:

      npm test
      
Inside docker (preferred as this is the same as PR environment). In the root of the project directory execute the following command:
      
      ruby _tests/run_tests.rb --unit --use-docker          

### Running the Site Export
The production site is actually a static export of the content offered by the (internally hosted) Drupal production server.

An export process is executed in order to create the static version of the site.

These section describes how to run this from your development environment.

```
bundle exec ./control.rb -e drupal-dev --export
```

Once the export process has completed, you will be able to access the static HTML version of the site at http://docker:9000 on your machine.


### To run the build related unit-tests
In the root of the project.

      bundle exec rake test

### Drupal Configuration Changes

The easiest way to do this is to make the necessary changes in the UI of Drupal, then export them to the `sync` directory.

Exporting can be done from within the UI, then manually copying the contents of the zip file into the `sync` directory, or it can be done via drush.

To use drush you will need to be in the `web` directory

```
cd web
../vendor/bin/drush config-export
```
## Drupal Content Creation

### Who are these instructions intended for?

If you are a content creator or organizer, these Drupal content types will allow you to have a centralized
location for managing:

* Books
* Events
* Videos
* Connectors

### How does this make my life easier?

Since content is now managed directly from Drupal, it can easily be manipulated by content creators/owners. Once changes have
been implemented, they will soon be reflected on their respective RHD page. Further, we have utilized Drupal's REST export services to ensure that the impact on
Searchisko (DCP) is minimal.

### How do I create a new Book?

For a full demonstration, please refer to the below video:
    
    https://drive.google.com/open?id=0Bwx86SOh3ez-eW5TRFZKLTFVeUk
    
##### Steps to add a new Book.

1. Login to RHD's Drupal Production Environment.
2. Click on Content>Add Content>Books
3. Fill in the required fields.

    _NOTE:_ New content will display with no styling. This is by design. Since RHD relies on DCP for much of its content, DCP rivers
    will retrieve this newly created item and changes to RHD will be reflected within 24 hours. 

### How do I create a new Connector?

For a full demonstration, please refer to the below video:
    
    https://drive.google.com/open?id=0Bwx86SOh3ez-Q2RnMGx3Q3RLUUE
    
##### Steps to add a new Connector.

1. Login to RHD's Drupal Production Environment.
2. Click on Content>Add Content>Connectors
3. Fill in the required fields.

    _NOTE:_ New content will display with no styling. This is by design. Since RHD relies on DCP for much of its content, DCP rivers
    will retrieve this newly created item and changes to RHD will be reflected within 24 hours. 

### How do I create a new Video?

For a full demonstration, please refer to the below video:
    
    https://drive.google.com/open?id=0B9M2ZSLcm2xXTWhHRmt4eV9HNFk
    
##### Steps to add a new Video.

1. Login to RHD's Drupal Production Environment.
2. Click on Content>Add Content>Video Resource
3. Fill in the required fields.

    _NOTE:_ New content will display with no styling. This is by design. Since RHD relies on DCP for much of its content, DCP rivers
    will retrieve this newly created item and changes to RHD will be reflected within 24 hours. 


### How do I add a new Event?

For a full demonstration, please refer to the below video:
    
    https://drive.google.com/open?id=0Bwx86SOh3ez-LXpOOEs1cHN6Wkk
    
##### Steps to add a new Event.

1. Login to RHD's Drupal Production Environment.
2. Click on Content>Add Content>Events
3. Fill in the required fields.

    _NOTE:_ New content will display with no styling. This is by design. Since RHD relies on DCP for much of its content, DCP rivers
    will retrieve this newly created item and changes to RHD will be reflected within 24 hours. 

### What if I am having difficulty adding new content or the content type doesn't represent what I'd expect?

You can contact Jason Porter, Adela Arreola, Luke Dary or Dan Coughlin (all available in HipChat or by email) with any issues or ideas for improvement.

## Drupal Module Development

#### Custom module development

All module development must happen in the `_docker/drupal/drupal-filesystem/web/modules/custom/<module name>` directory.
Work is typically done using PhpStorm or text editor.
If you are modifying the yaml files of an existing module you may need to restart the Drupal container for everything to be correctly picked up and applied.
You could also attempt to use the `drush updatedb` command, though it may not pick up everything.

#### Installing contrib module(s)

First, we must require the module with Composer by executing `composer require drupal/modulename` in the `_docker/drupal/drupal-filesystem` directory. It must be executed in this directory because this is where our project's composer.json and composer.lock files are

Next, you can enable/install the module either by using the drush command line tool: `drush en modulename` or by logging into the admin interface of Drupal and navigating to /admin/modules, locating `modulename`, checking the checkbox next to the name to enable it and clicking the Install submit button at the very bottom of the page/form.

Lastly, the module might have some configuration that needs to be exported (stored in code). To do this, execute `drush cex`. If there is any configuration to export, it will be exported to YAML files that you can include in your PR to install the contrib module.

## Updating the Staging Integration Branch
developers.stage.redhat.com hosts a build of the site that uses staging instances of Download Manager and KeyCloak.
The purpose of this environment is to test new versions of the back-end services before they go into production.

Sometimes, this build is also used for long-term site changes that need to be tested by the wider team, prior to going live into production.
Although most of the time, it just has the `master` code deployed to it.

When a staging branch is used, the simplest way to update the branch, is by raising a PR from 'master' onto the new long running branch.
This can simply be merged, if there are no merge conflicts.

If merge conflicts exist, you will need to do the following steps to fix the conflicts:

1. If you don't have this branch already fetched on your laptop, run:

        git fetch upstream
        git checkout -b <branch name> upstream/<branch name>

2. Now merge the master branch:

        git merge upstream/master
      
3. Fix any merge conflicts
4. Push the branch to your fork.

        git push <your fork alias> <branch name>
      
5. Raise a PR from your branch onto the long running branch in upstream. Note that the PR tests will fail, as they don't expect a PR to be raised on a branch other than 'master'.



## <a name="CommonIssues"></a>Common issues
This area documents fixes to common issues:

### 'undefined method `[]' for nil:NilClass'

If running in docker you may get the error:
```
Internal Server Error

undefined method `[]' for nil:NilClass
```
This is a current issue with the system [https://issues.jboss.org/browse/RHD-1365]. If you get this error then please stop and then remove the docker containers. So, for each container id run
```
docker kill ALL_THE_IDs
docker rm ALL_THE_IDs
```
If you work out a better fix, then please update.


### 'Illegal instruction: 4'
There is an [issue on older macs](https://github.com/docker/compose/issues/271) where docker compose will not run. The only way around this is to install docker-compose via pip (Python's package manager). This can be done as follows:
```bash
sudo easy_install pip
sudo pip install docker-compose
```

### 'No address for docker'
If you get an error with the message 'no address for docker (Resolv::ResolvError)' you need to ensure that the host 'docker' is added as an alias to localhost in your /etc/hosts file. Instructions for this are available in the Docker section of this document.

### "Too many open files"
This can be caused by running out of file descriptors.
Currently only seen on Macs.
See the following for how to fix: http://superuser.com/questions/433746/is-there-a-fix-for-the-too-many-open-files-in-system-error-on-os-x-10-7-1

### "An error occurred: getaddrinfo: nodename nor servname provided, or not known"
Same fix as "Too many open files"

### "Unable to decrypt vault (GPGME::Error::BadPassphrase)"
If using GNU PGP, sometimes you're not presented with a popup asking for the passphrase.
This will result in the following error being presented:  `Unable to decrypt vault (GPGME::Error::BadPassphrase)`.
To fix, use the instructions in the following url:
https://www.gnupg.org/documentation/manuals/gnupg/Invoking-GPG_002dAGENT.html

### "SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed"
If you get this error, you may be seeing it because your SSL cert file is out of date.
You can fix this by:

1. Downloading http://curl.haxx.se/ca/cacert.pem
2. Setting the environment variable SSL_CERT_FILE to the /path/to/file/cacert.pem

Alternatively, see the following for how to fix: http://railsapps.github.io/openssl-certificate-verify-failed.html
