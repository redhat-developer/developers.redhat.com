"use strict";
/*
    Used by the Docker solution. In particular manages the show/hide of the extra Docker image information.
 */
$(function() {

    $("input[type='text']").click(function () {
        $(this).select();
    });

    $("div.more-info-link a").click(function(e) {
        var el = $("div.more-info[name=" + $(this).parent().attr('name') + "]");
        e.preventDefault();
        el.slideToggle();
    });
});
