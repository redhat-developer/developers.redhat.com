---
interpolate: true
---

app.baseUrl = "#{site.base_url}/" + "#{site.context_url}/";

app.pageVariations = [
  function() {
    /*
      Variation 1:
      Default Layout
    */
    $('.intro').show();
  },
  function() {
    /*
      Variation 2:
      Fullbleed Layout
    */
    $('.hero .slider').hide();
    $('.intro').removeClass().addClass('row').wrap('<div class="wide intro intro-layout2">');
    $('.intro').show();
    $('.hero').removeClass('hero').load(app.baseUrl + 'spotlights .spotlights');
  }
];

$(function() {
  if(typeof cxApi !== 'undefined') {
    var chosenVariation = cxApi.chooseVariation();
    app.pageVariations[chosenVariation]();
  }
});
