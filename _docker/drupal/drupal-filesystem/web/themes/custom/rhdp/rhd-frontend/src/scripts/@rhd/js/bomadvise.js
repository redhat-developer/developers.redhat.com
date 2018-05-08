/*
  This script is responsible for displaying the "WARNING: This BOM have been replaced by a product BOM" .
 */
app.bom = {

  init: function() {
    if ($('.bomadvise').length) {
      $('div#bomadvise').show('slow');
    }
  },

};

app.bom.init();
