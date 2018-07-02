$(function() {
    $(document).click(function(event) {
        if(!$(event.target).closest("a.logged-in-name").length) {
            if($('ul.rh-user-menu').is(":visible")) {
                $('ul.rh-user-menu').hide();
            }
        }
    });

    $("a.logged-in-name").on("click", function(){
        var width = $('ul.rh-universal-login').outerWidth();
        $('ul.rh-user-menu').width(width);
        $('ul.rh-user-menu').show();
    })
});
