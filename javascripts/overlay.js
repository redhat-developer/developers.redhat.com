app.overlay = {};

app.overlay.open = function(html) {
  $('body').addClass('overlay-open');
  if(html) {
    app.overlay.setContent(html);
  }
};

app.overlay.close = function() {
  $('body').removeClass('overlay-open');
};

app.overlay.toggle = function() {
  $('body').toggleClass('overlay-open');
};

app.overlay.setContent = function(content) {
  $('.overlay-content').html(content);
};

$(function() {
  // bind close button
  $('a.overlay-close').on('click',function(e) {
    e.preventDefault();
    app.overlay.close();
  });

  $(window).on('keyup',function(e){
    if(e.keyCode === 27) {
      app.overlay.close();
    }
  });
});
