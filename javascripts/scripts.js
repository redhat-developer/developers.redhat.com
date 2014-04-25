---
interpolate: true
---
/*
  Polyfill forms - input range sliders - for IE8 only
*/

$.webshims.setOptions('basePath', 'http://static.jboss.org/www/vendor/web-shims-1.12.5/');
$.webshims.polyfill('forms forms-ext');

/* 
  Website Init 
*/
app.init = function() {
  /*
    Initialize foundation JS
  */

  $(document).foundation();

  /*
    initialize All sliders
  */
  
    app.slider = Swipe(document.getElementById('slider'), {
      auto : 0,
      transitionEnd : function() {
        var idx = app.slider.getPos();
        $('.slider-pager-active').removeClass('slider-pager-active');
        $('.slider-pager a:eq('+idx+')').addClass('slider-pager-active');
      }
    });

    if(app.slider) {
      var numSlides = app.slider.getNumSlides(),
          pagerHtml = "";

      for (var i = 0; i < numSlides; i++) {
        pagerHtml+="<a href='#"+i+"'>"+(i+1)+"</a>";
      }

      $('.slider-pager').html(pagerHtml);
      $('.slider-pager a:first').addClass('slider-pager-active');

      /* Bind Arrows and pager */
      $('.slider-controls').on('click','a',function(e){
        var direction = $(this).data('direction');
        app.slider[direction]();
        e.preventDefault();
      });

      $('.slider-pager').on('click','a',function(e){
        e.preventDefault();
        var idx = this.href.split('#').pop();
        app.slider.slide(idx);
      });
    }


  /*
    Toggle mobile Nav
  */
  $('.nav-toggle').on('click touchstart',function(){
     if (!app.fastClick) {
       // we're binding to touchstart and click. If we have a touchstart, don't also run on click
       app.fastClick = true;
       setTimeout(function(){ app.fastClick = false; }, 100);
       $('body').toggleClass('nav-open');
     }
    return false
  });

  /*
    Mobile Nav dropdown
  */
  
  $('li.has-dropdown span.drop-down-arrow').on('click touchstart',function(e){
      if (!app.fastClick) {
        // we're binding to touchstart and click. If we have a touchstart, don't also run on click
        app.fastClick = true;
        setTimeout(function(){ app.fastClick = false; }, 100);
        $(this).parent().toggleClass('sub-nav-open');
      }
     return false
  });

  /*
    Developer Materials Slider Filter
  */
  $('form.dev-mat-filters input[type=range]').on('change mousemove',function() {
    // we bind to change and mousemove because Firefox doesn't fire change until mouse is dropped.
    // convert step and total to number of options
    var el = $(this),
        step = el.attr('step'),
        max = el.attr('max') || 100,
        value = this.value,
        labels = el.data('labels').split(','),
        idx = value / step;
    el.next('.skill-display').text( labels[idx] );
  });

  /*
    Developer Materials Rating Filter
  */
  $('input[name="filter-rating"]').on('change input',function() {
    var val = this.value;
    $('.filter-rating-active').removeClass('filter-rating-active');
    $('input[name="filter-rating"]').each(function() {
      if(this.value <= val) {
        $(this).parent().addClass('filter-rating-active');
      }
    });
  });

  /*
    Show Solutions
  */
  $('[data-open-solution]').on('click',function(e){
    e.preventDefault();
    var el = $(this),
        num = el.data('open-solution'),
        overlay = $('[data-solution='+num+']'),
        position = el.position(),
        offset = el.offset(),
        parentPosition = el.closest('.row').offset(),
        height = el.height(),
        width = el.width();

    $('.solution-open').removeClass('solution-open');
    el.addClass('solution-open');
    
    // Toggle visibility of the ones we want
    $('.solution-overlays').show();
    overlay.show();
    $('[data-solution]').not(overlay).hide();

    // Move the overlay vertically
    $('.solution-overlays').css({
      top : position.top + (height / 2)
    });

    // Move the arrow over
    $('.solution-overlays span.arrow').css({
      left: position.left  + (width / 2)
    });

    // Make the slider for this overlay work
    app.createSlider(overlay.find('.slider'));

    // Bind to close it
    $('body').on('click','.fn-close-overlay',function(e) {
      e.preventDefault();
      $('.solution-overlays').hide();
      $('.solution-open').removeClass('solution-open');
    });

  })

  /* 
    Social Media Share Buttons 
  */
    $(document).ready(function()
    {
        $('.share-this').on('click mouseover', function()
        {
            Socialite.load($(this)[0]);
        });
    });

  /*
    Equalize Bottoms
  */

  if($('.event-body').length) {
    app.equalizeBottoms($('.event-body'));
  }

  /*
    Isotope
  */
  var $container = $('.buzz-items');

  if($container.length) {

    $(window).load(function() {
      $container.isotope({
        itemSelector: '.buzz-item'
      });

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

      // text filtering
      $('input[name="buzz-filter-text"]').keyup(function() {
        var text = $(this).val();
        $container.isotope({ filter: '.buzz-item:Contains('+text+')' });
      });
    });

    // Bind to window resize
    $(window).resize(function() {
      $container.isotope({
        itemSelector: '.buzz-item'
      });
    });
  };
  
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
    app.buzz.filter(app.templates.buzzTemplate, $buzz);
  };

  /*
     Show more downloads table
  */

  var moreDownloadsLink = $('.view-older-downloads');
  if(moreDownloadsLink.length) {
    // moreDownloadsLink.next('table').hide();
    moreDownloadsLink.on('click touchstart',function(e) {
      e.preventDefault();
      moreDownloadsLink.next('table').toggle();
    })
  }

  /* 
    Equalize bottoms on development tools
  */
  var devTools = $('.development-tool');
  if(devTools.length) {
    app.developmentTools();

    // run again on window resize
    $(window).on('scroll',function() {
      app.developmentTools();
    });

  }
  
  /*
   * Call any marketing operations initialization required
   */

  if (app.mktg_ops) {
    app.mktg_ops.init();
  }

  /*
   * Populate developer materials results if on developer materials page
   */

  if ($('.developer-materials').length) {
     app.dm.devMatFilter();
  }

  if ($('.downloadthankyou').length) {
      app.dl.doDownload();
  }

  /*
   * Product Page demo toggle
   */
  $('table.demos a.view-more').on('click',function(e){
    e.preventDefault();
    var el = $(this);
    el.toggleClass('open');
    el.parent().parent().next().find('p').slideToggle(); // 'tr.desc'

  });

}; /* End app.init() */

