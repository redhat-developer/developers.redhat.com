/**
 * @file
 * Opens in a new tab all (except Download Manager) links ending in .pdf extension
 */

(function ($, Drupal) {
  Drupal.behaviors.rhd_pdfLinks = {
    attach: function (context, settings) {
      $("a[href$='.pdf']", context).once('rhdHandlePDFs').each(function() {

        if (this.href.indexOf('/download-manager/') != -1) {
          return;
        }

        if (this.href.indexOf(location.hostname) == -1) {
          $(this).append(" <i class='far fa-file-pdf'></i>");
          $(this).attr({ target: "_blank" });
        }
      });
    }
  }
})(jQuery, Drupal);
