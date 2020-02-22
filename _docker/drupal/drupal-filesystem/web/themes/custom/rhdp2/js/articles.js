/**
 * @file
 * Articles custom behaviors
 */

(function ($, Drupal) {
  Drupal.behaviors.rhd_articleToc = {
    attach: function (context, settings) {
      $('.toc.gsi-nav', context).once('rhd-toc-gsi').each(function () {
        var html = '';
        var articleHeadings = $('.gsi.fetch-toc h2');

        articleHeadings.each(function() {
          var replace_id = $(this).text().replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
          $(this).attr('id', replace_id);
          html += "<li><a href='#" + replace_id + "'>" + $(this).text() + "</a></li>";
        });

        $(this).html(html);
      });
    }
  }
})(jQuery, Drupal);
