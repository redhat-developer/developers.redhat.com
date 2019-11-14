/* eslint-disable strict */
$(function() {
    $(document).click(function(event) {
        if (!$(event.target).closest("a.dropdwn-trigger").length) {
            if ($('ul.rh-user-menu').is(":visible")) {
                $('ul.rh-user-menu').hide();
            }
        }
    });

    $("a.dropdwn-trigger").on("click", function(){
        var width = $('ul.rh-universal-login').outerWidth();
        $('ul.rh-user-menu').width(width);
        $('ul.rh-user-menu').show();
    });

    // bind click event to the search icon in navigation
    $(".rhd-nav-search > form > .pf-c-input-group > .rhd-nav-search--icon").on("click", function() {
        $(".rhd-nav-search > form").submit();
    });

    // bind click event to the search icon in mobile navigation
    $(".rhd-c-nav-dropdown__search > form.search-bar > .pf-c-input-group > button.pf-c-button").on("click", function() {
        $(".rhd-c-nav-dropdown__search > form.search-bar").submit();
    });
});
