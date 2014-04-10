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
    // console.log('Performing dev material search');

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
          return null;
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
      // console.log('Using ' + createdDate + ' as publish date value');
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
      query.push('sys_type:('+formats+')');
    } else {
      query.push('sys_type:(jbossdeveloper_bom jbossdeveloper_quickstart jbossdeveloper_archetype video rht_knowledgebase_article rht_knowledgebase_solution)');
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

    query.push("(sys_content_provider:jboss-developer OR sys_content_provider:rht)")

    var query = query.join(" AND ");

    // append loading class to wrapper
    $("ul.results").addClass('loading');

    app.dm.currentRequest = $.ajax({
      url : '#{URI.join site.dcp_base_url, "v1/rest/search"}',
      data : {
        "field"  : ["contributors", "duration", "github_repo_url", "level", "sys_contributors",  "sys_created", "sys_description", "sys_title", "sys_url_view", "thumbnail"],
        "query" : query,
        "size" : maxResults
      },
      beforeSend : function() {
        // check if there is a previous ajax request to abort
        if(app.dm.currentRequest && app.dm.currentRequest.readyState != 4) {
          app.dm.currentRequest.abort();
        }
      }
    }).done(function(data){
      var hits = data.hits.hits; // first one for testing

      // Create a paginated list
      $('div.paginator').paging(hits.length, {
          format: '[< ncnnn >]',
          // Display 9 hits in a page
          perpage: 9,
          // When a new page in the list of pages is to be displayed
          onSelect: function(page) {
              var html = "";
              var data = this.slice;
              for (var i = data[0]; i < data[1]; i++) {

        if ('sys_contributors' in hits[i].fields) {
            var contributors = hits[i].fields.sys_contributors[0];
        } else if ('contributors' in hits[i].fields) {
            var contributors = hits[i].fields.contributors[0];
        }

        var template = "<li class=\"material\">"; 
        template += "<div class=\"get-started-placeholder-jbossdeveloper_quickstart\" >";
          if (hits[i].fields.github_repo_url) {
            var repo = hits[i].fields.github_repo_url;
            var repoLength = repo.length;
            if (repo.substring((repoLength - 25), repoLength) === 'jboss-sandbox-quickstarts') {
              template += "<a class=\"banner experimental\"></a>";
            }
          }
          if (hits[i].fields.sys_url_view) {
            var url = hits[i].fields.sys_url_view;
            var premiumPrefix = 'https://access.redhat.com';
            if (url.substring(0, (premiumPrefix.length)) === premiumPrefix) {
              template += "<a class=\"banner premium\"></a>";
            }
          }
          if (hits[i].fields.thumbnail) {
            template += "<a class=\"thumbnail\" href=\"" + hits[i].fields.sys_url_view + "\">";
            template +="<img onerror=\"this.style.display='none'\" src=\"" + hits[i].fields.thumbnail + "\" />";
            template += "</a>"
          }
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
          template += "</div>";
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

              // Inject HTML into the DOM
              if(!html) {
                  html = "Sorry, no results to display. Please modify your search.";
              }
              $("ul.results > li").remove();
              $("ul.results").html(html);
              $("ul.results").removeClass('loading');

              return false; // Don't follow the link!
          },
          // Format the paginator
          onFormat: function(type) {
              switch (type) {
                  case 'block': // n and c
                      return '<a>' + this.value + '</a>';
                  case 'next': // >
                      return '<a>&gt;</a>';
                  case 'prev': // <
                      return '<a>&lt;</a>';
                  case 'first': // [
                      return '<a>first</a>';
                  case 'last': // ]
                      return '<a>last</a>';
              }
          }
      });

    });
  },
  clearFilters: function($el) {
    var form = $('form.dev-mat-filters');
    form[0].reset();
    form.find('input[type=range]').each(function(i,el){
        $(el).attr('value',0);
    });
    $('form.dev-mat-filters input:checked').removeAttr('checked');
    $('.filter-rating-active').removeClass('filter-rating-active');
    this.devMatFilter();
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

  $('.filters-clear').on('click',function(e){
    e.preventDefault();
    app.dm.clearFilters($(this));
  });

  if ($('form.dev-mat-filters').length) {
    app.dm.devMatFilter();
  }

  // slide toggle on mobile
  $('.filter-block h5').on('click',function() {
    if(window.innerWidth <= 768) {
      var el = $(this);
      el.toggleClass('filter-block-open');
      el.next('.filter-block-inputs').slideToggle(300);
    }
  });

  // active class on labels
  $('.filter-block-inputs input[type=checkbox]').on('change',function(){
    var el = $(this);
    if(el.is(':checked')) {
      el.parent().addClass('checked');
    }
    else {
      el.parent().removeClass('checked');
    }
  });
});

