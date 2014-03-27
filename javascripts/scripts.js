var app = window.app = {};
/* 
  Website Cache
*/
app.cache = {};

/*
  JS templates
*/

app.templates = new Object();
app.templates.miniBuzzTemplate = '#{partial "mini_buzz_template.html.slim"}';
app.templates.buzzTemplate = '#{partial "buzz_template.html.slim"}';

/* 
  Website Init 
*/ 
app.init = function() {
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
  $('.nav-toggle').on('click',function(){
    $('body').toggleClass('nav-open');
  });

  /*
    Mobile Nav dropdown
  */ 
  $('li.has-dropdown').on('click touchend',function(e){
    $(this).toggleClass('sub-nav-open');
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
    Developer Materials form Reset
  */
  $('.filters-clear').on('click',function(e){
    e.preventDefault();
    app.clearFilters($(this));
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
    // Facebook over CORS
    //http://api.facebook.com/restserver.php?method=links.getStats&urls=http://wesbos.com&format=json
    $('.facebook-share-button a').click(function(e){
      e.preventDefault();
      var el = $(this);
      // Open the window
      window.open(
        'https://www.facebook.com/sharer/sharer.php?s=100&\
        p[url]='+encodeURIComponent(el.data('url'))
        +'&p[title]=' + el.data('title')
        +'&p[summary]=' + el.data('text')
        , 
        'facebook-share-dialog', 
        'width=626,height=436'); 
    });

    // Facebook Share # — Get this number when you hover over the share button
    $('.share-this').on('mouseover',function(e){ // mouseover should be triggered on first tap
      var el = $(this),
          shareButton = el.find('.facebook-share-button a'),
          shareTab = el.find('.facebook-share-button-count'),
          url = shareButton.data('url'),
          shares = shareButton.data('shares');
      if(typeof shares == 'undefined') { // could possibly be zero
        shareButton.data('shares',0); // temporarily set to zero
        $.getJSON('http://api.facebook.com/restserver.php?method=links.getStats&format=json&urls='+encodeURIComponent(url),function(data){
          shareButton.data('shares',data[0]['share_count']);  
          shareTab.attr('data-shares',data[0]['share_count']);  // for display
        });

      }
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
    $mbuzz.feeds({
        feeds: { 
          buzz: 'http://planet.jboss.org/feeds/buzz' 
        },
        preprocess: function(feed) {
          this.publishedDate = jQuery.timeago(new Date(this.publishedDate));
        },
        loadingTemplate: '<p class="feeds-loader">Loading entries ...</p>',
        max: 6,
        entryTemplate: app.templates.miniBuzzTemplate
    });
  };

  /* 
    Full Buzz, for the buzz page
  */
  var $buzz = $('.buzz-container');

  if($buzz.length) {
    $buzz.feeds({
        feeds: { 
          buzz: 'http://planet.jboss.org/feeds/buzz' 
        },
        preprocess: function(feed) {
          this.publishedDate = jQuery.timeago(new Date(this.publishedDate));
        },
        loadingTemplate: '<p class="feeds-loader">Loading entries ...</p>',
        max: 6,
        entryTemplate: app.templates.buzzTemplate
    });
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
  }


}; /* End app.init() */

/*
  Clear All Filters
*/
app.clearFilters = function($el) {
  var form = $('form.dev-mat-filters');
  form[0].reset();
  form.find('input[type=range]').each(function(i,el){
    $(el).attr('value',0);
  });
  $('form.dev-mat-filters input:checked').removeAttr('checked');
  $('.filter-rating-active').removeClass('filter-rating-active');
};

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
      top = nav.offset().top;

  $('.' + className + ' ' + headerElement).each(function(i,el){
    html += "<li><a href='#"+$(this).attr('id')+"'>"+$(this).text()+"</a></li>";
  });

  nav.html(html);

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
}

/*
  Date Pickers
*/
$('.datepicker').pickadate();

$(function() {
  app.init();
  app.sso();

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
}

