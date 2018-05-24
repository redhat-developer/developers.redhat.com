$(function() {
    $(document).click(function(event) {
        if(!$(event.target).closest("a.logged-in-name").length) {
            if($('ul.dropdwn-menu').is(":visible")) {
                $('ul.dropdwn-menu').hide();
            }
        }
    });

    $("a.logged-in-name").on("click", function(){
        $('ul.dropdwn-menu').show();
    })
});
