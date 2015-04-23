---
interpolate: true
---

app.project = {
  getCorrectUrl : function (linkUrl) {
    if (linkUrl.indexOf("/") > 0) {
      return linkUrl;
    } else {
      return "https://jboss.org" + linkUrl;
    }
  },
  jbossLink : function (linkUrl) {
    if (linkUrl.indexOf("jboss.org") > 0) {
      return true;
    } else {
      return false;
    }
  },
  projectFilter : function(filters, keyword, container, thumbnailSize) {
    //Currently the only way to specify no limit
    var maxResults = 500;

    var url = app.dcp.url.project;

    // Pass search params to GTM for analytics
    window.dataLayer = window.dataLayer || [];

    /*
      Keyword
    */
    var keyword = keyword || $('input[name="filter-text"]').val();

    var filters = $.extend(filters, {"keyword": keyword});
    var currentFilters = {};
    var request_data = {
        "field"  : ["_source"],
        "query" : query,
        "size" : maxResults
    }

    if ($('select[name="filter-products"]').length && $('select[name="filter-products"]').val() !== "") {
      var product = $('select[name="filter-products"]').val();
      filters['project'] = app.products[product]['upstream'];
      window.dataLayer.push({ 'product' : product });
    } else {
      window.dataLayer.push({ 'product' : null });
    }

    if (filters['project']) {
      url = app.dcp.url.search;
      request_data["sys_type"] = "project_info";
    }

    $.each(filters, function(key, val) {
      // if its empty, remove it from the filters
      if(val != undefined && val.length) {
        currentFilters[key] = val;
      }
    });

    // Prep each filter
    var query = ['((_exists_:archived AND NOT archived:true) OR (_missing_:archived))'];

    if(currentFilters['keyword']) {
      window.dataLayer.push({ 'keyword' : query });
      query.push(keyword);
      delete currentFilters['keyword']
    } else {
      window.dataLayer.push({ 'keyword' : null });
    }

    // append loading class to wrapper
    $("ul.results").addClass('loading');
    $.extend(request_data, currentFilters);
    request_data["query"] = query.join(" AND ");

    window.dataLayer.push({'event': 'projects-search'});

    $.ajax({
      url : url,
      dataType: 'json',
      data : request_data,
      container : container,
      thumbnailSize : thumbnailSize,
      error : function() {
        $('ul.results').html(app.dcp.error_message);
      }
    }).done(function(data){
      var container = this.container || $('ul.results');
      var thumbnailSize = this.thumbnailSize || "200x150";
      app.project.format(data, container, thumbnailSize);
    });
  },
  clearFilters: function($el) {
      var form = $('form.project-filters');
      form[0].reset();
      this.projectFilter();
  },
  fallbackImage: function(el) {
    var src = "#{cdn( site.base_url + '/images/design/projects/default_200x150.png')}";
    el.src = src;
  },
  format : function(data, container, thumbnailSize) {
    if (data.responses) {
      var hits = data.responses[0].hits.hits;
    } else {
      var hits = data.hits.hits;
    }
    hits.sortJsonArrayByProperty("_source.sys_title");
    var html = "";
    // loop over every hit

    for (var i = 0; i < hits.length; i++) {
      var props = hits[i]._source;

      var imgsrc = "http://static.jboss.org/" + (props.specialIcon || props.sys_project) + "/images/" + (props.specialIcon || props.sys_project) + "_" + thumbnailSize + ".png";

      var template = "<li class=\"upstream\">"
        + "<div class=\"defaultprojectimage\">"
        + "<a class=\"image-link\" href=\""
        + app.project.getCorrectUrl(props.sys_url_view)
        + "\"><img onerror=\"app.project.fallbackImage(this)\" src='" + imgsrc + "' alt='" + props.projectName + "'></a></div>"
        + "<h5 class=\"solution-name\"><a class=\"solution-name-link\" href=\""
        + app.project.getCorrectUrl(props.sys_url_view) + "\">"
        + props.projectName + "</a></h3><p></p>";

      if (props.downloadsLink) {
        template += "<a class=\"upstream-download button tiny\" href=\""
          + app.project.getCorrectUrl(props.downloadsLink) + "\">Download</a>";
      }


      var list = "<div class=\"upstream-more-content\">" + "<ul class='project-details-list'>";

      if (props.docsLink) {
        var correctLink = app.project.getCorrectUrl(props.docsLink);
        list += "<li>Docs: <a href='"+correctLink+"'>Documentation</a></li>";
      }
      if (props.communityLink) {
        var correctLink = app.project.getCorrectUrl(props.communityLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Community: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.knowledgeBaseLink) {
        var correctLink = app.project.getCorrectUrl(props.knowledgeBaseLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>KnowledgeBase: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.userForumLink) {
        var correctLink = app.project.getCorrectUrl(props.userForumLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>User Form: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.devForumLink) {
        var correctLink = app.project.getCorrectUrl(props.devForumLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Dev Form: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.mailingListLink) {
        var correctLink = app.project.getCorrectUrl(props.mailingListLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Mailing List: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.chatLink) {
        var correctLink = app.project.getCorrectUrl(props.chatLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Chat: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.blogLink) {
        var correctLink = app.project.getCorrectUrl(props.blogLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Blog: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.issueTrackerLink) {
        var correctLink = app.project.getCorrectUrl(props.issueTrackerLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Issue: <a href='"+correctLink+"'>"+ viewLink +"</a></li>";
      }
      if (props.jiraLink) {
        var correctLink = app.project.getCorrectUrl(props.jiraLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>JIRA: <a href='"+correctLink+"'>"+ viewLink +"</a></li>";
      }
      if (props.srcLink) {
        var correctLink = app.project.getCorrectUrl(props.srcLink);
        list += "<li>Source: <a href='"+correctLink+"'>"+ correctLink +"</a></li>";
      }
      if (props.anonymousLink) {
        var correctLink = app.project.getCorrectUrl(props.anonymousLink);
        list += "<li>Anonymous Source: <a href='"+correctLink+"'>"+ correctLink +"</a></li>";
      }
      if (props.commiterLink) {
        var correctLink = app.project.getCorrectUrl(props.commiterLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Committer Source Access: <a href='"+correctLink+"'></a></li>";
      }
      if (props.fisheyeLink) {
        var correctLink = app.project.getCorrectUrl(props.fisheyeLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>FishEye: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.viewvcLink) {
        var correctLink = app.project.getCorrectUrl(props.viewvcLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>View Source<a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.githubLink) {
        var correctLink = app.project.getCorrectUrl(props.githubLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Github: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.anonymousGitLink) {
        var correctLink = app.project.getCorrectUrl(props.anonymousGitLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Anonymous Git: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.committerGitLink) {
        var correctLink = app.project.getCorrectUrl(props.committerGitLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Committer Git: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.buildLink) {
        var correctLink = app.project.getCorrectUrl(props.buildLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Build: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }
      if (props.hudsonLink) {
        var correctLink = app.project.getCorrectUrl(props.hudsonLink);
        var viewLink = correctLink.replace(/https?:\/\//,'');
        list += "<li>Jenkins: <a href='"+correctLink+"'>"+viewLink+"</a></li>";
      }

      list += "</ul></div>";

      // modal overlay content
      var projectContent = $('<div>').addClass('project-content row');
      var projectContentLeft = $('<div>').addClass('large-6 project-content-left columns').html("<img src='"+imgsrc+"' alt='" + props.projectName + "'>");
      var projectContentRight = $('<div>').addClass('large-18 project-content-right  columns');

      // downloads link
      if (props.downloadsLink) {
        projectContentLeft.append("<p><a class='upstream-download' href=\""+ app.project.getCorrectUrl(props.downloadsLink) + "\"><i class=\"fa fa-download\"></i> Download</a></p>");
      }

      // project url
      projectContentLeft.append("<p><a href='"+app.project.getCorrectUrl(props.sys_url_view)+"'>Visit home page</a></p>");

      // social links
      var social = $('<ul>').addClass('project-social');
      if (props.twitterLink) {
        var correctLink = app.project.getCorrectUrl(props.twitterLink);
        social.append("<li><a href='"+props.twitterLink+"'><i class='fa fa-twitter'></i></a></li>");
      }

      projectContentLeft.append(social);

      projectContentRight.append( $("<h3>").html("<a href='"+app.project.getCorrectUrl(props.sys_url_view)+"'>"+props.sys_project_name+"</a>") );
      projectContentRight.append( $("<p>").text(props.description) );
      projectContentRight.append(list);
      projectContent.append(projectContentLeft);
      projectContent.append(projectContentRight);

      template += $('<div>').append(projectContent.clone()).html();

      // close the list item
      template += "</li>";
      // Append template to HTML
      html += template;
    }

    // Inject HTML into the DO<
    if(!html) {
      html = "Sorry, no results to display. Please modify your search.";
    }
    container.html(html).removeClass('loading');
    container.prev().find("#results-label").html(hits.length);

  }
};

// Event Listeners
$(function() {

  var timeOut;
  $('form.project-filters').on('keyup','input',function(e){
    clearTimeout(timeOut);
    var el = $(this);
    timeOut = setTimeout(function() {
      app.project.projectFilter();
      app.utils.updatePageHash(el);
    }, 300);
  });

  $('form.project-filters').on('submit',function(e) {
    e.preventDefault();
  });

  $('select[name="filter-products"]').on('change', function(e) {
    e.preventDefault();
    var el = $(this);
    app.project.projectFilter();
    app.utils.updatePageHash(el);
  });

  $('.project-filters-clear').on('click',function(e){
    e.preventDefault();
    app.project.clearFilters($(this));
  });

  if ($('.project-filters').length) {
    if (window.location.search) {
      var product_id = app.utils.getQueryVariable('included-in');
      $('option[value="'+product_id+'"]').attr('selected','selected');
      app.project.projectFilter({project: app.products[product_id]['upstream']});
    } else {
      app.project.projectFilter();
    }
  }
  if ($('.community-projects').length) {
    app.project.projectFilter({project: app.products[$('.community-projects').data('product-id')]['upstream']});
  }

  /*
     Upstream Solutions View More Link
   */
  $('ul.results, ul.featured-projects-results').on('click','.upstream-toggle-more',function(e){
    e.preventDefault();
    var el = $(this);

    el.toggleClass('upstream-toggle-open');
    el.prev('.upstream-more-content').slideToggle();
  });

  /*
    Modal Box
  */

  $('ul.results, ul.featured-projects-results').on('click','li.upstream a',function(e) {
    e.preventDefault();
    var html = $(this).parents('li').find('.project-content').html();
    app.overlay.open(html);
  });

  /*
    Featured Projects
  */

  var featuredProjectIds = $('.featured-project-ids');

  if(featuredProjectIds.length) {
    var queryVal = JSON.parse(featuredProjectIds.text()).join(' OR ');
    var query = "sys_content_id:("+queryVal+")";

    app.project.projectFilter(null, query, $('ul.featured-projects-results'), '500x400');

  }

});

