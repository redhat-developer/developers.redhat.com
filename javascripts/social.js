/* 
  Social Media Share Buttons 
*/
$(function() {
  $('.share-this').on('click mouseover', function() {
      Socialite.load(this);
  });

  $('.share-this.visible-by-default').each(function() {
      Socialite.load(this);
  });

});

