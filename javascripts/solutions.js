$(function() {

  var solutionsOverlay= $('.solution-overlays');

  /*
    Show Solutions
  */
  $('[data-open-solution]').on('click',function(e){
    e.preventDefault();
    var el = $(this),
        num = el.data('open-solution'),
        overlay = $('[data-solution='+num+']'),
        position = el.position(),
        offset = el.offset(),
        parentPosition = el.closest('.row').offset(),
        height = el.height(),
        width = el.width();

    $('.solution-open').removeClass('solution-open');
    el.addClass('solution-open');
    
    // Toggle visibility of the ones we want
    solutionsOverlay.show().css('display','table');
    overlay.show();
    $('[data-solution]').not(overlay).hide();

    // Make the slider for this overlay work
    app.createSlider(overlay.find('.slider'));

    $('body').on('keydown.solutions',function(e) {
      if(e.keyCode === 27) {
        solutionsOverlay.hide();
        $('.solution-open').removeClass('solution-open');
        $('body').unbind('keydown.solutions');
      }
    });

  });

  /*
    Bind close button
  */

  $('body').on('click','.fn-close-overlay, .solution-wrap',function(e) {
    if(e.target != this) {
      return;
    }
    e.preventDefault();
    solutionsOverlay.hide();
    $('.solution-open').removeClass('solution-open');
    $('body').unbind('keydown.solutions');
  });

  /*
    Bind to closing when clicking overlay 
  */

});

