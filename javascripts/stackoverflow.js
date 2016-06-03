/*
 * Stackoverflow
 * Dependencies: vendor/jQuery.js, vendor/jQuery.XDomainRequest.js, namespace.js
 * DOM Ready dependencies: vendor/jquery.timeago.js
 */
app.stackoverflow = {

  filter : function(tmpl, container, itemCount, append, from, dataIndex, callback) {

    var url = app.dcp.url.stackoverflow;

    // set a default item count of 8
    itemCount = itemCount || 8;

    // append loading class to wrapper
    container.addClass('stackoverflow-loading');
    
    // Pass search params to GTM for analytics
    window.dataLayer = window.dataLayer || [];

    /*
      Keyword
    */
    var keyword = keyword || $('input[name="filter-text"]').val();

    var filters = $.extend(filters, {"keyword": keyword});
    // var filters = {
    //   "keyword" : keyword
    // };
    var currentFilters = {};
    // console.log("Filters: " + filters);
    var request_data = {};

    var filter_products = $('select[name="filter-products"]');
    if (filter_products.length && filter_products.val() !== "") {
      var product = filter_products.val();
      console.log("Selected product: "+ product);
      filters['stackoverflow'] = app.products[product]['stackoverflow'];
      // console.log("Product tags: " + filters['stackoverflow']);
      window.dataLayer.push({ 'product' : product });
    } else {
      window.dataLayer.push({ 'product' : null });
    }

    $.each(filters, function(key, val) {
      //if its empty, or undefined, remove it from the filters
      if(val && val.length) {
        currentFilters[key] = val;
      }
    });

    // Prep each filter
    var query = [];

    // Pass search params to GTM for analytics
    window.dataLayer = window.dataLayer || [];
        
    
    // if(currentFilters.keyword) {
    //   query.push(keyword);
    //   window.dataLayer.push({ 'keyword' : keyword });
    // } else {
    //   window.dataLayer.push({ 'keyword' : null });
    // }

    if(currentFilters['keyword']) {
      window.dataLayer.push({ 'keyword' : query });
      query.push(keyword);
      delete currentFilters['keyword']
    } else {
      window.dataLayer.push({ 'keyword' : null });
    }

    // Pull the json array, switch back to double quotes, then parse it.
    if (container.data('tags')){
      var tags = container.data('tags') || "";
      try {
        tags = JSON.parse(tags.replace(/'/g, "\""));
      } catch (e) {
        tags = "";
      }
    }
    else{
      var tags = filters['stackoverflow'];
      // tags = tags.replace(/"/, "'");
    }
    


    
    console.log("filter tags: " + tags);
    if(tags){
      var tagsString = "";
      for (var i = 0; i < tags.length; i++) {
        if (i > 0) {
          tagsString += " ";
        }
        tagsString += tags[i];
      }
      window.dataLayer.push({ 'tags' : tags });
    } else {
      window.dataLayer.push({ 'tags' : null });
    }
    window.dataLayer.push({'event': 'stackoverflow-search'});

    $.ajax({
        url : app.dcp.url.stackoverflow,
        dataType: 'json',
        data : {
          "field"  : ["sys_url_view", "sys_title", "is_answered", "author", "sys_tags", "answers", "sys_created", "view_count", "answer_count", "down_vote_count", "up_vote_count"],
          "query" : query,
          "tag" : tags,
          "size" : itemCount,
          // "sys_type" : "blogpost",
          "sortBy" : "new-create",
          "from" : dataIndex // for pagination
        },
        beforeSend : function() {
          // check if there is a previous ajax request to abort
          if(app.stackoverflow.currentRequest && app.stackoverflow.currentRequest.readyState != 4) {
            app.stackoverflow.currentRequest.abort();
          }
        },
        error : function() {
          $('.stackoverflow-filters').html(app.dcp.error_message);
          $('.stackoverflow-loading').removeClass('stackoverflow-loading');
        }
      }).done(function(data){
        // Delay loading this until the DOM is ready
        // PLM: Do we really need to do this?
        $( function() {
          app.stackoverflow.infiniteScrollCalled = false;
          app.stackoverflow.noScroll = false;
          var hits = data.hits.hits;
          if(hits.length < 8) {
            app.stackoverflow.noScroll = true;
          }
          if(keyword && keyword.length) {
            app.search.format(keyword,hits, $('.stackoverflow-filters .searchResults'));
          }
          var html = "";
          for (var i = 0; i < hits.length; i++) {
            score = hits[i]._score;
            var d = hits[i]._source;
            d.authorName = d.author.split('-')[0];
            d.permanentLink = d.sys_url_view;
            d.tags = d.sys_tags.join(', ').substr(0, 30);
            d.dateCreated =jQuery.timeago(new Date((d.sys_created / 1000) * 1000));

            // d.answerCount = 0;
            if(d.answers){
              // d.answerCount = d.answers.length;

              var aRex = /(<([^>]+)>)/ig;
              var bRex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
              pAnswer = d.answers[0].body.replace(aRex , "");
              pAnswer =  pAnswer.replace(bRex,"<a href='$1'>$1</a>");

              if (d.answers[0].is_accepted == true){
                d.answer = "<strong>Accepted answer: </strong>" + pAnswer;
              } else {
                d.answer = "<strong>Latest answer: </strong>" + pAnswer;
              }
            } else {
              d.answer = "<i>Question not yet answered</i>";
            }

            html += tmpl.template(d);
        }

        // Inject HTML into the DOM
        if(!html) {
          html = "Sorry, no results to display.";
        }
        if(append) {
          container.append(html);
        }
        else {
          container.html(html);
        }

        container.removeClass('stackoverflow-loading');

        $('.share-this').on('click mouseover', function() {
          Socialite.load($(this)[0]);
        
        });
      });

    }); // end ajax done
  },

  init : function() {

    var dataIndex = 0;

    /* 
      Full stackoverflow, for the stackoverflow page
    */
    var $stackoverflow = $('.stackoverflow-container');

    if($stackoverflow.length) {
      app.stackoverflow.filter(app.templates.stackoverflowTemplate, $stackoverflow, 8);

      // infinite scroll for full stackoverflow page

      app.stackoverflow.infiniteScrollCalled = false;
      var currentPagination = 0;
      var stackoverflowFlag = true; // rate limiting 
      var win = $(window);
      var offset = 700; // pixel offset
      win.on('scroll',function() {
        var scrollBottom = win.scrollTop() + win.height();
        var scrollTop = win.scrollTop();
        var stackoverflowBottom = $stackoverflow.position().top + $stackoverflow.height();

        if((scrollBottom + offset > stackoverflowBottom) && !app.stackoverflow.infiniteScrollCalled && stackoverflowFlag && !app.stackoverflow.noScroll) {
          
          // limit the number of times it can be called to once per second
          stackoverflowFlag = false;
          window.setTimeout(function(){ stackoverflowFlag = true; },1000);

          app.stackoverflow.infiniteScrollCalled = true;
          var from = $('.stackoverflow-container > div').length;

          dataIndex += 8;
          // console.log("dataIndex: " + dataIndex);
          // load in more
          app.stackoverflow.filter(app.templates.stackoverflowTemplate, $stackoverflow, 8, true, from, dataIndex, function() {
            if(win.scrollTop() < 400){
              win.scrollTop(scrollTop);
            }
          });
        }
      });
    }

    /* 
      Product Page stackoverflow by tag
    */
    var $pstackoverflow = $('.product-stackoverflow-container');

    if($pstackoverflow.length) {
      app.stackoverflow.filter(app.templates.productStackoverflowTemplate, $pstackoverflow, 4);
    }

    // Event Listeners for Stackoverflow Filter
    // When the stackoverflow filter input is changed, search

    var timeOut;
    var lastSearch = "";
    $('form.stackoverflow-filters').on('keyup','input',function(e){
      var el = $(this);
      var query = el.val();
      clearTimeout(timeOut);
      // throttle ajax requests
      timeOut = setTimeout(function() {
        var $stackoverflow = $('.stackoverflow-container');
        if(lastSearch !== query) {
          app.stackoverflow.filter(app.templates.stackoverflowTemplate, $stackoverflow);
          app.utils.updatePageHash(el);
        }
        lastSearch = query;
      }, 300);
    });

    $('form.stackoverflow-filters').on('submit',function(e) {
      e.preventDefault();
    });

  }
};

// Call app.stackoverflow.init() straight away. The call is slow, and anything which requires render dependencies is
// in jQuery DOM ready callbacks
app.stackoverflow.init();
