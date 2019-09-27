### developers.redhat.com Preview Environments

This directory contains a few utility scripts to help you connect to the preview environment associated with your pull
request build.

#### Getting started

##### Install the Openshift CLI

Before you can use these scripts you will need to install the Openshift Command Line tools (OC). The current version of 
OC that is supported is 3.11.

The OC binary can be downloaded from the following locations:

* Mac Users: [https://mojo.redhat.com/thread/953528](https://mojo.redhat.com/thread/953528)
* Unix Users: https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz

Download the binary and install it somewhere into your $PATH. Once installed you should be able to run:

```bash
which oc
```

The Managed Platform clusters enforce GSSAPI/Kerberos authentication on all environments, so once you have the binary installed
ensure that `oc version` from the command line shows you something like this:

```bash
Robs-Mac-mini:previews Rob$ oc version
oc v3.11.0+02103b0-103-dirty
kubernetes v1.11.0+d4cacc0
features: Basic-Auth GSSAPI Kerberos SPNEGO

Server https://manage.us-west.dc.preprod.paas.redhat.com:443
openshift v3.11.88
kubernetes v1.11.0+d4cacc0
```

The bit you're looking for is `features: Basic-Auth GSSAPI Kerberos SPNEGO`. If that all looks good, you're set to continue.


##### Configure Kerberos Authentication

Next you need to follow ITs instructions on how to configure Kerberos authentication. The instructions are [here](https://mojo.redhat.com/docs/DOC-1153539#jive_content_id_Using_the_IPAREDHATCOM_Realm_without_joining_your_system_as_an_IdM_Client) and include
details for Mac users.

Once you've followed their instructions, you should be able to do the following:

```bash
kinit <username>@IPA.REDHAT.COM
oc login manage.us-west.dc.preprod.paas.redhat.com -u <username>
```

##### Create local configuration

Finally copy the [oc-config.sh.example](oc-config.sh.example) to `oc-config.sh`. This configures the helper scripts with details
specific to your account. You should under no circumstances check this file into Git and it is configured already in the `.gitignore`
of this directory.


#### Connecting to Drupal in your preview environment

You can connect to the Drupal container for your pull request by running the following:

```bash
./connect-to-drupal.sh <pull_request_id>
```

So for pull request 39, that would be:

```bash
./connect-to-drupal.sh 39
```

This will drop you into a `bash` shell on the Drupal container. Once there you should additionally run:

```bash
source /etc/scl_enable
```

You can now browse around the container as you see fit to investigate any issues with your preview environment.


#### Connecting to the database in your preview environment

To connect to the database in your preview environment use the following:

```bash
./connnect-to-db.sh <pull_request_id>
```

So for pull request 39 that would be:

```bash
./connect-to-db.sh 39
```

#### Viewing the boot logs for Drupal in your preview environment

For whatever reason it may be that Drupal is not booting after your latest changes. You can view the Drupal boot sequence
to diagnose any problems with the following:

```bash
./view-drupal-boot-logs.sh <pull_request_id>
```

So for pull request 39 that would be:

```bash
./view-drupal-boot-logs.sh 39
```

#### Watching the Drupal logs

You can also watch requests as they come into Drupal to help diagnose any issues. Use the following for that:

```bash
./view-drupal-logs.sh <pull_request_id>
```

So for pull request 39 that would be:

```bash
./view-drupal-logs.sh 39
```