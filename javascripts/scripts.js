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

  /*
    Toggle mobile Nav
  */
  $('.nav-toggle').click(function(){
    $('body').toggleClass('nav-open');
  });

  /*
    Mobile Nav dropdown
  */ 
  $('li.has-dropdown').on('click touchend',function(e){
    $(this).toggleClass('sub-nav-open');
  });


};

$(function() {
  app.init();
});