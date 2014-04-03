---
interpolate: true
---
function getCorrectUrl(linkUrl) {
  if (linkUrl.indexOf("/") > 0) {
    return linkUrl;
  } else {
    return "https://jboss.org" + linkUrl;
  }
}

app.project = {
  projectFilter : function(filters) {
    console.log('Performing project filter');
    // Get the Filter Items

    //Currently the only way to specify no limit
    var maxResults = 500;

    /*
      Keyword
    */
    var keyword = $('input[name="filter-text"]').val();

    var filters = {
      "keyword" : keyword,
    }
    var currentFilters = {};

    $.each(filters, function(key, val) {
      // if its empty, remove it from the filters
      if(val.length) {
        currentFilters[key] = val;
      }
    });

    // Prep each filter
    var query = [];

    if(currentFilters['keyword']) {
      query.push(keyword);
    }

    var query = query.join(" AND ");

    // append loading class to wrapper
    $("ul.results").addClass('loading');

    $.ajax({
      url : '#{site.dcp_base_url}v1/rest/search',
      data : {
        "sys_type" : "project_info",
        "field"  : ["_source"],
        "query" : query,
        "size" : maxResults
      }
    }).done(function(data){
      var hits = data.hits.hits; // first one for testing
      hits.sortJsonArrayByProperty("_source.sys_title");
      var html = "";
      window.hits = hits;

      // loop over every hit

      for (var i = 0; i < hits.length; i++) {
        var props = hits[i]._source;

        var template = "<li class=\"upstream\">"
          + "<div class=\"defaultprojectimage\">"
          + "<a class=\"image-link\" href=\"" 
          + props.sys_url_view
          + "\"><img onerror=\"this.style.display='none'\" src="
          + "\"http://static.jboss.org/"
          + props.sys_content_id + "/images/"
          + props.sys_content_id + "_200x150.png\"></a></div>"
          + "<h3 class=\"solution-name\"><a class=\"solution-name-link\" href=\""
          + props.sys_url_view + "\">"
          + props.projectName + "</a></h3><p></p>";

        if (props.downloadsLink) {
          template += "<a class=\"upstream-download\" href=\""
            + props.downloadsLink + "\"><i class=\"fa fa-download\"></i> Download</a>";
        }
        template += "<div class=\"upstream-more-content\">"
          // + "<p class=\"product-links\">Included in Product(s)<br></p>"
          + "<ul class=\"external-links\">";

        if (props.docsLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.docsLink) + "\">Documentation</a></li>";
        }
        if (props.communityLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.communityLink) + "\">Community</a></li>";
        }
        if (props.knowledgeBaseLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.knowledgeBaseLink) + "\">KnowledgeBase</a></li>";
        }
        if (props.userForumLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.userForumLink) + "\">User Forum</a></li>";
        }
        if (props.devForumLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.devForumLink) + "\">Dev Forum</a></li>";
        }
        if (props.mailingListLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.mailingListLink) + "\">Mailing List</a></li>";
        }
        if (props.chatLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.chatLink) + "\">Chat</a></li>";
        }
        if (props.blogLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.blogLink) + "\">Blog</a></li>";
        }
        if (props.twitterLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.twitterLink) + "\">Twitter</a></li>";
        }
        if (props.issueTrackerLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.issueTrackerLink) + "\">Issue Tracker</a></li>";
        }
        if (props.jiraLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.jiraLink) + "\">JIRA</a></li>";
        }
        if (props.srcLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.srcLink) + "\">Source</a></li>";
        }
        if (props.anonymousLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.anonymousLink) + "\">Anonymous Source</a></li>";
        }
        if (props.commiterLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.commiterLink) + "\">Committer Source Access</a></li>";
        }
        if (props.fisheyeLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.fisheyeLink) + "\">FishEye</a></li>";
        }
        if (props.viewvcLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.viewvcLink) + "\">View Source</a></li>";
        }
        if (props.githubLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.githubLink) + "\">Github</a></li>";
        }
        if (props.anonymousGitLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.anonymousGitLink) + "\">Anonymous Git</a></li>";
        }
        if (props.committerGitLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.committerGitLink) + "\">Committer Git</a></li>";
        }
        if (props.buildLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.buildLink) + "\">Build</a></li>";
        }
        if (props.hudsonLink) {
          template += "<li><a href=\"" + getCorrectUrl(props.hudsonLink) + "\">Jenkins</a></li>";
        }

        template += "</ul></div><a class=\"upstream-toggle-more\" href=\"#\"><span class=\"view-more\">View More <i class=\"fa fa-plus-square\"></i></span><span class=\"view-less\">View Less <i class=\"fa fa-minus-square\"></i></span></a></li>";
        // Append template to HTML
        html += template;
      }

      // Inject HTML into the DO<
      if(!html) {
        html = "Sorry, no results to display. Please modify your search.";
      }
      $("ul.results:first").html(html);
      $("#results-label").html(hits.length);
      $("ul.results").removeClass('loading');

      /*
         Upstream Solutions
       */
      $('.upstream-toggle-more').on('click',function(e){
        e.preventDefault();
        var el = $(this);

        el.toggleClass('upstream-toggle-open');
        el.prev('.upstream-more-content').slideToggle();
      });
    });
  }
}

// Event Listeners
$(function() {
  $('form.project-filters').on('change','input',function(e){
    app.project.projectFilter();
  });

  $('form.project-filters').on('submit',function(e) {
    e.preventDefault();
  });

  if ($('.project-filters').length) {
    app.project.projectFilter();
  }
});

