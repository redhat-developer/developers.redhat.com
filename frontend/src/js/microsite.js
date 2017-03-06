"use strict";
/* global app */
$(function() {

    var microSiteNav = $('.microsite-nav'),
        heroEls;

    if (microSiteNav.length) {
        $('.microsite-nav li.active a').on('click', function(e){
            e.preventDefault();
            //console.log("Micosite nav opened");
            microSiteNav.toggleClass('microsite-nav--open');
        });

        $('.microsite-nav li a').not('li.active a').on('click', function(e){
            //console.log("closing...");
            microSiteNav.removeClass('microsite-nav--open');
        });
    }

  // equalize bottoms
    heroEls = $('.wide-hero > .row > div');

    if (heroEls.length === 2) {
        app.equalizeBottoms(heroEls);
    }

});
