---
interpolate: true
---
function roundHalf(num) {
    var num = Math.round(num*2)/2;
    var html = "";
    for (var i = num; i >= 0; i--) {
      if(i >= 1) {
        html += "<i class='fa fa-star'></i>";
      }
      else if (i > 0) {
        html += "<i class='fa fa-star-half-empty'></i>";
      }
    };
    return html;
}

app.dm = {
  devMatFilter : function(filters) {
    // Get the Filter Items
    console.log('Performing dev material search');

    //Currently the only way to specify no limit
    var maxResults = 500;

    /*
      Keyword
    */
    var keyword = $('input[name="filter-text"]').val();

    /*
      Rating
    */ 
    var rating = $('input[name="filter-rating"]:checked').val() || 0;

    /*
      Topics
    */ 
    var topics = $('input[name="filter-topic[]"]:checked').map(function () {
      return this.value;
    }).get(); 

    topics = topics.join(" ");

    /*
      Formats
    */ 
    var formats = $('input[name="filter-format"]:checked').map(function () {
      return this.value;
    }).get(); 

    //Enable sandbox if sandbox filter checked, or if no format filters are checked.
    var sandboxEnabled = $.inArray('jbossdeveloper_sandbox', formats) != -1 || formats.length == 0;
    var quickstartsEnabled = $.inArray('jbossdeveloper_quickstart', formats) != -1 || formats.length == 0;

    //remove sandbox if there.
    var index = formats.indexOf('jbossdeveloper_sandbox');
    if (index !== -1) {
        formats[index] = 'jbossdeveloper_quickstart';
    }

    formats = formats.join(" ");

    /*
      Skill Level
    */ 
    var el = $('input[name="filter-skill"]'),
        step = el.attr('step'),
        max = el.attr('max') || 100,
        value = el.val(),
        labels = el.data('labels').split(','),
        idx = value / step,
        skillLevel = labels[idx]; // final value

    /*
      Publish Date
    */ 
    var publishDate = $('input[name="filter-publish-date"]').map(function () {
      var d = new Date();
      switch(this.value) {
        case '0':
          //All
          d.setFullYear(d.getFullYear() - 100);
          break;
        case '25':
          //Within 1 Year
          d.setFullYear(d.getFullYear() - 1);
          break;
        case '50':
          //Within 30 days
          d.setDate(d.getDate() - 30);
          break;
        case '75':
          //Within 7 days
          d.setDate(d.getDate() - 7);
          break;
        case '100':
          //Within 24 hours
          d.setDate(d.getDate() - 1);
          break;
      }
      var day = d.getDate();
      var month = d.getMonth() + 1; //Months are zero based
      var year = d.getFullYear();
      var createdDate = year + "-" + month + "-" + day;
      console.log('Using ' + createdDate + ' as publish date value');
      return createdDate;
    }).get();
    
    var filters = {
      "keyword" : keyword,
      "rating" : rating,
      "topics" : topics,
      "formats" : formats,
      "skillLevel" : skillLevel,
      "publishDate" : publishDate
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

    if(currentFilters['rating']) {
      // rating disabled, doesn't work on DCP
      // query.push("_score:>="+rating);
    }

    if(currentFilters['topics']) {
      query.push('sys_tags:('+topics+')');
    }

    if(currentFilters['formats']) {
      query.push('_type:('+formats+')');
    } else {
      query.push('_type:(jbossdeveloper_bom jbossdeveloper_quickstart jbossdeveloper_archetype jbossdeveloper_video)');
    }

    if(currentFilters['skillLevel']) {
      if (skillLevel != 'All') {
          query.push('level:'+skillLevel);
      }
    }

    //Handle quickstarts and sandbox quickstarts
    if ((sandboxEnabled && quickstartsEnabled) || (!sandboxEnabled && !quickstartsEnabled)) {
        //do nothing, the format filter will take care of this case
    } else if (!sandboxEnabled && quickstartsEnabled) {
        //filter out the sandbox quickstarts
        query.push('-github_repo_url:"https://github.com/jboss-developer/jboss-sandbox-quickstarts"')
    } else if (sandboxEnabled && !quickstartsEnabled) {
        //filter out the regular quickstarts
        query.push('github_repo_url:"https://github.com/jboss-developer/jboss-sandbox-quickstarts"')
    }



    if(currentFilters['publishDate']) {
      query.push('sys_created:>='+publishDate);
    }


    var query = query.join(" AND ");


    // append loading class to wrapper
    $("ul.results").addClass('loading');


    $.ajax({
      url : '#{site.dcp_base_url}v1/rest/search',
      asyn : false,
      data : {
        "field"  : ["artifactId", "contributors", "sys_contributors", "groupId", "level", "recommendedVersion", "sys_activity_dates", "sys_comments", "sys_content", "sys_content_content", "sys_content_content-type", "sys_content_id", "sys_content_plaintext", "sys_content_provider", "sys_content_type", "sys_contributors", "sys_created", "sys_description", "sys_id", "sys_last_activity_date", "sys_project", "sys_project_name", "sys_tags", "sys_title", "sys_type", "sys_updated", "sys_url_view", "tags", "target_product", "versions", "thumbnail", "duration", "github_repo_url"],
        "query" : query,
        "size" : maxResults,
        "content_provider" : 'jboss-developer'
      }
    }).done(function(data){
      var hits = data.hits.hits; // first one for testing
      var html = "";
      window.hits = hits;
      
      // loop over every hit

      for (var i = 0; i < hits.length; i++) {

        if ('sys_contributors' in hits[i].fields) {
            var contributors = hits[i].fields.sys_contributors[0];
        } else {
            var contributors = hits[i].fields.contributors[0];
        }

        var template = 
          "<li class=\"material\">" + 
          "<a class=\"thumbnail\" href=\"" + hits[i].fields.sys_url_view + "\">";
          if (hits[i].fields.thumbnail) {
            template +="<img src=\"" + hits[i].fields.thumbnail + "\" />";
          } else {
            template +="<img src=\"/images/placeholder-" + hits[i].fields.sys_content_type  + ".png\" />";
          }
          template += "</a>";
          var labels = "";
          if (hits[i].fields.duration && hits[i].fields.duration > 0) {
            labels += "<span class=\"material-level-" + hits[i].fields.level + " label\">" +
              hits[i].fields.duration.toString().toHHMMSS() +
            "</span>";
          }
          if (hits[i].fields.level && hits[i].fields.level.length > 0) {
            labels += "<span class=\"material-level-" + hits[i].fields.level + " label\">" +
              hits[i].fields.level +
            "</span>";
          }
          if (labels.length == 0) {
            labels += "<div class=\"empty-label\"></div>";
          }
          template += labels;
          template += "<h4>" +
            "<a href=\"" + hits[i].fields.sys_url_view + "\">" +
              hits[i].fields.sys_title +
            "</a>" +
          "</h4>";
          if (contributors && contributors.length > 0) {
           template += "<p class=\"author\">" +
              "Author:" + 
              "<a href=\"" + hits[i].fields.sys_url_view + "\">" +
                contributors +
              "</a>" +
            "</p>";
          }
          template += "<p class=\"material-datestamp\">" + 
            "Added " + moment(hits[i].fields.sys_created).fromNow() +
          "</p>" + 
          "<div class=\"body\">" +
            "<p>" +
              hits[i].fields.sys_description +
            "</p>" +
          "</div>" +
          "</li>";


        // Append template to HTML
        html += template;
      };

      // Inject HTML into the DO<
      if(!html) {
        html = "Sorry, no results to display. Please modify your search.";
      }
      $("ul.results:first").html(html);
      $("ul.results").removeClass('loading');
    });
  }
}

// Event Listeners 
$(function() {
  $('form.dev-mat-filters').on('change','input',function(e){
    app.dm.devMatFilter();
  });

  $('form.dev-mat-filters').on('submit',function(e) {
    e.preventDefault();
  });

  if ($('form.dev-mat-filters').length) {
    app.dm.devMatFilter();
  }
});
