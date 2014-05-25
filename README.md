[![Build Status](https://travis-ci.org/jboss-developer/www.jboss.org.svg?branch=master)](https://travis-ci.org/jboss-developer/www.jboss.org)

# jboss-developer-site

## Getting Started
This section covers the steps you need to do in order to setup your environment and get the site running for the first time. Further sections cover the details.

1. Configure environment variables needed for the site.
    * Request the following values from the JBoss Developer team:
    
            vimeo_access_token_secret
            vimeo_client_secret
            dcp_user
            dcp_password
    * Export the values in the appropriate startup script. For example:

            export vimeo_access_token_secret=<VIMEO_ACCESS_TOKEN_SECRET>
            export vimeo_client_secret=<VIMEO_CLIENT_SECRET>
            export dcp_user=<DCP_USER>
            export dcp_password=<DCP_PASSWORD>

2. Configure the software.
    _NOTE:_ You must use a version of Ruby installed via RVM.
    * Install RVM from here http://rvm.io if you don't already have it.
    * Check RVM knows about `ruby-2.1.1`, by running the following command and looking in the `# MRI Rubies` section. If it doesn't, you must [upgrade RVM](http://rvm.io/rvm/upgrading).
    
            rvm list known

    * Install the correct Ruby version (See [here](http://stackoverflow.com/questions/22605921/fresh-installs-of-rvm-and-ruby-2-1-1-dyld-library-pathing-error) for details on why '--disable-binary' is needed):

            rvm install ruby-2.1.1 --disable-binary
            
    * If you see the `Error running 'requirements_osx_brew_libs_install autoconf automake libtool pkg-config libyaml readline libksba openssl'` error message, you may need to run the following, and then retry the above install command:
    
            rvm requirements
            
    * Install any required supporting software. For example, on Fedora you may need to:

            sudo yum install -y rubygem-nokogiri
            sudo yum install -y gcc ruby-devel libxml2 libxml2-devel libxslt libxslt-devel
            sudo sysctl fs.inotify.max_user_watches=524288
            sudo sysctl -p
3. Fork the project, then clone your fork and add the upstream repository.
 
         git clone git@github.com:YOUR_USER_NAME/www.jboss.org.git
         cd www.jboss.org
         git remote add -f upstream git@github.com:jboss-developer/www.jboss.org.git

4. Bootstrap the gemset:

        bundle install

5. Build the site:

        rake setup
        rake clean preview

_NOTE_ The site will take a long time to build for the first time (10 minutes+). Subsequent builds are much quicker.

If the build was successful, you should be able to visit the site here: [http://localhost:4242](http://localhost:4242)


## Development

If you are working on the CSS, make sure to also run `compass watch`

New pages should be added to the root with the extension `.html.slim`

### Updating the DCP

Updates to the DCP should happen automatically if the build is being done on the build server, however, if
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
    
Alterntively, you can preview/deploy to staging or production and the asociated DCP server will also be updated.

## Deployment

Run `rake deploy[staging]` or `rake deploy[production]`

To tag:

`rake deploy[staging,tagname]`

To run in Awestruct in development mode, execute:

`rake`

To run Awestruct while developing, execute:

`rake preview`

To clean the generated site before you build, execute:

`rake clean preview`

To deploy using the production profile, execute:

`rake deploy`

To get a list of all tasks, execute:

`rake -T`

Now you're Awestruct with rake!

## Release Process

For example, to release 1.0.Beta6:

    rake update
    rake "clean[all]" "deploy[staging]"

The site is now deployed to www-stg.jboss.org. You need to go there and check it looks right. If it is, you can deploy to www-beta.jboss.org:
    
    rake "clean[all]" "deploy[beta,1.0.Beta6]"
    
Finally, you need to commit the new version of `_cdn/cdn.yml` and push that and the new tag upstream. _NOTE:_ It is very important that you remember to commit+push your changes to cdn.yml.

    git commit -a -m “Updated cdn.yml” _cdn/cdn.yml
    git push upstream master
    git push upstream --tags

## Continuous integration

Builds occur automatically when pull requests are submitted, and builds, and deploys, happen when pushes to the master branch occur.

### CI Build Configuration

The CI build is configured in 3 files: `.travis.yml`, `_config/site.yml` and `Rakefile`.

#### `.travis.yml` - <https://github.com/jboss-developer/www.jboss.org/blob/master/.travis.yml>

The Travis docs describe all the options - see <http://docs.travis-ci.com/user/build-configuration/>.

We define:

* `before_script` which decodes SSH key needed for uploading build results to filemgmt.jboss.org.
* Ruby as the source language
* `rvm`, which in turn defines the Ruby version
* `branches`, which in turn defines which branches to build or not to build
* `script`, which defines what command should be executed
* `env`, which in turn defines all variables which are used by Rake. Some of those are encoded for security reasons and will be automatically decoded by Travis before the build starts.

#### `_config/site.yml` - <https://github.com/jboss-developer/www.jboss.org/blob/master/_config/site.yml>

The main configuration for Awestruct, and defines the host to deploy to.

#### `Rakefile` - <https://github.com/jboss-developer/www.jboss.org/blob/master/Rakefile>

The Rakefile defines the `:travis` task which is executed on each Push to master, and each Pull Request being opened against ‘master’ (as defined in .travis.yml). It is also ready to build and deploy when a push to the ‘production’ branch occurs, but this is not enabled at the moment.

Using the environment variables from `.travis.yml`, and those provided by default by Travis-CI (see <http://docs.travis-ci.com/user/ci-environment/#Environment-variables>), the script identifies whether this is Pull Request build or Push build, executes the build itself and if it was a Push with successful build result, it uploads the files using rsync command to filemgmt.jboss.org.

Although Pull Requests builds cannot be deployed anywhere due to lack of access to secure variables from .travis.yml, they are still important because they display information in GitHub Pull Request page whether the build went successfully or not.

### Encoding variables for `.travis.yml`

The general process for encoding sensitive data is described in this document <http://docs.travis-ci.com/user/encryption-keys/>. Note that there is a limitation on the length of the content which makes it impossible to encode whole files such as an SSH key, but there is a workaround for this issue available.

First, install the `travis` gem. 

Now, navigate to the root of the git repository clone, and execute:

* `travis encrypt vimeo_client_secret="..."`
* `travis encrypt vimeo_access_token_secret="..."`
* `travis encrypt dcp_password="..." dcp_user="..."`

and add the values to the `.travis.yml` file.

Note that you must be in the root of the git repository clone when you execute the `travis encrypt ...` commands as they are encoded using the repository key. This means that they can be only decoded in builds done on this specific repository and nowhere else.

#### SSH key encoding

The workaround for encoding a file is to generate a random key string, encode the file using `openssl aes-256-cbc` with this string as a key and then encode the key string itself using the standard ‘travis encrypt’ command. Decoding of the key happens in `before_script` as defined in `.travis.yml`.

Here are steps to encode the key. First, execute:

* ``password=`cat /dev/urandom | head -c 10000 | openssl sha1```
* ``password=`echo $password | sed s/\(stdin\)=\ //```
* `travis encrypt password="$password"`
* `openssl aes-256-cbc -k "$password" -in _wwwKey -out _wwwKey.enc -a`

and then add the encoded key to the repository in the `_wwwKey.enc` file, and add the encoded password to `.travis.yml`

