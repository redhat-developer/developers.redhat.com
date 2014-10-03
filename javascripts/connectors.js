app.connectors = {
  open : function(html) {
    console.log('Open connector called;');
    $('.overlay-content').html(html);
    $('body').addClass('overlay-open');
  },
  close : function() {
    $('body').removeClass('overlay-open');
    $('.overlay-content').empty();
  }
};


$(function() {
  $('a.fn-open-connector').on('click',function(e){
    e.preventDefault();
    console.log("Open connector clicked;")
    var html = $(this).parent().parent().find('.connector-overlay-content').html();
    console.log("html: " , html)
    app.connectors.open(html);
  });

  $('.overlay-close').on('click',app.connectors.close);
}); 
