/**
 * @file
 * Javascript Table Sort Component.
 */

(function ($, Drupal) {

  Drupal.behaviors.rhd_tablesort = {
    attach: function (context, settings) {
      $('.assembly-type-events_collection table.views-table', context).once('rhd_tablesort').each(function () {
        new Tablesort($(this)[0]);
      });
    }
  }

})(jQuery, Drupal);
