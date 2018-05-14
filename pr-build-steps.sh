#!/bin/bash --login -e
set -e
docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD

cp /home/jenkins_developer/id_rsa $WORKSPACE/_docker/awestruct/overlay/ssh-key/
cp /home/jenkins_developer/known_hosts $WORKSPACE/_docker/awestruct/overlay/ssh-key/

bundle

cd _docker/
bundle install
ruby ./control.rb -e drupal-pull-request --run-the-stack --no-decrypt

drupal_status=$(docker logs rhdpr${ghprbPullId}_drupal_1 | tail -n 1 | grep 'Success')

# Update GitHub with the new Drupal Link
if [ $drupal_status -ne 0 ]
then
  curl -XPOST -H "Authorization: token ${github_status_api_token}" https://api.github.com/repos/redhat-developer/developers.redhat.com/statuses/${ghprbActualCommit} -d "{
    \"state\": \"failure\",
    \"context\": \"drupal-site\",
    \"target_url\": \"http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:$((35000 + $ghprbPullId))\",
    \"description\": \"$(docker logs rhdpr${ghprbPullId_drupal_1} | tail -n 3)\"
  }"
  exit 1 # exit, no point continuing
else
  curl -XPOST -H "Authorization: token ${github_status_api_token}" https://api.github.com/repos/redhat-developer/developers.redhat.com/statuses/${ghprbActualCommit} -d "{
    \"state\": \"success\",
    \"context\": \"drupal-site\",
    \"target_url\": \"http://rhdp-jenkins-slave.lab4.eng.bos.redhat.com:$((35000 + $ghprbPullId))\",
    \"description\": \"finished ok!\"
  }"
fi

# Start the export process
ruby ./control.rb -e drupal-pull-request --export rhd@filemgmt.jboss.org:/stg_htdocs/it-rhd-stg[/pr/${ghprbPullId}/export] --no-decrypt --no-kill

