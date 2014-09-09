/*
 * Buzz
 * Dependencies: vendor/jQuery.js, vendor/jQuery.XDomainRequest.js, namespace.js
 * DOM Ready dependencies: vendor/jquery.timeago.js
 * Isotope dependencies: vendor/jquery.isotope.min.js, vendor/imagesloaded.min.js
 */
app.buzz = {

  filter : function(tmpl, container, itemCount, append, from, callback) {

    // set a default item count of 8
    var itemCount = itemCount || 8;

    // append loading class to wrapper
    container.addClass('buzz-loading');
    
    /*
      Keyword
    */
    var keyword = $('input[name="buzz-filter-text"]').val();

    var filters = {
      "keyword" : keyword
    }
    var currentFilters = {};

    $.each(filters, function(key, val) {
      // if its empty, or undefined, remove it from the filters
      if(val && val.length) {
        currentFilters[key] = val;
      }
    });

    // Prep each filter
    var query = [];

    // Pass search params to GTM for analytics
    window.dataLayer = window.dataLayer || [];
        
    
    if(currentFilters['keyword']) {
      query.push(keyword);
      window.dataLayer.push({ 'keyword' : keyword });
    } else {
      window.dataLayer.push({ 'keyword' : null });
    }


    var tags = container.data('tags');

    if(tags){
      query.push("sys_tags:"+tags);
      window.dataLayer.push({ 'tags' : tags });
    } else {
      window.dataLayer.push({ 'tags' : null });
    }
    var query = query.join(" AND ");

    window.dataLayer.push({'event': 'buzz-search'});

    $.ajax({
        url : app.dcp.url.search,
        dataType: 'json',
        data : {
          "field"  : ["sys_url_view", "sys_title", "sys_contributors", "sys_description", "sys_updated", "author", "sys_tags"],
          "query" : query,
          "size" : itemCount,
          "sys_type" : "blogpost",
          "sortBy" : "new-create",
          "query_highlight" : true,
          "from" : from || 0 // for pagination
        },
        beforeSend : function() {
          // check if there is a previous ajax request to abort
          if(app.buzz.currentRequest && app.buzz.currentRequest.readyState != 4) {
            app.buzz.currentRequest.abort();
          }
        },
        error : function() {
          $('.buzz-filters').html(app.dcp.error_message);
          $('.mini-buzz-container').html(app.dcp.error_message);
          $('.buzz-loading').removeClass('buzz-loading');
        }
      }).done(function(data){
        // Delay loading this until the DOM is ready
        // PLM: Do we really need to do this?
        $( function() {
          app.buzz.infiniteScrollCalled = false;
          var hits = data.hits.hits;
          if(keyword && keyword.length) {
            app.search.format(keyword,hits, $('.buzz-filters .searchResults'));
          }
          var html = "";
          for (var i = 0; i < hits.length; i++) {
            var d = hits[i].fields;
            // This regex will parse an email like "John Smith <john.smith@acme.com>", giving you two matches "John Smith" and "john.smith@acme.corp"
            var pat = /(?:([^"]+))? <?(.*?@[^>,]+)>?,? ?/g;
            d.authorName = "";
            d.authorMail = "";
            while (m = pat.exec(d.sys_contributors)) {
              d.authorName = m[1];
              d.authorMail = m[2];
            }
            if(!d.authorName) {
              d.authorName = d.author;
            }
            d.updatedDate = jQuery.timeago(new Date(d.sys_updated));
            d.sys_description = d.sys_description.substr(0,200);
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

        if (container.hasClass('isotoped')) {
          container.imagesLoaded(function(){
            container.isotope('destroy').isotope({
              itemSelector: '.buzz-item'
            });
            typeof callback === 'function' && callback();
          });
        }

        container.removeClass('buzz-loading');

        $('.share-this').on('click mouseover', function() {
          Socialite.load($(this)[0]);
        
        });
      });

    }); // end ajax done
  },

  init : function() {

    $( function() {
    
      /*
        Isotope
      */
      var $container = $('.buzz-container');

      if($container.length) {

        $(window).load(function() {

          // Filtering
          /*$('.sort-icons a').click(function(){
            $('.buzz-filter-active').removeClass('buzz-filter-active');
            $(this).addClass('buzz-filter-active');
            var filterType = ".buzz-item-"+$(this).data('filter');
            if(filterType == '.buzz-item-all') {
              filterType = ".buzz-item";
            }
            $container.isotope({ filter: filterType });
          });*/

        });

        // Bind to window resize
        $(window).resize(function() {
          $container.isotope({
            itemSelector: '.buzz-item'
          });
        });
      };
    });
    
    /* 
      "Mini" Buzz, for the homepage
    */
    var $mbuzz = $('.mini-buzz-container');

    if($mbuzz.length) {
      app.buzz.filter(app.templates.miniBuzzTemplate, $mbuzz);
    };

    /* 
      Full Buzz, for the buzz page
    */
    var $buzz = $('.buzz-container');

    if($buzz.length) {
      app.buzz.filter(app.templates.buzzTemplate, $buzz, 4);

      // infinite scroll for full buzz page

      app.buzz.infiniteScrollCalled = false;
      var currentPagination = 0;
      var buzzFlag = true; // rate limiting 
      var win = $(window);
      var offset = 700; // pixel offset
      win.on('scroll',function() {
        var scrollBottom = win.scrollTop() + win.height();
        var scrollTop = win.scrollTop();
        var buzzBottom = $buzz.position().top + $buzz.height();

        if((scrollBottom + offset > buzzBottom) && !app.buzz.infiniteScrollCalled && buzzFlag) {
          
          // limit the number of times it can be called to once per second
          buzzFlag = false;
          window.setTimeout(function(){ buzzFlag = true; },1000);

          app.buzz.infiniteScrollCalled = true;
          var from = $('.buzz-item').length + 1;
          // load in more
          app.buzz.filter(app.templates.buzzTemplate, $buzz, 8, true, from, function() {
            if(win.scrollTop() < 400){
              win.scrollTop(scrollTop);
            }
          });
        }
      });
    };

    /* 
      Product Page Buzz by tag
    */
    var $pbuzz = $('.product-buzz-container');

    if($pbuzz.length) {
      app.buzz.filter(app.templates.productBuzzTemplate, $pbuzz);
    };

    // Event Listeners for Buzz Filter
    // When the buzz filter input is changed, search

    var timeOut;
    var lastSearch = "";
    $('form.buzz-filters').on('keyup','input',function(e){
      var el = $(this);
      var query = el.val();
      clearTimeout(timeOut);
      // throttle ajax requests
      timeOut = setTimeout(function() {
        var $buzz = $('.buzz-container');
        if(lastSearch !== query) {
          app.buzz.filter(app.templates.buzzTemplate, $buzz);
          app.utils.updatePageHash(el);
        }
        lastSearch = query;
      }, 300);
    });

    $('form.buzz-filters').on('submit',function(e) {
      e.preventDefault();
    });

  }
};

// Call app.buzz.init() straight away. The call is slow, and anything which requires render dependencies is
// in jQuery DOM ready callbacks
app.buzz.init();