app.createSlider = function($el) {
  var slider = Swipe($el[0], {
    auto : 0,
    transitionEnd : function() {
      $('.current-slide').text(slider.getPos() + 1);
      // $('.slider-pager-active').removeClass('slider-pager-active');
      // $('.slider-pager a:eq('+idx+')').addClass('slider-pager-active');
    }
  });
  // unbind the next/ prev icons
  $('.solutions-slider-controls a').unbind();

  // Bind the next / prev icons
  $('.solutions-slider-controls a').on('click',function(e){
    e.preventDefault();
    var el = $(this);
    var direction = (el.hasClass('next') ? 'next' : 'prev');
    slider[direction]();
  });

  // Update text
  $('span.current-slide').text('1');
  $('.total-slides').text(slider.getNumSlides());

  return slider;
};

app.sso = function() {
  var jbssoserverbase = (document.location.href.indexOf("-stg.") != -1) ? "https://sso-stg.jboss.org" : "https://sso.jboss.org";
  // Temporarily set to sso while the not on the vpn
  jbssoserverbase = "https://sso.jboss.org";

  // you can uncomment and fill next variable with another URL to be used for return from SSO login.
  // Full URL of current page is used normally. 
  var _jbssobackurl = window.location.href;
  // you can uncomment and fill next variable with another URL to be used for logout link.
  // Global SSO logout URL is used normally if not defined. 
  var _jbssologouturl = window.location.origin + '/login';
  // postfix appended to returned info snippets before they are placed into HTML 
  var _jbssoinfopostfix = ' |';
  
  // Loads this..
  $.ajax({
    // https://sso.jboss.org/logininfo
    url : jbssoserverbase + "/logininfo?backurl=" + escape(_jbssobackurl) +"&lourl="+ escape(_jbssologouturl),
    context : document.body,
    dataType : "jsonp",
    type : "GET",
    success : function(data, textStatus) {
      
      if (data && data.session) {
        // user is logged in!
        var response = $(data.part1),
            img = response.find('img'),
            profileUrl = response[2].getAttribute('href'),
            name = response[2].innerText;
        $('a.logged-in-name')
          .text(name)
          .attr('href', profileUrl)
          .prepend(img)
          .show();
        $('dd.logged-in').show();
        $('dd.login').hide();
        $('dd.register').hide();
      } else {
        $('dd.login').show();
        $('dd.register').show();
        $('dd.logged-in').hide();        
      }
    }
  });
};

