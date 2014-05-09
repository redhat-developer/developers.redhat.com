/** DCP HELPERS **/

app.dcp.getNameFromContributor = function( contributor ) {
  return contributor.substring(0, contributor.lastIndexOf("<") - 1);
};

/**
 * Load a document from the DCP, resolve any contributors, and replace any 
 * span.contributor[data-sys-contributor=<contributor>] elements in the current page
 */
app.dcp.resolveContributorsForDocument = function( documentType, documentId ) {
  
  app.dcp.currentRequest = $.ajax({
    url : app.dcp.url.content + "/" + documentType + "/" + documentId,
    beforeSend : function() {
      // check if there is a previous ajax request to abort
      if(app.dcp.currentRequest && app.dcp.currentRequest.readyState != 4) {
        app.dcp.currentRequest.abort();
      }
    }
  }).done(function(fields){
    if (!fields) {
      // If the document is not indexed, we can't proceed
      console.warn("Unable to load document of type:" + documentType + " with id: " + documentId + " from DCP");
    } else {
      var author = fields.sys_author;
      var contributors = fields.sys_contributor;
      if (!contributors) {
        contributors = [];
      }

      // First, we must fix up the page content, with the normalised id from the DCP. This allows us to to differentiate between author and contributors
      $( "span.author" ).each( function() {
        $( this ).attr( "data-sys-contributor", author ).addClass( "contributor" ).html( app.dcp.getNameFromContributor( author ) );
      });

      if (contributors.length > 0) {
        $( "span.contributors" ).each( function() {
          // Remove all the contributors originally in the doc, before replacing the content
          var out = [];
          for (var i = 0; i < contributors.length; i++) {
            out.push( "<span class=\"contributor\" itemprop=\"contributor\" data-sys-contributor=\"" + contributors[i] + "\">" + app.dcp.getNameFromContributor( contributors[i] ) + "</span>" );
          }
          $( this ).html( out.join( ", " ) );
        });
      }

      // Make sure the author is in the contributors array, to make sure they are resolved.
      contributors.push(author);
      // Having normalised the data, we can now resolve the contributors
      app.dcp.resolveContributors(contributors);
    }
  });
};

/*
 * Resolve an array of contributors, and replace any 
 * span.contributor[data-sys-contributor=<contributor>] elements in the current page
 */
app.dcp.resolveContributors = function(sysContributors) {

  // Remove duplicates
  contributors = sysContributors.unique();

  app.dcp.currentRequest = $.ajax({
    url : app.dcp.url.search,
    data : {
      "sys_type" : "contributor_profile",
      "field"  : ["sys_url_view", "sys_title", "sys_contributors"],
      "contributor" : contributors,
      "size" : contributors.length
    },
    beforeSend : function() {
      // check if there is a previous ajax request to abort
      if(app.dcp.currentRequest && app.dcp.currentRequest.readyState != 4) {
        app.dcp.currentRequest.abort();
      }
    }
  }).done(function(data){
    var hits = data.hits.hits;
    for (var i = 0; i < hits.length; i++) {
      $( "span.contributor[data-sys-contributor='" + hits[i].fields.sys_contributors + "']" ).each( function() {
        $( this ).html(
          "<a href=\"" + hits[i].fields.sys_url_view + "\">" +
            hits[i].fields.sys_title +
          "</a>");
      });
    }
  });
};

