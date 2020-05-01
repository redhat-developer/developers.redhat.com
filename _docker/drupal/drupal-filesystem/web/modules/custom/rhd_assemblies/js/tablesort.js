/**
 * @file
 * Javascript Table Sort Component.
 */

(function ($, Drupal) {

  Drupal.behaviors.rhd_tablesort = {
    attach: function (context, settings) {

      $('.assembly-type-events_collection', context).once('rhd_tablesort').each(function () {
        var table = $(context).find('table.views-table');
        // new Tablesort(table);
      });
    }
  }

})(jQuery, Drupal);
