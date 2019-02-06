// Opens in a new tab all (except Download Manager) links ending in .pdf extension
$(document).ready(function() {
  $("#drupalUserLoginToggleVisibility").click(function() {
    $('#user-login-form').toggle();
    if ($(this).text().startsWith('Reveal')) {
      var replacement = $(this).text().replace('Reveal', 'Hide');
      $(this).text(replacement);
    }
    else if ($(this).text().startsWith('Hide')) {
      var replacement = $(this).text().replace('Hide', 'Reveal');
      $(this).text(replacement);
    }
  })
});
