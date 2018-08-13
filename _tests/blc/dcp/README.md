RHDP DCP content Broken-link Testing
=============================

## Run DCP broken link checks

In the root of the project directory execute the following command:

### Inside of docker (better)
        ruby _tests/blc/run_checks.rb dcp https://dcp2.jboss.org/v2 --use-docker
        
### Locally         
        cd _tests/blc/dcp && bundle install
               
        bundle exec dcp-checker -u https://dcp2.jboss.org/v2
        