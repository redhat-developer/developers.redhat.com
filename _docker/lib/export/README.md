## Export

This folder contains an implementation that will perform an export of a Drupal instance to a static HTML dump. It will also optionally rsync this dump this to a location of your choice for serving by Apache or any
other HTTP server.

### Basic execution

The main entrypoint into the export process is export.rb. This configures and delegates out to a number of classes that do the actual work of exporting. The execution of the script is as follows:

```
ruby export.rb <host_to_export_from> [optional_rsync_location]
```

The `<host_to_export_from>` should be replaced with the hostname of your target Drupal instance. This should match the `base_url` of the Drupal instance in the environment. If you specify the rsync location, then once the
export is complete, it will attempt to copy across the export. You are responsible for configuring SSH keys etc so that the connection can be successfully made.

### Workflow

The following workflow is how content is exported from Drupal:

* Invoke the Cron service on Drupal to ensure that the sitemap.xml is up-to-date with all of the latest content
* Parse the sitemap.xml and generate a list of pages that should be fetched from the site
* Pass the list of links into the httrack process to perform the export from the site
* Post-process the export to ensure it works as expected
* Optionally, rsync the export folder to a location of your choice

### Httrack

The export process relies on [httrack](https://www.httrack.com/) to perform the dump to HTML. We use a custom patched version of httrack to allow us to specify a particular structure for saving the HTML files of the site.

The default configuration of httrack is as follows:

```
--list /export/url-list.txt -O /export --disable-security-limits -c50 --max-rate 0 -v +"http://#{drupal_host}*" -"*/node*" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t
```

The options specified are:

* --list -> The list of URLs that should be fetched from the Drupal instance
* -O -> The directory into which the export should be performed (this defaults to /export)
* --disable-security-limits -> Turns of connection limits and rate-limiting in httrack for quicker downloads
* -c50 -> Sets the concurrent connection rate to 50
* --max-rate 0 -> Sets the download rate from the Drupal instance to be unlimited
* -v -> Gives verbose output
* +"http://drupal_host -> Instructs httrack to fetch all content from the Drupal host
* -"*/node* -> Instructs httrack to ignore any pages or content beginning with `/node` (these are Drupal related pages)
* -o0 -> Instructs httrack not to generate a 404 page for any content that is missing
* -N ?html? -> Configures httrack to save any HTML page in the format `host/path/name/index.html` e.g. `docker/containers/overview/index.html`
* -N -> Configures httrack to save any non-HTML asset using the path that it exists at on the original site


The full range of httrack configuration options are available [here](https://www.httrack.com/html/fcguide.html).

### Httrack caching

httrack has built-in caching that should make subsequent exports of the site quicker than the first run. The export process has been designed to make use of this cache. To make sure you get a cache hit when running an export
you need to ensure that httrack is always exporting into the same directory. In you are running the export process in a Docker container, then using a volume mounted at `/export` is recommended to facilitate the cache hit.

### Httrack post-processing

We perform a number of post-processing steps on the httrack export to make it suitable for use with the main developers.redhat.com site. These changes mostly relate to re-writing links
and slightly altering the export structure.

Additionally we also run checks to ensure that all pages that are in the sitemap.xml in Drupal are present where we expect them to be in the export directory. The default behaviour of this checking process is to error
if there are pages that are not present in the site export. This will cause the export process to fail before any rsync of content takes place therefore preventing bad HTML or missing pages from being pushed into production.

#### Overriding default failure behaviour of export when pages are missing

It is possible to override the default failure behaviour of the export process if there are missing pages. This may be desirable in the situations where there are significant issues with Drupal or you simply need to run an export
to resolve a broken site.

To override the failure behaviour, you can set the `drupal.export.fail_on_missing` environment variable to `false`. This variable is set within the `docker-compose.yml` for the environment in which you are working. Therefore you can
set the value of this to `false` in the Jenkins export job configuration to override the value, giving you the ability to force an export even if there is content missing.



### Rsync

You can provide an optional location to rsync the export of the site to. This should be in the form:

`user@host:/path/to/rsync/to`

There may be times when you want to rsync to a location in which the remote directory structure does not exist. In this case you can enclose the part of the
target path to be created in `[` and `]`. For example:

```
rhd@filemgmt.jboss.org:[/my/target/directory]
```

In this example, the `/my/target/directory` structure will be created.

Alternatively you can specify part of the path to be created:

```
rhd@filemgmt.jboss.org:/it-stg-main/staging[/pr/123/build/345]
```

### Control.rb integration

The export process is integrated into control.rb. It is supported in the following environments:

* drupal-pull-request
* drupal-staging
* drupal-production

To run the export process, simply use:

```
bundle exec control.rb -e <environment> --export <location_to_rsync_to>
```

You must ensure that the `export` service definition in the environment of your choice has the correct credentials to be able to rsync to your chosen location.

#### Running the export in drupal-dev environment

It is possible to run the export in the drupal-dev environment. As part of the drupal-dev environment definition, an Apache instance is started at docker:9000. Simply use the following after you have
`--run-the-stack` to get a static export of the content from Drupal to this instance:

```
bundle exec control.rb -e drupal-dev --export
```
