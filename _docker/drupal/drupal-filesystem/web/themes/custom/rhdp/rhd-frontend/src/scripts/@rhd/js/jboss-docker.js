/*
    Used by the Docker solution. In particular manages the show/hide of the extra Docker image information.
 */
$(function() {
    
    $("input[type='text']").on("click", function () {
        $(this).select();
    });
    
    $("div.more-info-link a").on("click", function(e) {
        e.preventDefault();
        var el = $("div.more-info[name=" + $(this).parent().attr('name') + "]");
        el.slideToggle();
    });
});
