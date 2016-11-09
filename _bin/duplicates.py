import urllib
import json
import urllib.request
import sys
import base64

if len(sys.argv)<=4 :
    print('Not enough parameters. The correct execution is: \npython duplicates.py <DCP_URL> title|description <DCP SuperProvider username> <DCP SuperProvider password>')
    exit(-1)

dcpUrL=sys.argv[1]+"/v2/rest/sys/es/search/data_rht_website/_search"

duplicatesQuery=json.dumps({ \
    "size": 0,
        "aggs": {
            "duplicateCount": {
                "terms": {
                    "script" : "_source.{FIELD_NAME}",
                    "min_doc_count": 2
                },
                "aggs": {
                    "duplicateDocuments": {
                        "top_hits": {
                            "_source": { "include": [ "{FIELD_NAME}","sys_url_view"] },"size":500
                        }
                    }
                }
            }
        }
    })

fieldName = "";
if sys.argv[2] == 'title' :
    duplicatesQuery = duplicatesQuery.replace("{FIELD_NAME}","sys_title")
    fieldName = "sys_title"
elif sys.argv[2] == 'description' :
    duplicatesQuery = duplicatesQuery.replace("{FIELD_NAME}","sys_description")
    fieldName = "sys_description"
else:
    print("The script can work only on title or description field.")
    exit(-1)

request = urllib.request.Request(dcpUrL)
base64string = base64.encodestring(('%s:%s' % (sys.argv[3], sys.argv[4])).encode()).decode().replace('\n', '')
request.add_header("Authorization", "Basic %s" % base64string)  
response = urllib.request.urlopen(request,duplicatesQuery.encode('ascii'))
data = json.loads(response.read().decode("utf-8"))
buckets=data['aggregations']['duplicateCount']['buckets']

if len(buckets)==0 :
    print('No results returned by the query, quitting.')
    exit(0)

print('URL|'+sys.argv[2])
for bucket in buckets:

    docs = bucket['duplicateDocuments']['hits']['hits']
    for doc in docs:
        fields = doc['_source']
        duplicated_field = fields[fieldName][0] if isinstance(fields[fieldName], list) else fields[fieldName]
        sys_url_view = fields['sys_url_view'][0] if isinstance(fields['sys_url_view'], list) else fields['sys_url_view']

        print(sys_url_view+'|'+duplicated_field)
