/**
 * Dependencies: vendor/jquery.resize.js
 */

/*
  Website Init
*/
app.init = function() {
  /*
    Initialize foundation JS
  */

  $(document).foundation();

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
   * Populate referrer for contact page
   */
   $('input[name="referrer"]').val(document.referrer);

}; /* End app.init() */

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
    var replace_id = $(this).text().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
    $(this).attr('id', replace_id);
    html += "<li><a href='#"+replace_id+"'>"+$(this).text()+"</a></li>";
    select.append("<option value='"+replace_id+"'>"+$(this).text()+"</option>");
  });

  // select += "</select>";

  nav.html(html);
  nav.after(select);

  win.scroll(function() {
    if(win.scrollTop() >= (top)) {
      var width = nav.parent().width();
      nav.addClass(className + "-nav-fixed").css('width',width);
    } else {
      nav.removeClass(className + "-nav-fixed").css('width','auto');
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

  // toggle visibility of full transcript 
  $('.transcript-toggle-more').on('click',function(e) {
    e.preventDefault();
    $('.transcript-wrap').toggleClass('transcript-wrap--open');
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
    var headerHeight = $('header.main').outerHeight() + $('nav.top-bar').outerHeight(),
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
  // var sideItem = $('.side-nav li.active');

  // $('.side-nav-toggle a').text(sideItem.text());
  //
  $('.side-nav-toggle a').on('click',function(e) {
    e.preventDefault();
    $('.side-nav').toggleClass('side-nav-open');
  });
};

$(function() {
  app.init();
  app.sideNav();

  // Small hack to allow us to specify selectors and children to make sticky (used for TOC on FAQ and dev mats)
  stickySections = {'faq':'h2', 'gsi': 'h2'};
  for (var key in stickySections) {
    app.stickyNav(key, stickySections[key]);
  }
  app.stickyFooter();

});

