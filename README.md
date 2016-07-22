# Red Hat Developers Site!

Powering the [Red Hat Developers site](http://developers.redhat.com/).

## Developer setup
We recommend that Docker be used in development. This simplifies the setup, and makes your development environment consistent with other developers and our CI servers. The following sections cover the steps you need to do in order to setup your environment and get the site running for the first time.

There are some [Common Issues](#CommonIssues) you may encounter, check them out before seeking help.

Skip to the [Site Build Setup](#site_build_setup) section if you don't want to use Docker.
### Utilities
You should be running a bash shell (Linux or OSX) and you will require: git and curl.
### Brew (OSX only)
If you are on a mac then brew is required to install some dependant packages. Brew is like apt-get or yum for mac. [Follow their instructions](http://brew.sh/) and make sure that `brew doctor` completes without error.
### Docker
Follow the instructions to install the latest docker for your system [here] (https://docs.docker.com/installation/). It's unlikely you will want to use the packages provided by your system (e.g. from yum or apt) as they will be too far out of date.

Once you have Docker installed and set up you can have a look at the common developer tasks and how they can be managed with Docker [HERE](_docker/README.md). The scripts used assume you can run the `docker` command WITHOUT sudo.

NOTE: We are using features that require you to have at least docker 1.10 and docker-compose 1.6 installed. 

### Docker Compose
OSX: Docker compose will have been installed as part of the docker toolbox.

Non-OSX:Follow the instructions to install the latest docker-compose [here] (https://github.com/docker/compose/releases)
### Sanity test
At this point you need to and should be able to run the following commands without error:
```bash
docker run hello-world
docker-compose version
```
If you have trouble running either of these commands please refer back to docker installation instructions. At this point no project specific steps have been taken, so docker is the reference point for fixing issues. If there is anything missing in this guide please submit a PR.

### Basic Ruby install
In this project docker and docker-compose are managed through the ruby script found at `_docker/control.rb`. In order to run this you will require ruby 2.1 or greater. The following instructions install ruby via rbenv. You can use other methods, but your mileage may vary. If you already have RVM installed you'll need to [remove it to use rbenv](http://stackoverflow.com/a/3558763/2012130).
#### Pre-requisites for Ruby installation
OSX:
```bash
brew install openssl libyaml libffi
```
Ubuntu/Debian/Mint:
```bash
apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev
```
Centos/Fedora:
```bash
yum install -y gcc openssl-devel bzip2 libyaml-devel libffi-devel readline-devel zlib-devel gdbm-devel ncurses-devel
```
#### Installation of rbenv
####OSX
```bash
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
```
####Linux
```bash
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
```
#### Installation of rbenv-build
```bash
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
```
#### Install and Setup ruby
```bash
rbenv install 2.1.2
rbenv global 2.1.2
gem update --system
gem install bundler
rbenv rehash
```
### Project checkout
Fork the project, then clone your fork and add the upstream repository (Please ensure you have current version of git installed).
```bash
git clone git@github.com:YOUR_USER_NAME/developers.redhat.com.git
cd developers.redhat.com
git remote add -f upstream git@github.com:redhat-developer/developers.redhat.com.git
```
### Set up
Download the [MySQL data dump](https://github.com/redhat-developer/searchisko-docker/raw/master/searchisko/searchisko_mysql_data.tar.gz) and copy to `_docker/mysql/searchisko_mysql_data.tar.gz`.

Download the [ElasticSearch data dump](https://github.com/redhat-developer/searchisko-docker/raw/master/searchisko/searchisko_es_data.tar.gz) and copy to `_docker/searchisko/searchisko_es_data.tar.gz`.

Add the host `docker` to your `/etc/hosts` file. If you are building on Linux, set the IP address to `127.0.0.1`. If you are on a Mac and thus using Docker-machine, you will need to set the IP address to that of your Boot2Docker image. You can discover this IP address by running `docker-machine ip default`

Run `bundle install` from within the `_docker` directory to download the necessary ruby gems.

###Docker-machine setup (OSX only)

You'll probably want to start docker with 'Docker quickstart terminal'. However to run docker commands in any shell, run:

       eval "$(docker-machine env default)"

#### Edit your boot2docker DNS servers

1. SSH in to the default docker machine :

        docker-machine ssh default

2. Edit the boot2docker profile:

        sudo vi /var/lib/boot2docker/profile

3. The DNS servers are specified using the `EXTRA_ARGS` variable. Some settings will not work without waiting for the Ethernet port to be ready. Replace the existing EXTRA_ARGS with the following:

        EXTRA_ARGS="--insecure-registry developer.redhat.com --dns=10.5.30.160 --dns=10.11.5.19 --dns=8.8.8.8"

4. After editing `/var/lib/boot2docker/profile` run `sudo /etc/init.d/docker restart`
5. exit the boot2docker image (just type `exit` in the terminal)
6. Restart docker-machine `docker-machine restart default`


#### Warning about previous containers

We've found that left over containers from previously failed attempts can cause problems. Docker will give an output on how it reccomends you deal with this. Please follow the advice there.

### Node.js install

If you're using the Drupal containers you will need to install Node.js and npm.

_NOTE:_ Node.js and npm both need to be installed on the host machine, not in the docker container. 

1. Please follow https://nodejs.org/en/ for downloads and install of node and npm. Everything should work on nodejs versions > 0.10
2. Execute the following command to get the node environment setup:

    npm install

###Run the stack!
_NOTE:_ You must be connected to the Red Hat VPN to build the Docker images.

_NOTE:_ The first time to build and run the site will take a long time (15-45 minutes) as a lot of docker images need to be built.

Run the following commands to build the images and start the containers:

```
bundle exec ./control.rb --run-the-stack
```

This will take a while the first time. This starts all required services and then  runs awestruct in preview mode. The script won't finish until you stop it with `CTRL+C`. At the start of the build the script will output the ports the services are listening on for access outside of docker. Typically you'll only need to worry about awestruct and searchisko ports. Those will be available on host `docker` and the corresponding port for that service.

NOTE: When `preview` is run, you may see errors from guard/listen about a folder being watched already, as far I as I can tell this is harmless and you can ignore those.

###Important Control.rb commands
Run the unit tests (also available using `guard` locally).

`bundle exec ./control.rb -t`

To build and start all services:

`bundle exec ./control.rb --run-the-stack`

To run the acceptance tests (where HOST_TO_TEST is the host you are interested in:

`bundle exec ./control.rb --acceptance_test_target[=HOST_TO_TEST]`

To run the acceptance tests against the locally running docker stack:

`bundle exec ./control.rb --acceptance_test_docker`

To build the docker images:

`bundle exec ./control.rb -b`

To restart the (non awestruct services)

`bundle exec ./control.rb -r`

To run awestruct in preview mode

`bundle exec ./control.rb -p`

To run with drupal enabled

`bundle exec ./control.rb -u [-g, -p, -r, --run-the-stack]`

This means that any of the previous commands may be run with drupal by using the `-u` flag. The `-b` flag does not need the `-u` flag to build the drupal image.

### <a name="site_build_setup"></a> Site Build without Docker

1. Configure environment variables needed for the site.
    * Request the following values from the Red Hat Developers team:

            vimeo_access_token_secret
            vimeo_client_secret
            vimeo_access_token
            dcp_user
            dcp_password
            google_api_key

    * Export the values in the appropriate startup script. For example:

            export vimeo_access_token_secret=<VIMEO_ACCESS_TOKEN_SECRET>
            export vimeo_client_secret=<VIMEO_CLIENT_SECRET>
            export dcp_user=<DCP_USER>
            export dcp_password=<DCP_PASSWORD>

   Alternatively, if you plan to do frequent development on the site, you can request access to the password vault. The password vault is checked in to git (so always contains an up to date version of all keys, passwords and usernames), and is encrypted using GPG. To request access from the Red Hat Developers team, send them the email address associated with your GPG key. To find out more about GPG (including how to create a key) read https://www.gnupg.org/gph/en/manual.html. If you are on Mac, we recommend GPGSuite which provides Keychain management for your GPG key.

2. Configure the software.
    _NOTE:_ You must use a version of Ruby installed via RVM.
    * Install RVM from here http://rvm.io if you don't already have it.
    * [upgrade RVM](http://rvm.io/rvm/upgrading).
    * Install the correct Ruby version (See [here](http://stackoverflow.com/questions/22605921/fresh-installs-of-rvm-and-ruby-2-1-1-dyld-library-pathing-error) for details on why '--disable-binary' is needed):

            rvm install ruby-2.1.2 --disable-binary

    * If you see the `Error running 'requirements_osx_brew_libs_install autoconf automake libtool pkg-config libyaml readline libksba openssl'` error message, you may need to run the following, and then retry the above install command:

            rvm requirements

    * Install any required supporting software. For example, on Fedora you may need to:

            sudo yum install -y rubygem-nokogiri
            sudo yum install -y gcc ruby-devel libxml2 libxml2-devel libxslt libxslt-devel
            sudo sysctl fs.inotify.max_user_watches=524288
            sudo sysctl -p

3. Bootstrap the environment (only needed the first time)

        bundle install

4. Configure the environment:

        rake setup

5. If using Docker, set the Drupal credentials:

        export drupal_user=admin
        export drupal_password=admin

6. Build the site for display at <http://localhost:4242> and <http://docker:8081> (if using Docker)

        rake clean preview

_NOTE_ The site will take a long time to build for the first time (10 minutes+). Subsequent builds are much quicker.

If the build was successful, you should be able to visit the site here: <http://localhost:4242> and <http://docker:8081> (if using Docker).

> Everything below is copied across verbatim from www.jboss.org. Proceed with caution.


## Development

New pages should be added to the root with the extension `.html.slim`

### Updating the DCP

Updates to the DCP should happen automatically if the build is being done on the build server or if you are using docker, however, if
it is down or there is another emergency situation and the site needs to be built and content pushed to the
DCP for staging or production please contact Pete Muir, Jason Porter, Andrew Rubinger or Ray Ploski. Below
are steps to setup the environment for pushing content to the DCP.

In order to update content in the DCP you must have the URL set in config.yaml and the following two environment variables set:

    export dcp_user=jboss-developer
    export dcp_password=<see one of the people above for this>

If these two variables are not set you will see a warning during the build:

    Missing username and / or password for searchisko

You can then preview the staging site, which will also push data to the DCP staging server:

    rake preview[staging]

Alternatively, you can preview/deploy to staging or production and the associated DCP server will also be updated.

## Deployment

Run `rake deploy[staging]` or `rake deploy[production]`

To tag:

`rake deploy[staging,tagname]`

To run in Awestruct in development mode, execute:

`rake` (this is the equivalent to `rake preview`)

To clean the generated site before you build, execute:

`rake clean preview`

To deploy using the production profile, execute:

`rake deploy`

To run the smoke test features execute:

`rake acceptance_test_target=http://host_you_want:8080`

To get a list of all tasks, execute:

`rake -T`

Now you're Awestruct with rake!

## Continuous integration

Builds occur automatically when pull requests are submitted. Builds and deploys happen when pushes to the master branch occur.

## secrets.gpg management

The `secrets.yaml.gpg` file is encrypted using GPG with multiple recipients. A plugin for vim such as vim-gnupg (https://github.com/jamessan/vim-gnupg) makes editing the file easy:

1. Install vim and vim-gnupg e.g. using pathogen
2. Open the file `_config/secrets.yaml.gpg` using vim
3. Use the command `:GPGEditRecipients` to open the recipient list
4. Add the email address for the relevant user to the bottom of the edit area
5. Write and quit this edit area, and the main file using `:wq` and `:wq`
6. Commit the updated `_config/secrets.yaml.gpg`

In order to do this, you will need load the user's public key in to your keychain. You will need to add the key to your keychain using your preferred tool on your platform. For example, we recommend GPGSuite for Mac OS. In this case:

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

If you add a new recipient to the file, ensure you update the list above.

## Updating the Staging Integration Branch
developers.stage.redhat.com hosts a build of the site that uses staging instances of Download Manager and KeyCloak. After the migration to DCP 2, it will also use the staging instance of the DCP. The purpose of this environment is to test new versions of the back-end services before they go into production. 

This build is also used for long-term site changes that need to be tested by the wider team, prior to going live into production.

The simplest way to update the branch, is by raising a PR from 'master' onto the new long running branch. This can simply be merged, if there are no merge conflicts. 

If merge conflicts exist, you will need to do the fiollowing steps to fix the conflicts:

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
This can be caused by running out of file descriptors. Currently only seen on Macs. See the following for how to fix: http://superuser.com/questions/433746/is-there-a-fix-for-the-too-many-open-files-in-system-error-on-os-x-10-7-1

### "An error occurred: getaddrinfo: nodename nor servname provided, or not known"
Same fix as "Too many open files"

### "Unable to decrypt vault (GPGME::Error::BadPassphrase)"
If using GNU PGP, sometimes you're not presented with a popup asking for the passphrase. This will result in the following error being presented:  `Unable to decrypt vault (GPGME::Error::BadPassphrase)`.
To fix, use the instructions in the following url:
https://www.gnupg.org/documentation/manuals/gnupg/Invoking-GPG_002dAGENT.html

### "SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed"
If you get this error, you may be seeing it because your SSL cert file is out of date.  You can fix this by:

1. Downloading http://curl.haxx.se/ca/cacert.pem
2. Setting the environment variable SSL_CERT_FILE to the /path/to/file/cacert.pem

Alternatively, see the following for how to fix: http://railsapps.github.io/openssl-certificate-verify-failed.html
