/**
 * @file
 * Javascript Expandable Component.
 */

(function ($, Drupal) {

  Drupal.behaviors.rhd_expandable = {
    attach: function (context, settings) {
      $('.assembly-type-events_collection table.pf-m-expandable .pf-c-table__toggle button', context).once('rhd_expandable').each(function () {

        var tbody = $(this).parents('tbody');
        var toggleId = $(this).attr('aria-controls');

        $(this).click(function () {
          $('#' + toggleId).toggle().toggleClass('pf-m-expanded');
          $(tbody).toggleClass('pf-m-expanded');

          if ($(this).attr('aria-expanded') == 'false') {
            $(this).attr('aria-expanded', 'true');
            $(this)
              .find('[data-fa-i2svg]')
              .removeClass('fa-angle-right')
              .addClass('fa-angle-down');
          }
          else if ($(this).attr('aria-expanded') == 'true') {
            $(this).attr('aria-expanded', 'false');
            $(this)
              .find('[data-fa-i2svg]')
              .removeClass('fa-angle-down')
              .addClass('fa-angle-right');
          }

        });
      });
    }
  }
})(jQuery, Drupal);
