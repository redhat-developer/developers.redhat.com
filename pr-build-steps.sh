#!/bin/bash --login -e
set -e

bundle

cd _docker/
bundle install
ruby ./control.rb -e drupal-pull-request --run-the-stack --no-decrypt

drupal_port=$((35000 + $ghprbPullId))
drupal_url="http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:${drupal_port}"
drupal_status=$(curl -XHEAD ${drupal_url})

# Update GitHub with the new Drupal Link
if [ $drupal_status -ne 0 ]
then
  curl -XPOST -H "Authorization: token ${github_status_api_token}" https://api.github.com/repos/redhat-developer/developers.redhat.com/statuses/${ghprbActualCommit} -d "{
    \"state\": \"failure\",
    \"context\": \"drupal-site\",
    \"target_url\": \"${drupal_url}\",
    \"description\": \"$(docker logs rhdpr${ghprbPullId}_drupal_1 | tail -n 3)\"
  }"
  exit 1 # exit, no point continuing
else
  curl -XPOST -H "Authorization: token ${github_status_api_token}" https://api.github.com/repos/redhat-developer/developers.redhat.com/statuses/${ghprbActualCommit} -d "{
    \"state\": \"success\",
    \"context\": \"drupal-site\",
    \"target_url\": \"${drupal_url}\",
    \"description\": \"finished ok!\"
  }"
fi

# Run Cron on Drupal
docker exec rhdpr${ghprbPullId}_drupal_1 bash -c "source /etc/scl_enable && drush cron"