//  https://dcp-jbossorgdev.rhcloud.com/v1/rest/search?field=level&field=sys_description&field=sys_title&field=sys_tags&field=sys_url_view&field=contributors&query=EE+AND+level%3AIntermediate&sys_type=jbossdeveloper_quickstart&sys_type=jbossdeveloper_bom&field=sys_tags&field=sys_activity_dates&activity_date_interval=year


// https://dcp-jbossorgdev.rhcloud.com/v1/rest/search
// ?field=level
// &field=sys_description
// &field=sys_title
// &field=sys_tags
// &field=sys_url_view
// &field=contributors
// &query=EE+AND+level:Intermediate
// &sys_type=jbossdeveloper_quickstart
// &sys_type=jbossdeveloper_bom
// &field=sys_tags
// &field=sys_activity_dates
// &activity_date_interval=year

function roundHalf(num) {
    var num = Math.round(num*2)/2;
    var html = "";
    for (var i = num; i >= 0; i--) {
      if(i >= 1) {
        html += "<i class='icon-star'></i>";
      }
      else if (i > 0) {
        html += "<i class='icon-star-half-empty'></i>";
      }
    };
    return html;
}

app.dm = {
  filter : function(filters) {
    // Get the Filter Items

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

    /*
      Time commitment
    */ 
    var el = $('input[name="filter-time-commitment"]'),
        step = el.attr('step'),
        max = el.attr('max') || 100,
        value = el.val(),
        labels = el.data('labels').split(','),
        idx = value / step,
        timeCommitment = labels[idx]; // final value

    // var filters = [keyword, rating, topics, formats, skillLevel, publishDate, timeCommitment];
    var filters = {
      "keyword" : keyword,
      "rating" : rating,
      "topics" : topics,
      "formats" : formats,
      "skillLevel" : skillLevel,
      "publishDate" : publishDate,
      "timeCommitment" : timeCommitment
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
      // Formats is not supported with the DCP yet
      // query.push('format:('+formats+')');
    }

    if(currentFilters['skillLevel']) {
      query.push('level:'+skillLevel);
    }

    if(currentFilters['publishDate']) {
      // THis needs to be wired up
      // query.push('publishDate:'+publishDate);
    }

    if(currentFilters['timeCommitment']) {
      // THis needs to be wired up
      // query.push('timeCommitment:'+timeCommitment);
    }

    var query = query.join(" AND ");
 
    // append loading class to wrapper
    $("ul.results").addClass('loading');

    $.ajax({
      url : 'https://dcp-jbossorgdev.rhcloud.com/v1/rest/search',
      asyn : false,
      data : {
        "field"  : ["artifactId", "contributors", "groupId", "level", "recommendedVersion", "sys_activity_dates", "sys_comments", "sys_content", "sys_content_content", "sys_content_content-type", "sys_content_id", "sys_content_plaintext", "sys_content_provider", "sys_content_type", "sys_contributors", "sys_created", "sys_description", "sys_id", "sys_last_activity_date", "sys_project", "sys_project_name", "sys_tags", "sys_title", "sys_type", "sys_updated", "sys_url_view", "tags", "target_product", "versions"],
        // "query" : "EE AND level:Intermediate",
        "query" : query,
        // "sys_type" : ["jbossdeveloper_quickstart","jbossdeveloper_bom"],
        "activity_date_interval" : "year"
      }
    }).done(function(data){
      var hits = data.hits.hits; // first one for testing
      var cardTemplate = $("#cardTemplate").html();
      var html = "";
      window.hits = hits;
      
      // loop over every hit

      for (var i = 0; i < hits.length; i++) {
        var template = cardTemplate.format(
            hits[i].fields.sys_url_view            // 0 - link
          , "??:??:??"                         // 1 - duration *
          , hits[i].fields.level                   // 2 - level
          , hits[i].fields.sys_title               // 3 - title
          , hits[i].fields.contributors[0]         // 4 - author * 
          , moment(hits[i].fields.sys_created).fromNow()           // 5 - timestamp
          , roundHalf(hits[i]._score)                         // 6 - rating
          , hits[i].fields.sys_description         // 7 - description
          , hits[i].fields.sys_content_type        // 8 - Content type
        );

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
  $('form.filters').on('change','input',function(e){
    app.dm.filter();
  });

  $('form.filters').on('submit',function(e) {
    e.preventDefault();
  });
});