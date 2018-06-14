$(document).ready(function () {
    $("a[href$='.pdf']").each(function () {
        var ignoredDomains = ['developers.redhat.com/download-manager/', 'jboss.org/download-manager/'];
        for (i = 0; i < ignoredDomains.length; i++) {
            if (this.href.indexOf(ignoredDomains[i]) != -1) {
                return true;
            }
        }
        if (this.href.indexOf(location.hostname) == -1) {
            $(this).on("click", function () { return true; });
            $(this).attr({ target: "_blank" });
            $(this).trigger("click");
        }
    });
});
