"use script";
/* global app */
/*
  This script is remembers the selected tab even after page refresh.
 */
var product, page;

app.currentTab = {
    set_active_tab: function (tab) {

    //Get tabs
        var tabs = tab.siblings(),
            tabId;

        tabs.each(function () {
            $(this).removeClass("active");
        });

        tab.addClass("active");
        tabId = $(".current-tabs li.active a").attr("href");
        tabId = tabId.substring(1);

        $("section.update-content").removeClass("active");
        $("section.update-content[id='" + tabId + "']").addClass("active");

        if (!window.location.hash) {
            window.location.hash = "tab-" + tabId;
        }
    }
};

if ($(".multipath-tabs-sm").length) {
    product = window.location.href.split("/")[4];
    page = window.location.href.split("/")[5];

  //Attach events to ul.current-tabs
    if (localStorage) {
        var ind = localStorage[product + page + "-tab"];
        app.currentTab.set_active_tab($(".current-tabs li").eq(ind));
    }

    $(".current-tabs li").click(function () {
        if (localStorage) {
            localStorage[product + page + "-tab"] = $(this).index();
        }
        app.currentTab.set_active_tab($(this));
    });
}
