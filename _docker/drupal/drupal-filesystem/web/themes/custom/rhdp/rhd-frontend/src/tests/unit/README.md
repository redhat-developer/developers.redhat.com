RHDP Site Unit Testing
=======================

## Run unit-tests locally

Make sure you're working within `/developers.redhat.com/_docker/drupal/drupal-filesystem/web/themes/custom/rhdp/rhd-frontend`
       
        npm test

## Run unit-tests inside docker (same as CI)

In the root of the project directory execute the following command:

        ruby _tests/run_tests.rb --unit --use-docker
