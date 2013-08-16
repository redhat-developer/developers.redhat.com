var app = window.app = {};

/* 
  Website Cache
*/
app.cache = {};

/* 
  Website Init 
*/ 
app.init = function() {
  
  $(document).foundation();

  /*
    initialize slider
  */
  app.slider = Swipe(document.getElementById('slider'));
  
  $('.slider-controls').on('click','a',function(e){
    var direction = $(this).data('direction');
    app.slider[direction]();
    e.preventDefault();
  })

};

$(function() {
  app.init();
});