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
* Optionally, rsync the export folder to a location of your choice

### Httrack

The export process relies on [httrack](https://www.httrack.com/) to perform the dump to HTML. The default configuration of httrack is as follows:

```
--list /export/url-list.txt -O /export --disable-security-limits -c50 --max-rate 0 -v +"http://#{drupal_host}*" -"*/node*" -"*/devel*"
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
* -"*/devel* -> Instructs httrack to ignore any pages or content beginning with '/devel' (these are Drupal related pages)


The full range of httrack configuration options are available [here](https://www.httrack.com/html/fcguide.html).

### Httrack caching

httrack has built-in caching that should make subsequent exports of the site quicker than the first run. The export process has been designed to make use of this cache. To make sure you get a cache hit when running an export
you need to ensure that httrack is always exporting into the same directory. In you are running the export process in a Docker container, then using a volume mounted at `/export` is recommended to facilitate the cache hit.

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

It is possible to run the export in the drupal-dev environment if you want to test it. However to do so you must set an environment property named `DOCKER_HOST_IP`. This variable must be set to the *public* IP of your Drupal
instance.

The reason why this is required is so that the export process can resolve public address of the Drupal instance from within a Docker container. Because of the wide variety of development platforms e.g. docker-machine with Virtualbox for Macs,
Linux or people running in VMs, there is no way to sensibly default this value, so you must specify it. 
