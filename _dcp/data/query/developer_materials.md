# Query: Developer Materials

**Developer materials** query is designed for the needs of developer materials finder web page
and it is used to search and filter developer related documents.

It is restricted to search on top of the following `sys_type`s:

 - jbossdeveloper_quickstart
 - video
 - demo
 - jbossdeveloper_example
 - jbossdeveloper_archetype
 - jbossdeveloper_bom
 - solution
 - article

In addition to matching documents it also provides two aggregations around "format" which is basically
[terms aggregation] of `sys_type` field. The tricky part is that one specific `sys_type` category
is split into two _arbitrary_ categories depending on `experimental` field value.

[terms aggregation]: http://www.elasticsearch.org/guide/en/elasticsearch/reference/1.4/search-aggregations-bucket-terms-aggregation.html

More specifically documents having `sys_type: jbossdeveloper_quickstart` belong to
either `jbossdeveloper_quickstart` or `jbossdeveloper_quickstart_early_access` category.
If the document has `experimental: true` then it belongs to the `jbossdeveloper_quickstart_early_access`
otherwise it belongs to `jbossdeveloper_quickstart`.

The following text consists of three parts:

- description of URL parameters accepted by this registered query
- explanation of query output
- expert explanation of the query itself

## URL parameters

##### `query`
Optional simple query string free text. Example: `query=java+tutorial`.

- <http://dcp_server:port/v2/rest/search/developer_materials?query=java+tutorial>

##### `from`
Optional number of document that will be the first in the hits section. Default value is `0`. This is useful for pagination.
The query returns up to 9 matching documents only. This means that second page should use `9`, third page `18`.

- <http://dcp_server:port/v2/rest/search/developer_materials?from=9>

##### `level`
Optional filter accepting a string value. URL parameter value MUST be lowercased.
Example values: `beginner`, `intermediate` or `advanced`.

- <http://dcp_server:port/v2/rest/search/developer_materials?level=advanced>

##### `tag`
Optional filter accepting a string value for `sys_tags` value (called "topic" on the UI page).
Can be used multiple times. URL parameter value MUST be lowercased.

- <http://dcp_server:port/v2/rest/search/developer_materials?tag=camel&tag=rest>

##### `publish_date`
Optional filter accepting date in a string format.

- <http://dcp_server:port/v2/rest/search/developer_materials?publish_date=2013>
- <http://dcp_server:port/v2/rest/search/developer_materials?publish_date=2013-01>
- <http://dcp_server:port/v2/rest/search/developer_materials?publish_date=2013-02-22>

##### `rating`
Optional filter accepting a number value. URL parameter value MUST be a number.

- <http://dcp_server:port/v2/rest/search/developer_materials?rating=1>

##### `sys_type`
Optional filter used for `sys_type` value (called "format" on the UI page).
In order to distinguish between **quickstarts** and **early access** materials new _virtual_ `sys_type` value
called `jbossdeveloper_quickstart_early_access` has been modelled.

- <http://dcp_server:port/v2/rest/search/developer_materials?sys_type=jbossdeveloper_quickstart_early_access>
- <http://dcp_server:port/v2/rest/search/developer_materials?sys_type=jbossdeveloper_quickstart>
- <http://dcp_server:port/v2/rest/search/developer_materials?sys_type=video&sys_type=book>

Technically speaking, the `sys_type` value in returned documents is `jbossdeveloper_quickstart` all the time.
The new (virtual) category appears **only** in aggregations output and can be used as `sys_type` filter input.
All needed conversions are handled inside the query at execution time.

Pseudo-code of `sys_type` processing is as follows:

    if (sys_type == 'jbossdeveloper_quickstart' && experimental != undefined && experimental != null && experimental === true) {
      'jbossdeveloper_quickstart_early_access'
    }
    if (sys_type == 'jbossdeveloper_quickstart') {
      'jbossdeveloper_quickstart'
    }
    else { sys_type is used }

_See "Query implementation details" for further details._

##### `project`
Optional lowercased code of project. This can be used for **product** material finder.

- <http://dcp_server:port/v2/rest/search/developer_materials?project=eap&project=portal>

## Query output format

The query has hardcoded list of fields that are returned:

    "fields": [
      "contributors",
      "duration",
      "experimental",
      "github_repo_url",
      "level",
      "sys_author",
      "sys_contributors",
      "sys_created",
      "sys_description",
      "sys_rating_avg",
      "sys_rating_num",
      "sys_title",
      "sys_type",
      "sys_url_view",
      "thumbnail"
    ]

Additionally returned data contains slice of **matching documents**, **total number** of matching documents
and **two aggregation sections**.

1. `hits.hits[]` contains up to 9 documents (you can paginate through them using `from` URL parameter)

2. `hits.total` contains total number of matching documents

3. `aggregations.format.count_without_filters.format_counts.buckets[]` contains total counts for all **AVAILABLE**
"formats" (note we have separation between `jbossdeveloper_quickstart` and `jbossdeveloper_quickstart_early_access` formats).
Counts do not reflect any selected filters, it is always total count of documents in this category. Technically speaking,
this aggregation can be used to get a list of all available formats in the data.

