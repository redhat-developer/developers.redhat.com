RHDP Site Broken-link Testing
=============================

## Run broken link checks

In the root of the project directory execute the following command:

### Inside of docker (better)
        
        CONFIG=config/prod_blinkr.yaml ruby _tests/blc/run_checks.rb --use-docker --blinkr base-url=https://developers.stage.redhat.com
        
### Locally   

In your blinkr config, change `remote: true` to `remote: false` 
        
        cd _tests/blc/blinkr && bundle install
         
        bundle exec blinkr -c config/prod_blinkr.yaml -u https://developers.stage.redhat.com
        