window.ATL_JQ_PAGE_PROPS = $.extend(window.ATL_JQ_PAGE_PROPS, { 
  // Footer Jira issue collector
  '03f305bd' : {
    triggerFunction: function(showCollectorDialog) {
      jQuery("#rhdCustomTrigger").click(function(e) {
        e.preventDefault();
        showCollectorDialog();
      });
    }
  },
  // 404 and general error pages' Jira issue collector
  '98c38440' : {
    triggerFunction: function(showCollectorDialog) {
      jQuery("#errorPageCustomTrigger").click(function(e) {
        e.preventDefault();
        showCollectorDialog();
      });
    }
  }
});