4. `aggregations.format.count_with_filters.format_counts.buckets[]` contains counts for all **RELEVANT** "formats"
(relevant to query and filters). If there are no matching documents for format then such format is missing here
(so you can use list from above aggregation to produce complete list of formats assigning missing formats a zero count).

## Query implementation details

This chapter discusses implementation details of Elasticsearch query. It should be considered _Expert Only_ chapter.

This query uses a lot of conditional clauses. This means the query itself has to be provided as single encoded string
(see [search template] docs) which makes it hard for reading and editing. Because of this the following part describes structure of query internals.

[search template]: http://www.elasticsearch.org/guide/en/elasticsearch/reference/1.4/search-template.html

The following is the query with all the optional filters applied:

    {
      "from": 0,
      "size" : 9,
      "fields": [
        "contributors", "duration", "experimental", "github_repo_url", "level", "sys_author",
        "sys_contributors", "sys_created", "sys_description", "sys_rating_avg", "sys_rating_num",
        "sys_title", "sys_type", "sys_url_view", "thumbnail"
      ],
      "query": {
        "filtered": {
          "query": {
            "simple_query_string" : {
              "query" : "java is fast",
              "fields":[
                "sys_description", "sys_tags^1.5", "sys_contributors.fulltext", "sys_project_name^2.0", "sys_title^2.5"
              ]
            }
          },
          "filter": {
            "and": {
              "filters": [
                // 'level' filter
                { "term": { "level": "beginner" }},

                // 'tag' filter (AND type)
                { "term": { "sys_tags": "camel" }},
                { "term": { "sys_tags": "rest" }},

                // 'publish_date' filter
                { "range": { "sys_created": { "gte": "2014-2-13" } }},

                // 'project' filter (OR type)
                { "or": [
                  { "term":  { "sys_project": "eap" }},
                  { "term":  { "sys_project": "portal" }}
                ]},

                // 'rating' filter
                { "range": { "sys_rating_avg": { "gte": 1 } }},

                // 'sys_type' filter (OR type)
                { "or": [
                  { "script": {
                    "script": "(format_selection == 'jbossdeveloper_quickstart_early_access' && _source.sys_type == 'jbossdeveloper_quickstart' && _source.experimental != undefined && _source.experimental != null && _source.experimental === true) || (format_selection == 'jbossdeveloper_quickstart' && _source.sys_type == format_selection && _source.experimental !== true) || (format_selection != 'jbossdeveloper_quickstart' && format_selection != 'jbossdeveloper_quickstart_early_access' && _source.sys_type == format_selection)",
                    "params": {
                      "format_selection": "{{sys_type}}"
                    },
                    "lang": "js"
                  }
                ]},

                // no filter for this, this is hardcoded rule
                { "terms": { "sys_content_provider" : [ "jboss-developer", "rht" ] }}
              ]
            }
          }
        }
      },
      "aggregations": {
        "format": {
          "global": {},
          "aggregations": {
            "count_with_filters": {
              "filter": {
                "and": {
                  "filters": [
                    // We need to add query filter to all other filters.
                    // It is the same query as in 'query.filtered.query'.
                    {
                      "query": {
                        "simple_query_string": {
                          "query" : "java is fast",
                          "fields": [
                            "sys_description", "sys_tags^1.5", "sys_contributors.fulltext", "sys_project_name^2.0", "sys_title^2.5"
                          ]
                        }
                      }
                    },

                    // add all the filters from 'query.filtered.filter.and.filters'
                    { "term": { "level": "beginner" }},
                    { "term": { "sys_tags": "camel" }},
                    { "term": { "sys_tags": "rest" }},
                    { "range": { "sys_created": { "gte": "2014-2-13" } }},
                    { "or": [
                      { "term":  { "sys_project": "eap" }},
                      { "term":  { "sys_project": "portal" }}
                    ]},
                    { "range": { "sys_rating_avg": { "gte": 1 } }},
                    { "or": [
                      { "script": {
                        "script": "(format_selection == 'jbossdeveloper_quickstart_early_access' && _source.sys_type == 'jbossdeveloper_quickstart' && _source.experimental != undefined && _source.experimental != null && _source.experimental === true) || (format_selection == 'jbossdeveloper_quickstart' && _source.sys_type == format_selection && _source.experimental !== true) || (format_selection != 'jbossdeveloper_quickstart' && format_selection != 'jbossdeveloper_quickstart_early_access' && _source.sys_type == format_selection)",
                        "params": {
                          "format_selection": "{{sys_type}}"
                        },
                        "lang": "js"
                      }
                    ]},
                    { "terms": { "sys_content_provider" : [ "jboss-developer", "rht" ] }}
                  ]
                }
              }
            },
            "count_without_filters": {
              "filter": {
                "and": {
                  "filters": [
                    { "terms": { "sys_content_provider" : [ "jboss-developer", "rht" ] }}
                  ]
                }
              },
              "aggregations": {
                "format_counts": {
                  "terms": {
                    "script": "_source.sys_type == 'jbossdeveloper_quickstart' ? ( _source.experimental != undefined && _source.experimental != null && _source.experimental === true ? _source.sys_type + '_early_access' : _source.sys_type ) : _source.sys_type",
                    "lang": "js",
                    "size": 100
                  }
                }
              }
            }
          }
        }
      }
    }
