/** DCP HELPERS **/

app.dcp.getNameFromContributor = function( contributor ) {
  return contributor.substring(0, contributor.lastIndexOf("<") - 1);
};

/**
 * Load a document from the DCP, resolve any contributors, and replace any 
 * span.contributor[data-sys-contributor=<contributor>] elements in the current page
 */
app.dcp.resolveContributorsForBlock = function( documentType, documentId, block, tmpl ) {
  if (!documentType) {
    console.error( "No documentType specified" );
    return;
  }
  if (!documentId) {
    console.error( "No documentId specified" );
    return;
  }
  
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
      if (author) {
        block.find( "span.author" ).each( function() {
          $( this ).replaceWith( app.dcp.generateContributorSpan( author ) ).addClass( "author" );
        });
      }

      if (contributors.length > 0) {
        block.find( "span.contributors" ).each( function() {
          // Remove all the contributors originally in the doc, before replacing the content
          var out = [];
          for (var i = 0; i < contributors.length; i++) {
            out.push( app.dcp.generateContributorSpan( tmpl, contributors[i] ) );
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

app.dcp.generateContributorSpan = function(tmpl, contributor) {
  var d = {};
  d.contributor = contributor;
  d.contributorName = app.dcp.getNameFromContributor( contributor );
  return tmpl.template( d );
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
      "field"  : ["sys_url_view", "sys_title", "sys_contributors", "accounts"],
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
      var accounts = {};
      if (hits[i].fields.accounts) {
        for (var j= 0; j < hits[i].fields.accounts.length; j++) {
          accounts[hits[i].fields.accounts[j].domain] = hits[i].fields.accounts[j].username;
        }
      }
      $( "span.contributor[data-sys-contributor='" + hits[i].fields.sys_contributors + "']" ).each( function() {
        var followable = false;
        $( this ).find( 'a.name' ).each( function() {
          $( this ).html( hits[i].fields.sys_title ).attr( 'href', hits[i].fields.sys_url_view);
        });
        $( this ).find( 'a.rss' ).each( function() {
          if (false) {
            // TODO work out what field this is
            $( this ).attr( 'href', '' );
            followable = true;
          } else {
             $( this ).hide();
          }
        });
        $( this ).find( 'a.facebook' ).each( function() {
          if (accounts['facebook.com']) {
            $( this ).attr( 'href', 'http://www.facebook.com/' + accounts['facebook.com'] );
            followable = true;
          } else {
             $( this ).hide();
          }
        });
        $( this ).find( 'a.twitter' ).each( function() {
          if (accounts['twitter.com']) {
            $( this ).attr( 'href', 'http://www.twitter.com/' + accounts['twitter.com'] );
            followable = true;
          } else {
             $( this ).hide();
          }
        });
        $( this ).find( 'a.linkedin' ).each( function() {
          if (accounts['linkedin']) {
            $( this ).attr( 'href', 'http://www.linkedin.com/in/' + accounts['linkedin.com'] );
            followable = true;
          } else {
             $( this ).hide();
          }
        });
        if (!followable) {
          $( this ).find( 'span.follow' ).hide();
        }
      });
    }
  });
};

