import urllib
import json
import urllib.request
import sys
import base64

# configured paths for DCP versions
dcp1UriPath = "/v1/rest/search?content_provider=jboss-developer&content_provider=rht&field=sys_author&field=sys_updated&field=sys_created&field=sys_description&field=sys_title&field=sys_url_view&field=sys_type&field=sys_content_id&field=sys_content_type&sys_type=jbossdeveloper_bom&sys_type=jbossdeveloper_quickstart&sys_type=jbossdeveloper_archetype&sys_type=video&sys_type=rht_knowledgebase_article&sys_type=rht_knowledgebase_solution&sys_type=jbossdeveloper_example&query=sys_updated:%5B1970-01-01%20TO%20{DATE}%5D&size=100"
dcp2UriPath = "/v2/rest/search/stale_resources?last_updated_before={DATE}"

if len(sys.argv)<=5 :
    print('Not enough parameters. The correct execution is: \npython deleteStaleDocuments.py <DATE_CONSTRAINT_IN_ISO_FORMAT> <DCP_URL> <DCP_VERSION (1 or 2)> <DCP_USER_LOGIN> <DCP_USER_PASSWORD>')
    print('e.g. python deleteStaleDocuments.py 2015-05-01T00:00:00.000Z https://dcp2.jboss.org 2 admin admin')
    exit(-1)

# Constructing DCP urls based on version and hostname.
url=""
deletionUrlBase=""
if sys.argv[3] is "1" :
    url=sys.argv[2]+dcp1UriPath
    deletionUrlBase=sys.argv[2]+'/v1/rest/content/'
elif sys.argv[3] is "2" :
    url=sys.argv[2]+dcp2UriPath
    deletionUrlBase=sys.argv[2]+'/v2/rest/content/'
else:
    print("Bad arguments were given to the script.")
    exit(-1)

url = url.replace("{DATE}",sys.argv[1])

# Getting the list of documents to delete
response = urllib.request.urlopen(url)
data = json.loads(response.read().decode("utf-8"))
hits=data['hits']['hits']
dataForDeletion=[]

if len(hits)==0 :
    print('No results returned by the query, quitting.')
    exit(0)

print('Please verify the following list of documents that are going to be deleted:')

for hit in hits:

    fields = hit['fields']
    sys_content_id = fields['sys_content_id'][0] if isinstance(fields['sys_content_id'], list) else fields['sys_content_id']
    sys_updated = fields['sys_updated'][0] if isinstance(fields['sys_updated'], list) else fields['sys_updated']
    sys_title = fields['sys_title'][0] if isinstance(fields['sys_title'], list) else fields['sys_title']
    sys_content_type = fields['sys_content_type'][0] if isinstance(fields['sys_content_type'], list) else fields['sys_content_type']

    print('ID: '+sys_content_id+'\tLast updated at: '+sys_updated+ '\tTitle: '+sys_title)
    dataForDeletion.append({ 'id':sys_content_id, 'type':sys_content_type})

answer=input('Should we delete these documents [Y/N]:')
if answer!='Y' and answer!='y' :
    print("Quitting without any change")
    exit(0)

print("Performing deletion.")

for doc in dataForDeletion:

    print('Deleting document with id: '+doc['id']+' of type: '+doc['type'])
    request = urllib.request.Request(deletionUrlBase+doc['type']+'/'+doc['id'])
    base64string = base64.encodestring(('%s:%s' % (sys.argv[4], sys.argv[5])).encode()).decode().replace('\n', '')
    request.add_header("Authorization", "Basic %s" % base64string)  
    request.get_method= lambda: 'DELETE' 
    result = urllib.request.urlopen(request)

    print(result.read().decode("utf-8"))
