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

4. Bootstrap the environment (only needed the first time)
        
        bundle install

5. Configure the enviornment:

        rake setup

6. Build the site for display at <http://localhost:4242>
        rake clean preview

_NOTE_ The site will take a long time to build for the first time (10 minutes+). Subsequent builds are much quicker.

If the build was successful, you should be able to visit the site here: <http://localhost:4242>


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

TODO

