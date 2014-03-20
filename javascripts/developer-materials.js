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
    var publishDate = $('input[name="filter-publish-date"]:checked').map(function () {
      return this.value;
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

    if(currentFilters['publishDate']) {
      // THis needs to be wired up
      // query.push('publishDate:'+publishDate);
    }


    var query = query.join(" AND ");


    // append loading class to wrapper
    $("ul.results").addClass('loading');


    $.ajax({
      url : '#{site.dcp_base_url}v1/rest/search',
      asyn : false,
      data : {
        "field"  : ["artifactId", "contributors", "sys_contributors", "groupId", "level", "recommendedVersion", "sys_activity_dates", "sys_comments", "sys_content", "sys_content_content", "sys_content_content-type", "sys_content_id", "sys_content_plaintext", "sys_content_provider", "sys_content_type", "sys_contributors", "sys_created", "sys_description", "sys_id", "sys_last_activity_date", "sys_project", "sys_project_name", "sys_tags", "sys_title", "sys_type", "sys_updated", "sys_url_view", "tags", "target_product", "versions"],
        "query" : query,
        "size" : maxResults
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
          "<a class=\"thumbnail\" href=\"" + hits[i].fields.sys_url_view + "\">" +
            "<img src=\"/images/placeholder-" + hits[i].fields.sys_content_type  + ".png\" />" +
          "</a>";
          if (hits[i].fields.level && hits[i].fields.level.length > 0) {
            template += "<span class=\"material-level-" + hits[i].fields.level + " label\">" +
              hits[i].fields.level +
            "</span>";
          } else {
            template += "<div class=\"empty-label\"></div>";
          }
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
