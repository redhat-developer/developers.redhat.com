window.ATL_JQ_PAGE_PROPS = $.extend(window.ATL_JQ_PAGE_PROPS, {
    '03f305bd': {
        triggerFunction: function (showCollectorDialog) {
            jQuery("#rhdCustomTrigger").on("click", function (e) {
                e.preventDefault();
                showCollectorDialog();
            });
        }
    },
    '98c38440': {
        triggerFunction: function (showCollectorDialog) {
            jQuery("#errorPageCustomTrigger").on("click", function (e) {
                e.preventDefault();
                showCollectorDialog();
            });
        }
    }
});
