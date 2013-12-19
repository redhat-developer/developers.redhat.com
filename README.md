# jboss-developer-site


## Development

If you are working on the CSS, make sure to also run `compass watch`

New pages should be added to the root with the extension `.html.slim`

### Updating the DCP

In order to update content in the DCP you must have two environment variables set and the URL set in config.yaml.
The two variables that must be set are `dcp_user` and `dcp_password`. If you need those please contact Pete Muir
or Jason Porter.

If these two variables are not set you will see a warning during the build:

    Missing username and / or password for searchisko

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
