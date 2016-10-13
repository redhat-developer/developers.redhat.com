if ($('#error-page').length) {
    window.ATL_JQ_PAGE_PROPS = {
        "triggerFunction": function (showCollectorDialog) {
            //Requires that jQuery is available!
            jQuery("#rhdCustomTrigger").click(function (e) {
                e.preventDefault();
                showCollectorDialog();
            });
        }
    };
}
