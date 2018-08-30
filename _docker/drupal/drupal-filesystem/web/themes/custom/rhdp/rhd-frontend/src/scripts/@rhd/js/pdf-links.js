// Opens in a new tab all (except Download Manager) links ending in .pdf extension
$(document).ready(function() {
  $("a[href$='.pdf']").each(function() {
    
    // Ignore DM links
    var ignoredDomains = ['developers.redhat.com/download-manager/','jboss.org/download-manager/'];

    for (i=0; i<ignoredDomains.length; i++) {
      if (this.href.indexOf(ignoredDomains[i]) != -1) { return true; }
    }
    if (this.href.indexOf(location.hostname) == -1) {
      $(this).append(" <i class='far fa-file-pdf'></i>");
      $(this).on("click", function() { return true; });
      $(this).attr({ target: "_blank" });
      $(this).trigger("click");
    }
  })
});
