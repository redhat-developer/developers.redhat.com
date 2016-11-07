# Red Hat Developers Site Docker section

Back: [../README.md](../README.md)

## First steps
Please follow the docker set up instructions in the main [README file](../README.md)

## Environments

The Docker setup for the developers.redhat.com project has the notions of environments.
The environment you will need to use depends on which version of the site you want to use.
Environment support was introduced to allow for the development and support of Drupal, whilst maintaining the old development workflow.

You should read the [environments README.md](environments/README.md) for more information.

### The default environment

The default environment is set to be the Awestruct Pull Request environment.
This was done so that we could migrate to the new environment strategy without having to change the current or create a new pull request job in Jenkins.
At a later date the default environment will likely be changed to something more developer friendly.


