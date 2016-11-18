# Red Hat Developers Site

Powering the [Red Hat Developers site](http://developers.redhat.com/).

This document provides a developer with the instructions needed to setup and use the development environment.
It is ordered chronologically.
It starts by describing how to do first time setup of the environment and then moves onto instructions for day-to-day development tasks, such as testing and changing of code.
Towards the end some miscellaneous topics are covered.

## First time Environment Setup
Docker must be used in development.
Docker simplifies the setup, and makes your development environment consistent with other developers and our CI servers.
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
Currently 'Docker Toolbox' is recommended for Mac and Windows development.
The native 'Docker for Mac' offering may work now, but at the time of writing (August 2016) it crashed a lot for us.
For Mac and Windows follow these instructions to install the latest docker for your system [here] (https://www.docker.com/products/docker-toolbox).
It's unlikely you will want to use the packages provided by your system (e.g. from yum or apt) as they will be too far out of date.

The scripts assume you can run the `docker` command WITHOUT sudo.

**NOTE:** We are using features that require you to have at least docker 1.10 and docker-compose 1.6 installed.

### Docker Compose
Mac and Windows: Docker compose will have been installed as part of the docker toolbox.
Linux: Follow the instructions to install the latest docker-compose [here] (https://github.com/docker/compose/releases)

### Register at DockerHub

The project uses private Docker repositories for certain images and to access these you will need to register at [DockerHub](https://hub.docker.com). Once you have registered, give your
username to a member of the project team who can grant you access privileges on the private repositories for the project

Additionally you need to ensure that the Docker daemon on your local machine is authenticated with your new DockerHub account. To do this run the following:

```
docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD
```

For the above, replace `$DOCKER_HUB_USERNAME` and `$DOCKER_HUB_PASSWORD` with your account details.

### Sanity test
At this point you must be able to run the following commands without error:

      docker run hello-world
      docker-compose version

If you have trouble running either of these commands please refer back to docker installation instructions.
At this point no project specific steps have been taken, so docker is the reference point for fixing issues.
If there is anything missing in this guide please submit a PR.

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

### Project checkout
Fork the project, then clone your fork and add the upstream repository (Please ensure you have current version of git installed).

      git clone git@github.com:YOUR_USER_NAME/developers.redhat.com.git
      cd developers.redhat.com
      git remote add -f upstream git@github.com:redhat-developer/developers.redhat.com.git

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
To request access, send the Red Hat Developers Engineering team your GitHub ID and request access to the `searchisko-docker` repo in the `redhat-developer` organisation.
Once you have access:

Download the [MySQL data dump](https://github.com/redhat-developer/searchisko-docker/raw/master/searchisko/searchisko_mysql_data.tar.gz) and copy to `_docker/mysql/searchisko_mysql_data.tar.gz`.

Download the [ElasticSearch data dump](https://github.com/redhat-developer/searchisko-docker/raw/master/searchisko/searchisko_es_data.tar.gz) and copy to `_docker/searchisko/searchisko_es_data.tar.gz`.

Add the host `docker` to your `/etc/hosts` file.
If you are building on Linux, set the IP address to `127.0.0.1`.
If you are on a Mac and thus using Docker-machine, you will need to set the IP address to that of your Boot2Docker image.
You can discover this IP address by running `docker-machine ip default`

Run `bundle install` from within the `_docker` directory to download the necessary ruby gems.

### Docker-machine setup (Mac only)

To run docker commands in any shell, run:

       eval "$(docker-machine env default)"
       
You need to run this every time you start a new shell.

#### Edit your docker-machine DNS servers and set 'inotify watchers'

1. SSH in to the default docker machine :

        docker-machine ssh default

2. Configure inotify watchers:

        sudo sysctl fs.inotify.max_user_watches=524288
        sudo sysctl -p

3. Edit the boot2docker profile:

        sudo vi /var/lib/boot2docker/profile

4. The DNS servers are specified using the `EXTRA_ARGS` variable. Some settings will not work without waiting for the Ethernet port to be ready. Replace the existing EXTRA_ARGS with the following:

        EXTRA_ARGS="--insecure-registry developer.redhat.com --dns=10.5.30.160 --dns=10.11.5.19 --dns=8.8.8.8"

5. After editing `/var/lib/boot2docker/profile` run `sudo /etc/init.d/docker restart`
6. exit the boot2docker image (just type `exit` in the terminal)
7. Restart docker-machine `docker-machine restart default`


#### Warning about previous containers

We've found that left over containers from previously failed attempts can cause problems.
Docker will give an output on how it recommends you deal with this.
Please follow the advice there.

### Node.js install

_NOTE:_ Node.js and npm both need to be installed on the host machine, not in the docker container.

1. Please follow https://nodejs.org/en/ for downloads and install of node and npm. Everything should work on nodejs versions > 0.10
2. Execute the following command to get the node environment setup:

    npm install

### Run the stack!
_NOTE:_ You must be connected to the Red Hat VPN to build the Docker images.

_NOTE:_ The first time to build and run the site will take a long time (upto 1hr) as a lot of docker images need to be built.

Run the following commands to build the images and start the containers:

      bundle exec ./control.rb -e drupal-dev --run-the-stack

This starts all required services and then runs awestruct to push all the legacy pages into the Drupal server.
On successful build, you should be able to access the site at http://docker.


## Development Environment Setup after reboot
Assuming you already had a functioning environment before the reboot, you need to:

1. Ensure Docker is running
2. Check you can view the site at http://docker

If the above fails, you should do a "Full Rebuild of Development Environment". See next section.
      

## Full Rebuild of Development Environment (slow)
If you need to edit an Awestruct file (not CSS or JS), you need to rebuild the whole environment.
This is slow, so try to find an alternative if you can.
Migrating the content to Drupal might be an option to speed up the development.
To rebuild the full environment:

     bundle exec ./control.rb -e drupal-dev --run-the-stack


## Drupal Page Layout Changes (fast)
If you are just making a change to the layout file of a Drupal page, follow these steps:

1. Ensure the Drupal Docker container is running.
2. Make your change(s) to the layout file(s) (*.twig files).
3. Direct your web browser at a page affected by the change.
4. Observe that the change has been made.


## JavaScript and CSS Changes (fast)
If you need to make a change to a JavaScript or CSS file, you just need to re-run Gulp (takes ~2secs) and then observe your change.
To do this:

1. Ensure the Drupal Docker container running.
2. Make your required changes.
3. Run `gulp` in the root of the project.
3. Direct your web browser at a page affected by the change.
4. Observe that the change has been made.


## Awestruct Page Changes (slow)
If you need to make a change to a page that is generated by Drupal (most likely a .slim or .yml file) you will need to run the full Awestruct build pipeline.
To do this:

1. Ensure the Drupal Docker container running.
2. Make your required changes.
3. Run `bundle exec ./control.rb -e drupal-dev -g`
3. Direct your web browser at a page affected by the change.
4. Observe that the change has been made.
      

## Running Unit Tests (fast)
Run the unit tests (also available using `guard` locally).

      bundle exec ./control.rb -e drupal-dev -t


## Running the Site Export
The production site is actually a static export of the content offered by the (internally hosted) Drupal production server.

An export process is executed in order to create the static version of the site.

These section describes how to run this from your development environment.

```
bundle exec ./control.rb -e drupal-dev --export
```

Once the export process has completed, you will be able to access the static HTML version of the site at http://docker:9000 on your machine.


## Running Acceptance Tests (slow)
This section explains how a developer can run the front-end Acceptance Tests.

To run the acceptance tests against the locally running Drupal site export, ensure the Drupal Docker container is running and the site has been exported.

    bundle exec ./control.rb -e drupal-dev --acceptance_test_target=http://docker:9000
 
To run the acceptance tests against the locally running Drupal server

     bundle exec ./control.rb -e drupal-dev --acceptance_test_target=http://docker

To run the acceptance tests against the remote host:

    bundle exec ./control.rb -e drupal-dev --acceptance_test_target=host_you_want_to_test

There are a number of short keys that can be used to run the tests on our various environments:

1. Drupal Dev: Run `bundle exec ./control.rb -e drupal-dev --acceptance_test_target=drupal_dev`
2. Staging: Run `bundle exec ./control.rb -e drupal-dev --acceptance_test_target=staging`

_NOTE:_ - Never run the acceptance tests against production.
This can interfere with site stats! 
We have a set of smoke tests that can be ran against production, for a quick sanity check of the site.
Smoke tests can be executed by running the following: 

    CUCUMBER_TAGS=@smoke bundle exec ./control.rb -e drupal-dev --acceptance_test_target=production

When working locally, you may find it quicker to run the tests outside of docker.
Providing you have your stack already running (if testing a local build).
Execute the following:

    rake features HOST_TO_TEST=host_you_wish_to_test
    
    
## Drupal Configuration Changes

The easiest way to do this is to make the necessary changes in the UI of Drupal, then export them to the `sync` directory.

Exporting can be done from within the UI, then manually copying the contents of the zip file into the `sync` directory, or it can be done via drush.

To use drush you will need to shell into the docker container using

```
docker exec -it drupaldev_drupal_1 /bin/bash
```

You can then export using:

```
cd web
drush config-export
```

## Drupal Module Development

All module development must happen in the `_docker/drupal/drupal-filesystem/web/modules/custom/<module name>` directory.
Work is typically done using PhpStorm or text editor.
If you are modifying the yaml files of an existing module you may need to restart the Drupal container for everything to be correctly picked up and applied.
You could also attempt to use the `drush updatedb` command, though it may not pick up everything.

New modules must have at least the basics in place and the `drupal_install_checker.rb` file updated to install the module on container build.


## Migrating an Awestruct Page to Drupal
To migrate a page from Awestruct to Drupal:

1. Create the Drupal version of the page, but don't assign a URL alias (or assign a temporary alias)
2. Review the Drupal version of the page
3. Annotate the Awestruct version of the page by adding the `ignore_export: true` front matter variable to the page being exported. If the page being exported is an asciidoc page then it must be `:awestruct-ignore_export: true` instead. This will ensure that the Drupal export ignores the page and is not pushed into Drupal, whilst the legacy Awestruct CI job will still build the page.
4. Delete the Awestruct pushed version of the page from Drupal
5. Manually delete the old alias: Configuration -> Search and metadata -> URL Aliases -> Find the alias you want to re-use and delete it
6. Switch the URL alias of the Drupal version of the page, to use the alias of the deleted Awestruct pushed version of the page.
7. Wait for the Drupal site to be exported, this will take about an hour for it to show up. 


## secrets.gpg management
This sections describes how a member of the Red Hat Developers Engineering team can grant access to the secrets file for new developers.

The `secrets.yaml.gpg` file is encrypted using GPG with multiple recipients.
A plugin for vim such as vim-gnupg (https://github.com/jamessan/vim-gnupg) makes editing the file easy:

1. Install vim and vim-gnupg e.g. using pathogen
2. Open the file `_config/secrets.yaml.gpg` using vim
3. Use the command `:GPGEditRecipients` to open the recipient list
4. Add the email address for the relevant user to the bottom of the edit area
5. Write and quit this edit area, and the main file using `:wq` and `:wq`
6. Commit the updated `_config/secrets.yaml.gpg`

In order to do this, you will need load the user's public key in to your keychain.
You will need to add the key to your keychain using your preferred tool on your platform.
For example, we recommend GPGSuite for Mac OS.
In this case:

1. load `GPG Keychain Access` application
2. Select `key` -> `Retreive rom key server`
3. Pass in the ID of the public key you need to add.

Minimally the following list of recipients is required to encrypt the file:

* Pete Muir <pmuir@bleepbleep.org.uk> (ID: 0x6CE6E8FB45FE317D created at Mon 1 Sep 18:29:07 2014
* Jason Robert Porter (new key) <lightguard.jp@gmail.com> (ID: 0xBEDFCFB30FB72D11 created at Tue 24 Dec 06:51:51 2013)
* Wes Bos <wesbos@gmail.com> (ID: 0x8C1F9282110E7CA0 created at Tue 2 Sep 17:13:12 2014)
* Rafael Benevides <benevides@redhat.com> (ID: 0x81C7CA49C57D4F5C created at Thu 2 Aug 20:14:57 2012)
* Daniel Coughlin <Daniel.coughlin86@gmail.com> (ID: 0x91A225F08D1D811B created at Tue 2 Sep 17:19:02 2014)
* Paul Robinson <paul.robinson@redhat.com> (ID: 0xBCE89FD63FBB22CF created at Wed 10 Sep 15:08:22 2014)
* Adela Arreola <aarreola@redhat.com> (ID: 0xC946E35184EBDCF7 created at Tue 7 Oct 15:26:21 2014)
* Markus Eisele (myfear) <markus@jboss.org> (ID: 0xBE0AACE30C6FAC25 created at Tue 16 Dec 13:11:42 2014)
* Ray Ploski <ray@redhat.com> (ID: 0x4938A20304FE5450 created at Fri 15 May 21:52:56 2015)
* James Parenti (Red Hat Developer Site Key) <james@visuale.net> (ID: 0x21BF1DFDC7A143E0 created at Tue 10 Mar 14:33:51 2015)
* Ryszard Koźmik <rkozmik@redhat.com> (ID: 0x70E45BDE7C68C64D created at Mon 11 May 16:09:19 2015)
* Lukas Vlcek (Lukas Vlcek) <lvlcek@redhat.com> (ID: 0x3442A3D7BD324826 created at Fri 22 May 11:24:48 2015)
* Oliver Shaw <oshaw@redhat.com> (ID: 0xD57A952A22E69562 created at Mon 27 Jul 11:10:09 2015)
* Libor Krzyžanek <libor@krzyzanek.com> (ID: 0x0C3FF1F29223684E created at Thu 22 Oct 10:37:43 2015)
* Vlastimil Elias <velias@redhat.com> (ID: 0x1104635722CBE84A created at Fri 20 May 08:58:18 2011)
* Rob Blake <rblake@redhat.com> (ID: 0xD7CE3349F64B3AB5 created at Mon 21 Mar 14:16:17 2016)
* Rob Terzi <rterzi@redhat.com> (ID: 0x4FBE485C0F7F515F created at Thu 21 Apr 19:22:51 2016)
* Ian R Hamilton <ian.hamilton@rubygemtsl.co.uk> (ID: 0xA8B212D4D48C38CE created at Mon 25 Apr 07:14:17 2016)
* Redhat Developers CI (Key for Redhat Developers CI) <redhat-developers-ci@redhat.com> (ID: 0x8C622DEDD25F49F5 created at Wed 25 May 11:27:02 2016)
* Jim Applebee <japplebe@redhat.com>    (ID: 0xE8DCBAF94F5923D9 created at Fri 22 Jul 2016 11:11:23 AM MDT)
* Luke Dary <ldary@redhat.com>	 	(ID: 0x90236EFBD2509930 created at Thu 15 Sep 2016 08:32:40 AM MDT)

NOTE: If you add a new recipient to the file, ensure you update the list above.


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
