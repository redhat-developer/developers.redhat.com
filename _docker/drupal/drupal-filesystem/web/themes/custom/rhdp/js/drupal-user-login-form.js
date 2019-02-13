// Toggles the visibility of the default Drupal login form.
$(document).ready(function() {
  $("#drupalUserLoginToggleVisibility").click(function() {
    $('#user-login-form').toggle();
  })
});
