import urllib
import json
import urllib.request
import sys

if len(sys.argv)<=1 :
    print('Not enough parameters. The correct execution is: \npython missingReportParser.py <webpage_missing_data query link>')
    print('e.g. python missingReportParser.py https://dcp2.jboss.org/v2/rest/search/webpage_missing_data?contentType=rht_website')
    exit(-1)

dcpUrl=sys.argv[1]

response = urllib.request.urlopen(dcpUrl)
data = json.loads(response.read().decode("utf-8"))
docs=data['hits']['hits']

if len(docs)==0 :
    print('No results returned by the query, quitting.')
    exit(0)

missingTitles=[]
missingDescriptions=[]
missingPlaintexts=[]

for doc in docs:
    fields = doc['fields']
    plaintext_check = fields['check#sys_content_plaintext'][0] if isinstance(fields['check#sys_content_plaintext'], list) else fields['check#sys_content_plaintext']
    title_check = fields['check#sys_title'][0] if isinstance(fields['check#sys_title'], list) else fields['check#sys_title']
    description_check = fields['check#sys_description'][0] if isinstance(fields['check#sys_description'], list) else fields['check#sys_description']
    sys_url_view = fields['sys_url_view'][0] if isinstance(fields['sys_url_view'], list) else fields['sys_url_view']
    if plaintext_check == 'MISSING' :
        missingPlaintexts.append(sys_url_view)
    if title_check == 'MISSING' :
        missingTitles.append(sys_url_view)
    if description_check == 'MISSING' :
        missingDescriptions.append(sys_url_view)

if len(missingTitles)==0 :
    print('There were no missing titles.')
else :
    print("The following URLs don't have sys_title defined:")
    for url in missingTitles:
        print(url)

print('\n')

if len(missingDescriptions)==0 :
    print('There were no missing descriptions.')
else :
    print("The following URLs don't have sys_description defined:")
    for url in missingDescriptions:
        print(url)

print('\n')

if len(missingPlaintexts)==0 :
    print('There were no missing plaintext fields.')
else :
    print("The following URLs don't have sys_content_plaintext defined:")
    for url in missingPlaintexts:
        print(url)