# developers.redhat.com

This repository contains the Drupal configuration and code to support the [developers.redhat.com](https://developers.redhat.com/) website.

The developers.redhat.com project operates on the "fork and pull request model". That is you should fork this repository into your own GitHub account and then raise changes on the main
repository via pull requests.

Any change you raise via a pull request will go through the developers.redhat.com CI process for quality control and must be approved by a core member of the developers.redhat.com team.

## Development Environment Initial Setup

These steps will get you to the point where you can develop on the developers.redhat.com project. Development is supported on Linux or Mac. Development is not supported on Windows.

### Request access to the repository

You will need to request access to the repository as a member of the Red Hat Developer Organisation. Two-factor authentication is mandatory for all members of the Red Hat Organisation, so please ensure you have this
[enabled on your GitHub account](https://help.github.com/en/articles/securing-your-account-with-two-factor-authentication-2fa) before requesting access.

Additionally provide your GitHub username to the developers.redhat.com team so that you can be added to the list of approved contributors.


### Request Access to the Project Data Images

The project uses private Docker repositories for certain images and to access these you will need to ask a developers.redhat.com team member with sufficient privileges to add your account. 

Please read the [following documentation](https://mojo.redhat.com/docs/DOC-1192810-developersredhatcom-giving-a-dev-team-member-access-to-data-images) on the steps required to get
access to the internal data image repositories for this project.


### Fork and clone the repository

Fork this repository into your personal GitHub account. One the fork is complete, checkout your personal copy of the repository and add the main `redhat-developer` copy as an upstream:

```bash
git clone git@github.com:YOUR_USER_NAME/developers.redhat.com.git
cd developers.redhat.com
git remote add -f upstream git@github.com:redhat-developer/developers.redhat.com.git
``` 

### Install Docker

We use [Docker](https://docker.com) and [docker-compose](https://docs.docker.com/compose/) for local development. Docker performs best on Linux, but we do have Mac users that are developing successfully in this environment.

You should install the most up-to-date version of Docker and docker-compose. Mac users should install Docker for Mac and not Docker Machine. Please follow the instructions on [this page](https://docs.docker.com/install/) to ensure
that you have Docker installed on your machine.

In addition Mac users should ensure that they give the Docker for Mac VM sufficient resources. We recommend at least 2 CPU units and 8GB of RAM, but the more you can afford the better.


### Install mkcert

We use [mkcert](https://github.com/FiloSottile/mkcert) for creating a local Certificate Authority for local development so that your browser fully trusts https://localhost. Please read the instructions on how
to install this for your operating system.

### Optional: Install PHP and NodeJS

If you intend to write custom PHP code for Drupal or work with our frontend assets, then you may wish to install PHP and NodeJS to support this. At time of writing the supported versions of these are:

* PHP - 7.2.10
* NodeJS - 10.10.0

We run our production environment using RHEL 7 and Software Collection Libraries (SCL) versions of PHP and NodeJS and this is why we are slightly down-rev on the most recent versions. Please follow instuctions relevant
to your operating system to install these tools.


### Sanity test

Connect to the Red Hat VPN. At this point you must be able to run the following commands without error:

      docker run --rm hello-world
      docker-compose version
      docker pull docker-registry.upshift.redhat.com/developers/drupal-data:latest

If you have any problems, please speak with the core member of the developers.redhat.com team.

## Development with Drupal

Please read the [Drupal specific instructions](_docker/drupal/dev/README.md) for how to work with the local development experience.

Any questions on the local Drupal development experience are best directed to:

* Jordan White: [jordanpagewhite](https://github.com/jordanpagewhite)

## CI Pipeline

Every change to the developers.redhat.com repository must be raised as a pull request. When you raise a pull request, the CI pipeline will execute against your
proposed changes. A preview environment will be provided which you can use to review your proposed changes.

Your pull requests will have a number of status checks posted against them as the CI pipeline executes. On of these statuses checks will provide you with a link to the
Drupal instance in your preview environment.

Your pull request cannot be merged if any of the status checks are failing. In addition it will require approval from at least one of the core developers.redhat.com team.

Please read the [Preview environment specific instructions](previews/README.md) for interacting with your preview environment as part of the CI process. 

## End-to-End Testing

The developers.redhat.com project has an end-to-end test suite that will execute as part of the CI process. You should ensure that you keep this
up-to-date as you develop on the project. Any test failures will prevent your pull request from being merged into the project.

Please read the [End-to-end testing specific instructions](_tests/e2e/README.md) for working with the end-to-end tests.

## Contacting the team

The team can be contacted in the #rhdp-website slack channel or #DXP-Developers on Google Chat.

### Drupal Development

* [Jordan White](https://github.com/jordanpagewhite)
* [Stacey Mosier](https://github.com/staceymosier)

### Frontend Development

* [Alistair McGranaghan](https://github.com/alistairmc)

### DevOps

* [Rob Coffman](https://rover.redhat.com/people/profile/rcoffman)
