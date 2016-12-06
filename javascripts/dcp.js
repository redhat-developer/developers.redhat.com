/** DCP HELPERS **/

app.dcp.getNameFromContributor = function( contributor ) {
  return contributor.substring(0, contributor.lastIndexOf("<") - 1);
};

app.dcp.generateContributorSpan = function(tmpl, contributor) {
  var d = {};
  d.contributor = contributor;
  d.contributorName = app.dcp.getNameFromContributor( contributor );
  return tmpl.template( d );
};

app.dcp.authStatus = function() {
  return $.ajax({
    type:"GET",
    url: app.dcp.url.auth_status,
    xhrFields: {withCredentials: true}
  });
};

/*
 * Resolve an array of contributors, and replace any
 * span.contributor[data-sys-contributor=<contributor>] elements in the current page
 * TODO: If we need this still, migrate to DCP2
 * https://dcp2-searchisko.rhcloud.com/v2/rest/search?sys_type=contributor_profile&field=sys_url_view&field=sys_title&field=_source
 */
app.dcp.resolveContributors = function(sysContributors) {

  // if no contributors are passed - pull them from the DOM
  if(!sysContributors) {
    var sysContributors = [];
    $('[data-sys-contributor]').each(function(i,el){
      var contributor = $(el).data('sys-contributor');

      if(contributor) {
        sysContributors.push(contributor);
      }

    });
    sysContributors = $.unique(sysContributors);
  }

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

