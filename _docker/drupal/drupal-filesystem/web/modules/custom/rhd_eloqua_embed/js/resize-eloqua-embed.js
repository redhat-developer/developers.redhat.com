(function ($, Drupal) {
    Drupal.behaviors.resizeEloquaEmbed = {
      attach: function (context, settings) {
        $('iframe.eloqua-iframe', context).once('resizeEloquaEmbed').each(function () {
          $(this).iFrameResize({resizeFrom: 'child'});
        });
      }
    };
  })(jQuery, Drupal);
