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
  supportsLocalStorage: function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  },
  restoreFilter: function() {
    /* Restore the form values previously stored in local storage. */
    if(!this.supportsLocalStorage()) {
      return;
    }
    var filterKeys = [
      "keyword",
      "rating",
      "topics",
      "formats",
      "skillLevel",
      "publishDate"
    ];
    $.each(filterKeys, function(idx, key) {
      var formValue = window.localStorage.getItem("devMatFilter." + key);
      /*
       * Restore the value of the form input field.
       * Where multiple values are present, like for check box groups,
       * split the original form values, and set the individual input fields.
       */
      if(formValue) {
        switch(key) {
          case "keyword" :
            $('input[name="filter-text"]').val(formValue);
            break;
          case "rating" :
            if(formValue != 0) {
              $('input[name="filter-rating"][value='+ formValue +']').attr('checked', true);
            }
            break;
          case "topics" :
            var valArray = formValue.split(" ");
            $.each(valArray, function(idx, value){
              $('input[name="filter-topic[]"][value=' + value + ']').attr('checked', true);
            });
            break;
          case "formats":
            var valArray = formValue.split(" ");
            $.each(valArray, function(idx, value){
              $('input[name="filter-format"][value=' + value + ']').attr('checked', true);
            });
            break;
          case "skillLevel":
            $('input[name="filter-skill"]').val(formValue);
            break;
          case "publishDate":
            $('input[name="filter-publish-date"]').val(formValue);
            break;
        }
      }
    });
  },
  devMatFilter : function(filters) {
    // Set filters to an empty object if it isn't defined
    filters = typeof filters !== 'undefined' ? filters : {};

    //Currently the only way to specify no limit
    var maxResults = 500;

    if (filters.max_results) {
      maxResults = filters.max_results;
      delete filters['max_results'];
      console.debug('maxResults:' + maxResults);
    }

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
    var $skill = $('input[name="filter-skill"]');
    if ($skill.length) {
      var step = $skill.attr('step'),
        max = $skill.attr('max') || 100,
        value = $skill.val(),
        skillLabels = $skill.data('labels').split(','),
        idx = value / step,
        skillLevel = skillLabels[idx]; // final value
    }

    /*
      Publish Date
    */
      var $publishDate = $('input[name="filter-publish-date"]');
      var publishDate = $publishDate.map(function () {
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
      return createdDate;
    }).get();
    
    $.extend(filters, {
      "keyword" : keyword,
      "rating" : rating,
      "topics" : topics,
      "formats" : formats,
      "skillLevel" : skillLevel,
      "publishDate" : publishDate
    });

    /* Store the raw form values in local storage. */
    var formValues = {
      "keyword" : keyword,
      "rating" : rating,
      "topics" : topics,
      "formats" : formats,
      "skillLevel" : $skill.val(),
      "publishDate" : $publishDate.val()
    };
    if(this.supportsLocalStorage()) {
      $.each(formValues, function (key, val) {
        window.localStorage.setItem("devMatFilter." + key, val);
      });
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
      query.push('sys_type:(jbossdeveloper_bom jbossdeveloper_quickstart jbossdeveloper_archetype video rht_knowledgebase_article rht_knowledgebase_solution jbossdeveloper_example)');
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

    if (currentFilters['product']) {
      query.push('target_product:(' + currentFilters['product'] + ')');
    }

    var query = query.join(" AND ");

    // append loading class to wrapper
    $("ul.results").addClass('loading');

    app.dm.currentRequest = $.ajax({
      url : app.dcp.url.search,
      data : {
        "field"  : ["sys_author", "contributors", "duration", "github_repo_url", "level", "sys_contributors",  "sys_created", "sys_description", "sys_title", "sys_url_view", "thumbnail", "sys_type", "sys_rating_num", "sys_rating_avg"],
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
      var hits = data.hits.hits;

      var contributors = [];
      // Collect authors, so we can perform a batch request to the DCP
      for (var i = 0; i < hits.length; i++) {
        if ('sys_author' in hits[i].fields) {
          contributors.push(hits[i].fields.sys_author);
        }
      }

      // Create a paginated list
      var perPage = 9;
      var pages = hits.length / perPage;
      $('ul.pagination').removeClass('one-page'); 

      if(pages <= 1) {
        $('ul.pagination').addClass('one-page');
      }

      $('ul.pagination').paging(hits.length, {
        format: '< (qq-) nncnn (-pp) >',
        // Display 9 hits in a page
        perpage: perPage,
        // When a new page in the list of pages is to be displayed
        onSelect: function(page) {
          var html = "";
          var data = this.slice;
          for (var i = data[0]; i < data[1]; i++) {

            if ('sys_author' in hits[i].fields) {
              var author = hits[i].fields.sys_author;  
            }

            if ('sys_rating_num' in hits[i].fields) {
              var rating_num = hits[i].fields.sys_rating_num;
              var rating_avg = hits[i].fields.sys_rating_avg;
            }

            var template = "<li class=\"material\">"; 
            template += "<div class=\"get-started-placeholder-" + hits[i].fields.sys_type + "\" >";
            // jbossdeveloper_example and video have thumbnails
            if(!hits[i].fields.thumbnail) {
              template += "<img src='"+app.dm.thumbnails[hits[i].fields.sys_type]+"'>";
            }
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
            if (rating_avg) {
              template += "<p class=\"rating\">" + roundHalf(rating_avg) + "(" + rating_num + ")</p>";
            }
            if (author && author.length > 0) {
              template += "<p class=\"author\">" +
                "Author: " +
                  "<span class=\"contributor\" data-sys-contributor=\"" + author + "\">" +
                    "<a class=\"name\">" + app.dcp.getNameFromContributor( author ) + "</a>" +
                  "</span>" +
                "</p>";
            }
            if (hits[i].fields.sys_created) {
              template += "<p class=\"material-datestamp\">" +
                "Published " + moment(hits[i].fields.sys_created).fromNow() +
              "</p>"
            }
            template += "<div class=\"body\">" +
              "<p>" +
                hits[i].fields.sys_description.slice(0,300).concat(' ...') +
              "</p>" +
            "</div>" +
            "</li>";


            // Append template to HTML
            html += template;

            // Resolve contributors
            app.dcp.resolveContributors(contributors);
          }

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
          if(hits.length < 1) {
            return "";
          }
          switch (type) {

            case 'block':

              if (!this.active)
                return '<li class="disabled">' + this.value + '</li>';
              else if (this.value != this.page)
                return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
              return '<li class="current"><a href="#' + this.value + '">' + this.value + '</a></li>';

            case 'left':
            case 'right':

              if (!this.active) {
                return "";
              }
              return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';

            case 'next':

              if (this.active)
                return '<li class="next arrow"><a href="#' + this.value + '" class="next">&raquo;</a></li>';
              return '<li class="next arrow unavailable"><a href>&raquo;</a></li>';

            case 'prev':

              if (this.active)
                return '<li class="prev arrow"><a href="#' + this.value + '" class="prev">&laquo;</a></li>';
              return '<li class="prev arrow unavailable"><a href>&laquo;</a></li>';

            case 'first':

              if (this.active)
                return '<li><a href="#' + this.value + '" class="first">First</a></li>';
              return '<li class="disabled">First</li>';

            case 'last':

              if (this.active)
                return '<li><a href="#' + this.value + '" class="last">Last</a></li>';
              return '<li class="disabled">Last</li>';

            case "leap":

              if (this.active)
                return "   ";
              return "";

            case 'fill':

              if (this.active)
                return '<li class="unavailable">...</li>';
              return "";
          }
        }
      }); // end Paging 
    }); // end ajax done()
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
  },
  thumbnails : {
    // These correspond with hit[i]._type
   // jboss
   "jbossdeveloper_quickstart" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_quickstart.png')}",
   "jbossdeveloper_archetype" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_archetype.png')}",
   "jbossdeveloper_bom" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_bom.png')}",
   // futurerproof for when jboss goes unprefixed
   "quickstart" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_quickstart.png')}",
   "archetype" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_archetype.png')}",
   "bom" : "#{cdn( site.base_url + '/images/design/get-started/jbossdeveloper_bom.png')}",
   // redhat
   "solution" : "#{cdn( site.base_url + '/images/design/get-started/solution.png')}",
   "article" : "#{cdn( site.base_url + '/images/design/get-started/article.png')}"
  },
  authStatus: $.ajax({
      type:"GET",
      url: '#{URI.join site.dcp_base_url, "v1/rest/auth/status"}',
      xhrFields: {withCredentials: true}
  })
}

// Event Listeners 
$(function() {
  var timeOut;
  $('form.dev-mat-filters').on('change keyup','input',function(e){
    clearTimeout(timeOut);
    timeOut = setTimeout(function() {
      app.dm.devMatFilter();
    }, 300);
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

  // toggle filters on mobile
  $('.filter-toggle').on('click',function() {
    if(window.innerWidth <= 768) {
      $('.developer-materials-sidebar').toggleClass('open');
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

  // Change star and cursor
  $('.rating').on('mouseover', function() {
    var elm = $(this),
        rating = $(this).prop('id').split('-')[1];
    for (var i = 1; i < rating; i++) {
      $('#rate-' + i).removeClass('fa-star-o');
      $('#rate-' + i).addClass('fa-star');
    }
    elm.removeClass('fa-star-o');
    elm.addClass('fa-star');
    elm.css('cursor', 'pointer');
  });
  $('.rating').on('mouseout', function() {
    var elm = $(this),
        rating = $(this).prop('id').split('-')[1];
    for (var i = 1; i < rating; i++) {
      $('#rate-' + i).removeClass('fa-star');
      $('#rate-' + i).addClass('fa-star-o');
    }
    elm.removeClass('fa-star');
    elm.addClass('fa-star-o');
    elm.css('cursor', 'auto');
  });
  // rate the item
  $('.rating').on('click', function(event) {
    app.dm.authStatus.done(function(data) {
      if (data.authenticated) {
        var rating = $.ajax({
          type: "POST",
          url: '#{URI.join site.dcp_base_url, "v1/rest/rating/"}' + $(event.target).data('searchisko-id'),
          xhrFields: {withCredentials: true},
          contentType: "application/json",
          data: "{\"rating\":\"" + $(event.target).data('rating') + "\"}"
        });
        rating.done(function(ratingData) {
          var elm = $('#your-rating');
          $('#new-rating').hide();
          elm.append(roundHalf($(event.target).data('rating') ));
          elm.show();
          elm = $('#avg-rating');
          elm.empty();
          elm.append('Avg: ' + roundHalf(ratingData.sys_rating_avg)).append('<span>(' + ratingData.sys_rating_num + ')</span>');
          elm.show();
        });
      } else {
        alert("Please log in to rate.");
      }
    });
  });

  // We're on an item we can rate, set things to either show their rating or to rate
  if ($('#rating-section').length) {
    $.get('#{URI.join site.dcp_base_url, "v1/rest/content/"}' + $('#your-rating').data('searchisko-id').split('-').join('/'))
      .done(function(item) {
        var elm = $('#avg-rating');
        elm.append(roundHalf(item.sys_rating_avg)).append('<span>(' + item.sys_rating_num + ')</span>');
        elm.show();
      });
    app.dm.authStatus.done(function(data) {
      if (data.authenticated) {
        var user_rating = $.ajax({
          type: 'GET',
          url: '#{URI.join site.dcp_base_url, "v1/rest/rating?id="}' + $('#your-rating').data('searchisko-id'),
          xhrFields:  { withCredentials: true}
        }).done(function(data) {
          if (data.rating) {
            $('#your-rating').append(roundHalf(data));
            $('#your-rating').show();
          } else {
            $('#new-rating').show();
          }
        });
      } else {
        $('#new-rating').show();
      }
    });
  }

  var product = app.getQueryVariable('product');
  if (product) {
    app.dm.devMatFilter({'product' : product});
  } else if (typeof devMatOptions !== 'undefined') { // Feels hacky
    app.dm.devMatFilter(devMatOptions);
  }
});

