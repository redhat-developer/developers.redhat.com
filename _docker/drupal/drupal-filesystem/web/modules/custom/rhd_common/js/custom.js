(function (jQuery) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      jQuery('#edit-path-settings').attr('open','');
      jQuery('#edit-path-settings summary').attr("aria-expanded","true");
      jQuery('#edit-path-settings summary').attr("aria-pressed","true");     
    }
  };
})(jQuery, Drupal, drupalSettings);