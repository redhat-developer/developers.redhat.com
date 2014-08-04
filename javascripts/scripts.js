---
interpolate: true
---

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
  $('.nav-toggle').on('click touchend',function(){
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
  
  $('li.has-dropdown span.drop-down-arrow').on('click touchend',function(e){
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

  if (typeof app.mktg_ops.init !== "undefined") {
    app.mktg_ops.init();
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

  /*
   * Resolve contributors for getting started items
   */
  var gsiMeta = $( '.gsi-meta' );
  if (gsiMeta.length) {
    var type = gsiMeta.attr( 'data-searchisko-type' );
    var id = gsiMeta.attr( 'data-searchisko-id' );
    app.dcp.resolveContributorsForBlock( type, id, $( 'div.content-wrapper' ), app.templates.basicContributorTemplate );
  }

  /*
   * Populate referrer for contact page
   */
   $('input[name="referrer"]').val(document.referrer);

  /*
   * Resolve contributors for videos
   */
  $( 'div[itemprop="video"]' ).each( function() {
    var type = $( this ).attr( 'data-searchisko-type' );
    var id = $( this ).attr( 'data-searchisko-id' );
    app.dcp.resolveContributorsForBlock( type, id, $( this ),  app.templates.socialContributorTemplate );
  });

  /* Init Highlightjs */
  hljs.initHighlightingOnLoad();

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

// Code pulled from http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
app.getQueryVariable = function (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for(var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

// Event Listeners for Buzz
$(function() {

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
      select = $("<select>").append('<option selected value="">Choose a section</option>');

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
 * T&C banner display
 */
app.termsAndConditionsCallback = function(data) {
  if (data.tac.accepted) {
    // create banner, maybe modal? saying when they signed tac.acceptanceTimestamp
    data.tac.acceptanceTimestamp = new Date(data.tac.acceptanceTimestamp).toLocaleString();
    var newHtml = app.templates.termsAndConditionsTemplate.template(data.tac);
    $('#_developer_program_terms_conditions').before(newHtml);
  }
}

app.termsAndConditionsBanner = function() {
  app.dm.authStatus().done(function(data) {
    if (data.authenticated) {
      // Add a jsonp call to get the info
      var tac = document.createElement('script'); tac.type = 'text/javascript'; tac.async = true;
      tac.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'community.jboss.org/api/custom/v1/account/info?callback=app.termsAndConditionsCallback';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tac, s);
    }
  });
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
  app.sideNav();

  // Small hack to allow us to specify selectors and children to make sticky (used for TOC on FAQ and dev mats)
  stickySections = {'faq':'h2', 'gsi': 'h2'};
  for (var key in stickySections) {
    app.stickyNav(key, stickySections[key]);
  }
  app.stickyFooter();

  // When the page is loaded, loop through query params and apply them
  if($('[data-set]').length) {
    // 1. Check for data-set-* attributes
    app.utils.parseDataAttributes();
  }
  else if(window.location.search && !!window.location.search.match(/_escaped_fragment/)) {
    // 2. Check for a query string 
    var hashParams = app.utils.getParametersFromHash();
    app.utils.restoreFromHash();
    app.dm.restoreFilter(hashParams);
  }
  else if(window.location.hash) {
    // 3. check for a hash fragment
    app.utils.restoreFromHash();
    app.dm.restoreFilter();
  }
  else if($('form.dev-mat-filters').length) {
    // 4. Check for localstorage and the developer materials form
    app.dm.restoreFilter();
  }

  if ($('#_developer_program_terms_conditions').length) {
    app.termsAndConditionsBanner();
  }
});

