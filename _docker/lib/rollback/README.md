## Rollback

The purpose of the rollback script is to be able to rollback the current version of the site to an older export. 
This means that if there are any problems with an export that has just been rsynced, you can go back to a known working
export.
 

### How do I determine old exports?

Each time an export is rsynced to the filemgmt.jboss.org, it is archived (by default into `/export/export-archive`). 
The directory into which the archive is made is timestamped so that you can easily determine when the export was made:

```
export-<yyyy>-<mm>-<dd>-<hh>-<mm>-<ss> e.g
export-2016-07-13-10-00-00
```

Using the naming structure, you can then determine which export you would like to rollback to. If you wish you can also
browse into the given export directories to perform a manual inspection of the site at that point in time. An export
is after all just a directory containing a number of HTML, CSS, JS files as well as supporting assets such as images.

### How do I perform a rollback?

The rollback function is integrated into control.rb to make it easier to use. As with most functions on the RHDP project, 
the rollback runs in a Docker container and expects that container to be correctly configured with security credentials
that permit it to perform the rollback.
 

Use `control.rb` as follows to perform a rollback:

```
bundle exec ./control.rb -e drupal-production --rollback-site-to <export_name>
```
e.g.
```
bundle exec ./control.rb -e drupal-production --rollback-site-to export-2016-07-13-10-00-00
```

The environments in which rollback is supported are:

* drupal-staging
* drupal-production

### Clean-up of archived site exports.

By default, the most 15 recent successful export archives will be kept. Archives older than this are pruned each time a
successful rsync occurs. 
