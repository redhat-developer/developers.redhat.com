## Export

This folder contains an implementation that will perform an export of a Drupal instance to a static HTML dump. 
It will also optionally rsync this dump this to a location of your choice for serving by Apache or any
other HTTP server.

The export process uses Httrack to perform the export of the Drupal site and is designed to run within a Docker
container.

### Basic execution

The main entrypoint into the export process is export.rb. This configures and delegates out to a number of classes that
do the actual work of exporting. The execution of the script is as follows:

```
ruby export.rb <host_to_export_from> [optional_rsync_location]
```

The `<host_to_export_from>` should be replaced with the hostname of your target Drupal instance. This should match
the `base_url` of the Drupal instance in the environment. If you specify the rsync location, then once the
export is complete, it will attempt to copy across the export. The container in which the export is running should be 
configured with the correct SSH configuration so that it can correctly rsync to the destination location.

### Workflow

The following workflow is how content is exported from Drupal:

* Invoke the Cron service on Drupal to ensure that the sitemap.xml is up-to-date with all of the latest content
* Parse the sitemap.xml and generate a list of pages that should be exported from the site
* Pass the list of pages to be exported into the httrack process to perform the export from the site
* Post-process the export to ensure that is supports the correct site structure and to perform some other DOM processing
* Copy some static resources into the root of the static HTML export
* Optionally, rsync the export folder to a location of your choice

### Environment variables affecting export process

There are a number of environment variables that when set, will influence the behaviour of the export process. These are:

* drupal.export.fail_on_missing (true/false) [default=true] - Determines if the export process will fail when a page declared in the sitemap.xml cannot be found in the export
* drupal.export.final_base_url [default=https://developers.redhat.com] - The final URL of the site export which will be
placed into the error pages of the export to ensure they work at all levels of the hierarchy
* drupal.export.max_cache_updates [default=750] - The maximum number of times we will update the httrack export cache
before rolling over to avoid a SIGFAULT inside httrack

You should set the environment variable on the `export` container definition within the `docker-compose.yml` of the
environment in which you are running the export for them to take affect.

### Httrack

The export process relies on [httrack](https://www.httrack.com/) to perform the dump to HTML. We use a custom patched 
version of httrack to allow us to specify a particular structure for saving the HTML files of the site.

The default configuration of httrack is as follows:

```
--list /export/url-list.txt -O /export --disable-security-limits -c50 --max-rate 0 -v +"http://#{drupal_host}*" -"*/node*" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer "<!-- -->"
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
* --footer -> This is the message that httrack will write to the HTML to say where it mirrored from. We override this to hide details of the Drupal host. Ideally this should be set to `(none)`, but a bug in httrack prevents it from working when updating a cache, so instead we add an empty HTML comment


The full range of httrack configuration options are available [here](https://www.httrack.com/html/fcguide.html).

### Httrack caching

httrack has built-in caching that should make subsequent exports of the site quicker than the first run. The export
process has been designed to make use of this cache. To make sure you get a cache hit when running an export
you need to ensure that httrack is always exporting into the same directory. The `docker-compose.yml` for each
environment ensure that this is the case.

#### Httrack cache rolling

We have run into SIGFAULT errors within the Docker container when Httrack gets into the region of 800 cache updates. To
work around this we simply roll-over the Httrack cache after a given number of updates (default is 750). This provides a
good compromise between export performance and also protecting us from cache update failures.

### Httrack post-processing

We perform a number of post-processing steps on the httrack export to make it suitable for use with the main
developers.redhat.com site. These changes mostly relate to re-writing links and altering the export structure.

We additionally remove some mark-up from the DOM of each HTML page for security reasons as Httrack will leave the name
of the host from which it exported in the HTML.

We also run checks to ensure that all pages that are in the sitemap.xml in Drupal are present where we
expect them to be in the export directory. The default behaviour of this checking process is to error
if there are pages that are not present in the site export. This will cause the export process to fail before any rsync
of content takes place therefore preventing bad HTML or missing pages from being pushed into production.

#### Overriding default failure behaviour of export when pages are missing

It is possible to override the default failure behaviour of the export process if there are missing pages. This may be
desirable in the situations where there are significant issues with Drupal or you simply need to run an export
to resolve a broken site.

To override the failure behaviour, you can set the `drupal.export.fail_on_missing` environment variable to `false`. This
variable is set within the `docker-compose.yml` for the environment in which you are working. Therefore you can
set the value of this to `false` in the Jenkins export job configuration to override the value, giving you the ability
to force an export even if there is content missing.

### Rsync of content

You can provide an optional location to rsync the export of the site to. This should be in the form:

`user@host:/path/to/rsync/to`

There may be times when you want to rsync to a location in which the remote directory structure does not exist. In this
case you can enclose the part of the target path to be created in `[` and `]`. For example:

```
rhd@filemgmt.jboss.org:[/my/target/directory]
```

In this example, the `/my/target/directory` structure will be created.

Alternatively you can specify part of the path to be created:

```
rhd@filemgmt.jboss.org:/it-stg-main/staging[/pr/123/build/345]
```

Typically the RHDP project will only use the above feature for running the rsync in the `drupal-pull-request` environment
where we need a site root on a per-pull-request basis.

### Control.rb integration

The export process is integrated into `control.rb`. It is supported in the following environments:

To run the export process, simply use:

```
bundle exec control.rb -e <environment> --export [location_to_rsync_to]
```

You must ensure that the `export` service definition in the environment of your choice has the correct credentials to be
able to rsync to your chosen location.

#### Running the export in drupal-dev environment

It is possible to run the export in the drupal-dev environment, but rsync is not supported as part of that environment.
 
Instead, the `drupal-dev` environment will start an Apache instance at docker:9000. Which will serve the latest version
 of your export. 

Simply use the following after you have `--run-the-stack` to get a static export of the content from Drupal in the 
`drupal-dev` environment:

```
bundle exec control.rb -e drupal-dev --export
```
