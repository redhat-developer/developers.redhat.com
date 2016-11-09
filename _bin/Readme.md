# Utility Scripts
This directory contains several utility scripts.

## Remove Stale Content From the DCP
Currently many of the processes that push content into the DCP do not remove content if it is deleted. 
This means that it's common to have stale content in the DCP that needs to be manually removed.
The `deleteStaleDocuments.py` script deletes content that has not been updated before a particular date.
The Awestruct build pushes content to the DCP every time it runs.
Therefore, any DCP documents that are not updated by the last Awestruct build can be considered stale.

To Run this:

      python3 deleteStaleDocuments.py <DATE_CONSTRAINT_IN_ISO_FORMAT> <DCP_URL> <DCP_VERSION (1 or 2)> <DCP_USER_LOGIN> <DCP_USER_PASSWORD>

e.g:

      python3 ./deleteStaleDocuments.py 2016-11-01 https://dcp2.jboss.org 2 $dcp_user $dcp_password
      
In the above example, all documents in `https://dcp2.jboss.org`, not updated after `2016-11-01` will be offered for deletion.
Review the list, and then accept the deletion if you are happy to have them removed.


## Find Web Pages with Duplicate Titles and Descriptions
All web pages on the site should have a unique title and description.
This is best practice for SEO and improves the results found on http://developers.redhat.com/search.

To find a list of pages with duplicate titles or descriptions:

      python3 duplicates.py <DCP_URL> title|description <DCP SuperProvider username> <DCP SuperProvider password>
      
E.g. To find duplicate titles:

      python3 ./duplicates.py "https://dcp2.jboss.org"  "title" $dcp_super_user $dcp_super_user_password
      
E.g. To find duplicate descriptions:

      python3 ./duplicates.py "https://dcp2.jboss.org"  "description" $dcp_super_user $dcp_super_user_password
      
      
## Find Web Pages with Missing Meta-Data needed by /search
For WebPages to be searchable on http://developers.redhat.com/search they need to have good meta-data.
This script finds web pages that are missing some meta-data.

To generate the report:

      python3 missingReportParser.py <webpage_missing_data query link>
      
E.g:

      python3 missingReportParser.py https://dcp2.jboss.org/v2/rest/search/webpage_missing_data\?contentType\=rht_website
      
