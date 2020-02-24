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

  // $(document).foundation(); RHDX-218

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
});

