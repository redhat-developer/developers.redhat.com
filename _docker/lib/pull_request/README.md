## Github Status API Execution Wrapper

### Pre-requisites 

An introduction to the [Github status API](https://developer.github.com/v3/repos/statuses/)

### About

This directory contains the implementation of the Github Status API wrapper. The purpose of this class is to faciliate running Docker containers within a pull request environment
when you want to report the result of the container execution as a Github status. For example, you want to run some unit tests within a Docker container and report the outcome of these
as a Github status with context 'Unit Tests'. Whilst the tests are running you want the status to be 'pending'. If the tests succeed, the status should be updated to 'success'. If they
fail, the status should be updated to 'failure'.

### Basic operation

The execution wrapper will take the command that you want to run in the container and firstly create a 'pending' Github Status check for the command. It will then execute the command
and if the command succeeds i.e. exits with a 0 status code, it will update the status to 'success'. If the command exits with a non-zero exit code, it will update the status to 'failure'

### Configuring the wrapper to execute

The wrapper should be configured as the `entrypoint` on your Docker container. The command you want to run can either be appended after the wrapper definition, or defined as the `command`
to your Docker statement. For example:

```
service:
 testing:
  entrypoint: "ruby _docker/lib/pull_request/exec_with_git_hub_status_wrapper.rb 'bundle exec rake test'"
```

or

```
service:
 testing:
  command: "bundle exec rake test"
  entrypoint: "ruby _docker/lib/pull_request/exec_with_git_hub_status_wrapper.rb"
```

### Configuring the Github status reported by the wrapper

The configure the status reported by the wrapper, you set environment variables on your Docker container definition. The following variables are supported:

|Environment Variable|Description|
|--------------------|-----------|
|github_status_api_token|The API token to be used to interact with the Github API|
|github_status_context|The context that should be reported for this container|
|github_status_repo|The repository against which the pull request is being raised in the form &lt;username&gt;/&lt;repo&gt; e.g. robpblake/developers.redhat.com|
|github_status_target_url|The target URL to be reported by Github as link on the pull request checks tab|
|github_status_sha1|The SHA1 of the Pull request to update with the status|
|github_status_initialise|A comma separated list of contexts to initialise when this container runs. Typically this will be set on the first container in your build pipeline|


As an example of a container that sets the status for the `Unit Tests` context and initialises the `Acceptance Tests` context:

```
unit_tests:
   build: ../../awestruct
   volumes:
    - ../../../:/home/awestruct/developer.redhat.com
   entrypoint: "ruby _docker/lib/pull_request/exec_with_git_hub_status_wrapper.rb 'bundle exec rake test'"
   environment:
    - github_status_api_token
    - github_status_context=Unit Tests
    - github_status_repo=redhat-developer/developers.redhat.com
    - github_status_target_url=${BUILD_URL}
    - github_status_sha1=${ghprbActualCommit}
    - github_status_initialise=Unit Tests,Acceptance Tests
```
From the above you can see that it is possible to reference environment variables set by your CI server as well to ensure that any information related to the pull request is
correctly reported.