/*
 * Buzz
 */
app.buzz = {

  filter : function(tmpl, container) {

    // append loading class to wrapper
    $("ul.results").addClass('loading');
    
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
    
    if(currentFilters['keyword']) {
      query.push(keyword);
    }

    var query = query.join(" AND ");
    
    $.ajax({
        url : '#{URI.join site.dcp_base_url, "v1/rest/search"}',
        data : {
          "field"  : ["sys_url_view", "sys_title", "sys_contributors", "sys_description", "sys_updated"],
          "query" : query,
          "size" : 6,
          "sys_type" : "blogpost",
          "sortBy" : "new-create"
        },
        beforeSend : function() {
          // check if there is a previous ajax request to abort
          if(app.buzz.currentRequest && app.buzz.currentRequest.readyState != 4) {
            app.buzz.currentRequest.abort();
          }
        }
      }).done(function(data){
        var hits = data.hits.hits;
        var html = "";
        for (var i = 0; i < hits.length; i++) {
          var d = hits[i].fields;
          // This regex will parse an email like "John Smith <john.smith@acme.com>", giving you two matches "John Smith" and "john.smith@acme.corp"
          var pat = /(?:([^"]+))? <?(.*?@[^>,]+)>?,? ?/g;
          d.authorName = "Unknown";
          d.authorMail = "";
          while (m = pat.exec(d.sys_contributors)) {
            d.authorName = m[1];
            d.authorMail = m[2];
          }
          d.updatedDate = jQuery.timeago(new Date(d.sys_updated));
          html += tmpl.template(d);
      }

      // Inject HTML into the DOM
      if(!html) {
        html = "Sorry, no results to display.";
      }
      container.html(html);
      container.removeClass('buzz-loading');
      $('.share-this').on('click mouseover', function() {
        Socialite.load($(this)[0]);
      });
    });
  }
}

// Event Listeners for Buzz
$(function() {
  $('form.buzz-filters').on('change','input',function(e){
    var $buzz = $('.buzz-container');
    app.buzz.filter(app.templates.buzzTemplate, $buzz);
  });

  $('form.buzz-filters').on('submit',function(e) {
    e.preventDefault();
  });

  if ($('form.buzz-filters').length) {
    var $buzz = $('.buzz-container');
    app.buzz.filter(app.templates.buzzTemplate, $buzz);
  }
});


/*
  Equalize Bottoms
*/
app.equalizeBottoms = function($selector) {
  // bind the first element on resize
  $selector.first().on('resize',function(e){
    // Temporarily reset everything to auto
    $selector.css('height','auto');
    // Loop through each event and grab the largest
    var heights = [];
    $selector.each(function() {
      var h = $(this).outerHeight();
      heights.push(h);
    });

    var maxHeight = Math.max.apply(Math, heights);
    $selector.css('height',maxHeight);
  });

  // trigger a resize event on load
  $selector.first().trigger('resize');
};

/*
  Faq Sidebar + Scrollspy
*/
// TODO: This should be more flexible, instead of hardcoded
app.stickyNav = function(className, headerElement) {
  var nav = $('.' + className + '-nav'),
      win = $(window);
  if(!nav.length) {
    return; // Don't need to go any further, this isn't the faq page
  }
  
  var html = "",
      top = nav.offset().top,
      select = $("<select>").append('<option selected value="">Choose a FAQ topic</option>');

  $('.' + className + ' ' + headerElement).each(function(i,el){
    html += "<li><a href='#"+$(this).attr('id')+"'>"+$(this).text()+"</a></li>";
    select.append("<option value='"+$(this).attr('id')+"'>"+$(this).text()+"</option>");
  });

  // select += "</select>";

  nav.html(html);
  nav.after(select);

  win.scroll(function() {
    if(win.scrollTop() >= (top)) {
      nav.addClass(className + "-nav-fixed");
    } else {
      nav.removeClass(className + "-nav-fixed");
    }

    // Sticky headers on the faqs
    $('.' + className + ' ' + headerElement).each(function(i,el){
      var el = $(this),
          top = el.offset().top,
          id = el.attr('id');
      if(win.scrollTop() >= (el.offset().top - 15)) {
        $('a[href="#'+id+'"]').addClass('past-block');
      } else {
        $('a[href="#'+id+'"]').removeClass('past-block');
      }
    });

    $('.past-block').not(':last').removeClass('past-block');
  });

  // bind to select box change
  $(select).on('change',function() {
    var header = $(this).find('option:selected').val();
    window.location.hash = header;
  }).wrap('<div class="styled-select mobile-selector">');



}

/*
  Sticky Footers
*/
app.stickyFooter = function() {
  var bodyHeight = $('body').height(),
      windowHeight = $(window).height(),
      wrapper = $('.wrapper');
  if(bodyHeight < windowHeight) {
    var headerHeight = $('header.main').outerHeight(),
        footerHeight = $('footer.bottom').outerHeight(),
        devHeight = $('.under-development').outerHeight(),
        wrapperHeight = windowHeight - headerHeight - footerHeight - devHeight;
    wrapper.css('min-height',wrapperHeight);
  }
};

/*
  3rd level nav
*/

app.sideNav = function() {

  // hide the active one
  var sideItem = $('.side-nav li.active');

  $('.side-nav-toggle a').text(sideItem.text());
  //
  $('.side-nav-toggle a').on('click',function(e) {
    e.preventDefault();
    $('.side-nav').toggleClass('side-nav-open');
  });

};

/*
   Development Tools even bottoms
 */

app.developmentTools = function(){
  $('.development-tool-category').each(function() {
   var items = $(this).find('.development-tool:even');
   $(items).each(function(i,el) {
     var that = $(this);
     that.height('auto');
     that.next().height('auto');

     var max = Math.max(that.outerHeight(), that.next().outerHeight()) + 50; // account for the absolute learn more button
     that.css('height',max);
     that.next().css('height',max);
   });
  });
};

/*
  Date Pickers
*/
$('.datepicker').pickadate();

$(function() {
  app.init();
  app.sso();
  app.sideNav();

  // Small hack to allow us to specify selectors and children to make sticky (used for TOC on FAQ and dev mats)
  stickySections = {'faq':'h3', 'gsi': 'h2'};
  for (var key in stickySections) {
    app.stickyNav(key, stickySections[key]);
  }
  app.stickyFooter();
});

/*
  jQuery Extensions
*/

jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
jQuery.ajaxSettings.traditional = true;

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
};

Array.prototype.sortJsonArrayByProperty = function sortJsonArrayByProperty(prop, direction){
    if (arguments.length < 1) throw new Error("sortJsonArrayByProperty requires 1 argument");
    var direct = arguments.length > 2 ? arguments[2] : 1; //Default to ascending

    var propPath = (prop.constructor === Array) ? prop : prop.split(".");
    this.sort(function(a,b){
        for (var p in propPath){
            if (a[propPath[p]] && b[propPath[p]]){
                a = a[propPath[p]];
                b = b[propPath[p]];
            }
        }
        // convert numeric strings to integers or to lower case strings
        a = isNaN(Math.floor(a)) ? a.toLowerCase() : a;
        b = isNaN(Math.floor(b)) ? b.toLowerCase() : b;
        return ( (a < b) ? ( -1 * direct ) : ((a > b) ? (1 * direct) : 0) );
    });
};

// Simple JavaScript Templating (modified)
// Original from John Resig - http://ejohn.org/ - MIT Licensed
// @see http://ejohn.org/blog/javascript-micro-templating/
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
 
  String.prototype.template = function (data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(this) ?
      cache[this] = cache[this] ||
        tmpl(document.getElementById(this).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        this
          .replace(/[\r\t\n]/g, " ")
          .split("<!").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)!>/g, "',$1,'")
          .split("\t").join("');")
          .split("!>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

