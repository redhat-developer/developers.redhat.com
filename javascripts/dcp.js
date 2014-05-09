/** DCP HELPERS **/

app.dcp.getNameFromContributor = function( contributor ) {
  return contributor.substring(0, contributor.lastIndexOf("<") - 1);
};
app.dcp.resolveContributors = function(sysContributors) {

  // Remove duplicates
  contributors = sysContributors.unique();

  app.dcp.currentRequest = $.ajax({
    url : app.dcp.url,
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

