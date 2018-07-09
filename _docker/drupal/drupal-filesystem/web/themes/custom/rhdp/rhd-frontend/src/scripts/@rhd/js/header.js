$(function() {
    $(document).click(function(event) {
        if(!$(event.target).closest("a.dropdwn-trigger").length) {
            if($('ul.rh-user-menu').is(":visible")) {
                $('ul.rh-user-menu').hide();
            }
        }
    });

    $("a.dropdwn-trigger").on("click", function(){
        var width = $('ul.rh-universal-login').outerWidth();
        $('ul.rh-user-menu').width(width);
        $('ul.rh-user-menu').show();
    })
});
