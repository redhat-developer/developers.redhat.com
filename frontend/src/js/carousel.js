"use strict";
/* global app */
app.carousel = app.carousel || {
    init: function($carousel) {
    // event listeners
        $carousel.on('click', '.carousel-pager', function() {
            app.carousel.slide($carousel, $(this).hasClass('prev'));
        });
    },

    slide: function($carousel, reverse) {
        // var slides = $carousel.find('li');
        // var scrollLeft = $slideWrapper.scrollLeft();
        // var $nextItem;
        // var pagerWidth = $carousel.find('a.carousel-pager:first').width();
        var $slideWrapper = $carousel.find('ul'),
            itemWidth = $carousel.find('li:first').outerWidth(true),
            amount = reverse ? '+=' + -itemWidth : '+=' + itemWidth;
        $slideWrapper.animate({'scrollLeft': amount});
    }
};

$(function() {
    $('.video-carousel').each(function(i, el){
        app.carousel.init($(el));
    });
});
