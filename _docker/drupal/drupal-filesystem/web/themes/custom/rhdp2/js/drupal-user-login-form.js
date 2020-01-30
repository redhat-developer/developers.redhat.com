/**
 * @file
 * Articles custom behaviors
 */

(function ($, Drupal) {
  Drupal.behaviors.rhd_userLoginToggleVisibility = {
    attach: function (context, settings) {
      // Toggles the visibility of the default Drupal login form.
      $("#drupalUserLoginToggleVisibility").click(function() {
        $('#user-login-form').toggle();
      });
    }
  }
})(jQuery, Drupal);
