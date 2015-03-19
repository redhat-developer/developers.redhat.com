#!/bin/bash

#Fail on first error
set -e

function do_index {

  DESCRIPTION=$1
  URL=$2
  BODY=$3

  echo "Running indexing for: $DESCRIPTION"

  #echo curl -X POST --user jbossorg:jbossorgjbossorg  "$URL" -d "$BODY" -H "Content-Type:application/json"
  RESULT=$(curl -s -X POST --user jbossorg:jbossorgjbossorg  "$URL" -d "$BODY" -H "Content-Type:application/json")
  #echo $RESULT
  TASK_ID=$(echo $RESULT | awk -F '"' '{ print $4 }')
  if [ "$TASK_ID" == "" ]; then
      echo "ERROR getting task ID"
      exit 1
  fi

  DONE=false
  TASK_OUTCOME=
  while [ "$DONE" == "false" ]; do

    #echo curl -X GET "http://192.168.59.103:8080/v1/rest/tasks/task/$TASK_ID" --user jbossorg:jbossorgjbossorg
    TASK_OUTCOME=$(curl -s -X GET "http://192.168.59.103:8080/v1/rest/tasks/task/$TASK_ID" --user jbossorg:jbossorgjbossorg | awk -F 'taskStatus' '{ print $2 }' | awk -F '"' '{ print $3 }')

    echo $TASK_OUTCOME
    if [ "$TASK_OUTCOME" == "FINISHED_OK" ]; then
      DONE=true
    elif [ "$TASK_OUTCOME" == "" ]; then
      echo "ERROR getting task outcome"
      exit 1
    else
      sleep 2
    fi

  done
}

function reindex_from_persistence {
  CONTENT_TYPE=$1
  do_index $CONTENT_TYPE "$searchiskourl/v1/rest/tasks/task/reindex_from_persistence" '{ "sys_content_type": "'$CONTENT_TYPE'" }'
}

function reindex_project {
  CONTENT_TYPE=$1
  do_index $CONTENT_TYPE "$searchiskourl/v1/rest/tasks/task/reindex_project" '{}'
}

function reindex_contributor {
  CONTENT_TYPE=$1
  do_index $CONTENT_TYPE "$searchiskourl/v1/rest/tasks/task/reindex_contributor" '{}'
}



esurl="http://$SEARCHISKO_PORT_8080_TCP_ADDR:8080/v1/rest/sys/es/search"
esusername=jbossorg
espassword=jbossorgjbossorg

searchiskourl=http://$SEARCHISKO_PORT_8080_TCP_ADDR:8080
searchiskousername=jbossorg
searchiskopassword=jbossorgjbossorg


echo "========  Waiting for Searchisko to boot ======="
while [ "$(curl -sL -w "%{http_code}\\n" http://$SEARCHISKO_PORT_8080_TCP_ADDR:8080/v1/rest/sys/info -o /dev/null)" != "200" ]; do
        sleep 1
        echo "waiting..."
done;
echo "Searchisko ready"



echo ========== Initializing Elasticsearch cluster ===========
echo Using Elasticsearch http connector URL base: ${esurl}


cd /tmp/configuration

pushd index_templates/
./init_templates.sh ${esurl} ${esusername} ${espassword}
popd

pushd indexes/
./init_indexes.sh ${esurl} ${esusername} ${espassword}
popd

pushd mappings/
sed -i.bak "s/curl /curl -s /g" ./init_mappings.sh
./init_mappings.sh ${esurl} ${esusername} ${espassword}
popd



echo ========== Initializing Searchisko ===========
echo Using Searchisko REST API URL base: ${searchiskourl}

pushd data/provider/
./init-providers.sh ${searchiskourl} ${searchiskousername} ${searchiskopassword}
popd

pushd data/config/
./init-config.sh ${searchiskourl} ${searchiskousername} ${searchiskopassword}
popd

echo ========== Run indexers ===========

#No Content Provider
reindex_project 'sys_projects'
reindex_contributor 'sys_contributors'

# jbossdeveloper
reindex_from_persistence 'jbossdeveloper_quickstart'
reindex_from_persistence 'jbossdeveloper_demo'
reindex_from_persistence 'jbossdeveloper_bom'
reindex_from_persistence 'jbossdeveloper_archetype'
reindex_from_persistence 'jbossdeveloper_example'
reindex_from_persistence 'jbossdeveloper_vimeo'
reindex_from_persistence 'jbossdeveloper_youtube'
reindex_from_persistence 'jbossdeveloper_book'
#reindex_from_persistence 'jbossdeveloper_website'
reindex_from_persistence 'jbossdeveloper_connector'
reindex_from_persistence 'jbossdeveloper_event'

# jbossforge
reindex_from_persistence 'jbossforge_addon'

# jbossorg
reindex_from_persistence 'jbossorg_blog'
reindex_from_persistence 'jbossorg_project_info'
#reindex_from_persistence 'jbossorg_sbs_forum'
#reindex_from_persistence 'jbossorg_sbs_article'
#reindex_from_persistence 'jbossorg_contributor_profile'

# rht
#reindex_from_persistence 'rht_knowledgebase_article'
#reindex_from_persistence 'rht_knowledgebase_solution'

echo FINISHED!
