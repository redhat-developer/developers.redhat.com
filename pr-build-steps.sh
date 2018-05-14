#!/bin/bash --login -e
set -e

# Needed so we can pull data-container-lite
docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD

# Needed for rsync
cp /home/jenkins_developer/id_rsa $WORKSPACE/_docker/awestruct/overlay/ssh-key/
cp /home/jenkins_developer/known_hosts $WORKSPACE/_docker/awestruct/overlay/ssh-key/

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

# Start the export process
ruby ./control.rb -e drupal-pull-request --export rhd@filemgmt.jboss.org:/stg_htdocs/it-rhd-stg[/pr/${ghprbPullId}/export] --no-decrypt --no-kill

