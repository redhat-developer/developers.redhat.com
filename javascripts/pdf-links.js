// Opens in a new tab all links ending in .pdf extension
$('a[href$=".pdf"]').click( function() {
  window.open( $(this).attr('href') );
  return false;
});
