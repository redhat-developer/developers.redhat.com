# jboss-developer-site


## Development

If you are working on the CSS, make sure to also run `compass watch`

New pages should be added to the root with the extension `.html.slim`

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
