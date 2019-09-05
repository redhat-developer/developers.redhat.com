(function ($, Drupal) {
  Drupal.behaviors.userLoginToggleVisibility = {
    attach: function (context, settings) {
      // Toggles the visibility of the default Drupal login form.
      $("#drupalUserLoginToggleVisibility").click(function() {
        $('#user-login-form').toggle();
      });
    }
  }
})(jQuery, Drupal);
