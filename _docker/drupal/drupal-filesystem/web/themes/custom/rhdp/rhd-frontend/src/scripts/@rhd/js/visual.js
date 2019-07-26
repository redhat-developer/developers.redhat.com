/**
 * Dependencies: vendor/jquery.resize.js
 */

/*
  Website Init
*/
app.init = function () {
  /*
    Initialize foundation JS
  */

  $(document).foundation();

  /*
   * Product Page demo toggle
   */
  $('table.demos a.view-more').on('click', function (e) {
    e.preventDefault();
    var el = $(this);
    el.toggleClass('open');
    el.parent().parent().next().find('p').slideToggle(); // 'tr.desc'

  });

  /*
   * Populate referrer for contact page
   */
  $('input[name="referrer"]').val(document.referrer);

}; /* End app.init() */

/*
  Equalize Bottoms
*/
app.equalizeBottoms = function ($selector) {
  // bind the first element on resize
  $selector.first().on('resize', function (e) {
    // Temporarily reset everything to auto
    $selector.css('height', 'auto');
    // Loop through each event and grab the largest
    var heights = [];
    $selector.each(function () {
      var h = $(this).outerHeight();
      heights.push(h);
    });

    var maxHeight = Math.max.apply(Math, heights);
    $selector.css('height', maxHeight);
  });

  // trigger a resize event on load
  $selector.first().trigger('resize');
};

/*
  Faq Sidebar + Scrollspy
*/
// TODO: This should be more flexible, instead of hardcoded
app.stickyNav = function (className, headerElement) {
  var nav = $('.' + className + '-nav');

  if (!nav.length) {
    return; // Don't need to go any further there are no navigation elements
  }

  //setup vars
  var win = $(window);
  var resizeTimer;
  var html = "";
  var extraOffset = 120;
  var top = nav.offset().top;
  var bottom = nav.height() + extraOffset;
  var select = $("<select>").append('<option selected value="">Choose a section</option>');

  $('.' + className + ' ' + headerElement).each(function (i, el) {
    var replace_id = $(this).text().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
    $(this).attr('id', replace_id);
    html += "<li><a href='#" + replace_id + "'>" + $(this).text() + "</a></li>";
    select.append("<option value='" + replace_id + "'>" + $(this).text() + "</option>");
  });

  nav.html(html);
  if (className !== "gsi") {
    nav.after(select);
  }

  win.on("resize", function (e) {
    //resize so make nav not sticky so sizes can be calculated correctly
    nav.removeClass(className + "-nav-fixed").css('width', 'auto');
    top = nav.offset().top;
    bottom = nav.height() + extraOffset;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      //resize ended re-enable sticky nav 
      positionNav();
    }, 500);
  });

  function positionNav() {
    let contentBottom = $(".fetch-toc").height()+top;
    let width = nav.parent().width();
    let navTop = 0;
    let tmpScrollTop = win.scrollTop()+bottom;
    
    if (tmpScrollTop >= contentBottom) {
      navTop = contentBottom - tmpScrollTop;
    } else {
      navTop = 0;
    }

    if (win.scrollTop() >= (top)) {
      nav.addClass(className + "-nav-fixed").css({'width': width, 'top': navTop});
    } else {
      nav.removeClass(className + "-nav-fixed").css({'width': 'auto', 'top': 0});
    }

    // Sticky headers on the faqs
    $('.' + className + ' ' + headerElement).each(function () {
      var el = $(this);
      var id = el.attr('id');
      if (win.scrollTop() >= (el.offset().top - 15)) {
        $('a[href="#' + id + '"]').addClass('past-block');
      } else {
        $('a[href="#' + id + '"]').removeClass('past-block');
      }
    });
    $('.past-block').not(':last').removeClass('past-block');
  }

  win.on("scroll", function () {
    positionNav();
  });

  // bind to select box change
  $(select).on('change', function () {
    var header = $(this).find('option:selected').val();
    window.location.hash = header;
  }).wrap('<div class="styled-select mobile-selector">');

  // toggle visibility of full transcript 
  $('.transcript-toggle-more').on('click', function (e) {
    e.preventDefault();
    $('.transcript-wrap').toggleClass('transcript-wrap--open');
  });
};

/*
  Sticky Footers
*/
app.stickyFooter = function () {
  var bodyHeight = $('body').height();
  var  windowHeight = $(window).height();
  var  wrapper = $('.wrapper');

  if (bodyHeight < windowHeight) {
    var headerHeight = $('header.main').outerHeight() + $('nav.top-bar').outerHeight();
    var footerHeight = $('footer.bottom').outerHeight();
    var devHeight = $('.under-development').outerHeight();
    var wrapperHeight = windowHeight - headerHeight - footerHeight - devHeight;
    wrapper.css('min-height', wrapperHeight);
  }
};

/*
  3rd level nav
*/

app.sideNav = function () {
  $('.side-nav-toggle a').on('click', function (e) {
    e.preventDefault();
    $('.side-nav').toggleClass('side-nav-open');
  });
};

$(function () {
  app.init();
  app.sideNav();

  // Small hack to allow us to specify selectors and children to make sticky (used for TOC on FAQ and dev mats)
  var stickySections = { 'faq': 'h2', 'gsi': 'h2' };

  for (var key in stickySections) {
    app.stickyNav(key, stickySections[key]);
  }
  app.stickyFooter();

});

